import logging
import sqlite3
import uuid

from telegram import (
    Update,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    InlineQueryResultArticle,
    InputTextMessageContent
)

from telegram.ext import (
    Application,
    CommandHandler,
    MessageHandler,
    CallbackQueryHandler,
    InlineQueryHandler,
    ContextTypes,
    filters
)

from deep_translator import GoogleTranslator
from unidecode import unidecode
import config

logging.basicConfig(level=logging.INFO)

# ---------------- DATABASE ----------------

db = sqlite3.connect("xonio.db", check_same_thread=False)
cursor = db.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS users(
user_id INTEGER PRIMARY KEY
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS groups(
group_id INTEGER PRIMARY KEY,
auto_translate INTEGER DEFAULT 0
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS stats(
translations INTEGER DEFAULT 0
)
""")

cursor.execute("INSERT OR IGNORE INTO stats(rowid,translations) VALUES(1,0)")
db.commit()

# ---------------- LANGUAGE SHORTCUTS ----------------

LANG = {
"hind":("Hindi","hi"),
"kan":("Kannada","kn"),
"tam":("Tamil","ta"),
"tel":("Telugu","te"),
"mal":("Malayalam","ml"),
"eng":("English","en"),
"rus":("Russian","ru"),
"uzb":("Uzbek","uz"),
"spa":("Spanish","es"),
"fre":("French","fr"),
"ger":("German","de"),
"ara":("Arabic","ar"),
"ben":("Bengali","bn"),
"tur":("Turkish","tr"),
"ita":("Italian","it"),
"por":("Portuguese","pt"),
"jap":("Japanese","ja"),
"kor":("Korean","ko"),
"chi":("Chinese","zh-cn")
}

# ---------------- TRANSLATE ----------------

def translate(text,target):
    try:
        cursor.execute("UPDATE stats SET translations = translations + 1")
        db.commit()
        return GoogleTranslator(target=target).translate(text)
    except:
        return "Translation failed"

# ---------------- START ----------------

async def start(update:Update,context:ContextTypes.DEFAULT_TYPE):

    user=update.effective_user
    cursor.execute("INSERT OR IGNORE INTO users(user_id) VALUES(?)",(user.id,))
    db.commit()

    keyboard=[
        [InlineKeyboardButton("➕ Add to Group",url=f"https://t.me/{config.BOT_USERNAME}?startgroup=true")],
        [InlineKeyboardButton("❓ Help",callback_data="help")]
    ]

    text=(
    "👋 Welcome to Xonio Translate\n\n"
    "Reply translate example:\n"
    "/transhind\n\n"
    "Quick translate example:\n"
    "/hind hello how are you\n\n"
    "Use /help for language shortcuts\n\n"
    "Credits\nLikith • Vishal"
    )

    photos=await context.bot.get_user_profile_photos(user.id)

    if photos.total_count>0:
        await update.message.reply_photo(
        photo=photos.photos[0][-1].file_id,
        caption=text,
        reply_markup=InlineKeyboardMarkup(keyboard)
        )
    else:
        await update.message.reply_text(text,reply_markup=InlineKeyboardMarkup(keyboard))

# ---------------- HELP ----------------

async def help_cmd(update:Update,context:ContextTypes.DEFAULT_TYPE):

    langs="\n".join([f"/trans{k} → {v[0]}" for k,v in LANG.items()])

    await update.message.reply_text(
    f"🌍 Language shortcuts\n\n{langs}\n\nExample:\n/transhind\n/hind hello"
    )

# ---------------- REPLY TRANSLATE ----------------

async def reply_translate(update:Update):

    cmd=update.message.text.replace("/trans","")

    if cmd not in LANG:
        return

    if not update.message.reply_to_message:
        await update.message.reply_text("Reply to message")
        return

    name,code=LANG[cmd]

    text=update.message.reply_to_message.text

    eng=translate(text,"en")
    tr=translate(text,code)
    roman=unidecode(tr)

    await update.message.reply_text(
    f"English: {eng}\n\n{name}: {tr}\n\nRoman: {roman}"
    )

# ---------------- QUICK TRANSLATE ----------------

async def quick_translate(update:Update):

    parts=update.message.text.split(" ",1)

    cmd=parts[0].replace("/","")

    if cmd not in LANG:
        return

    if len(parts)<2:
        return

    text=parts[1]

    name,code=LANG[cmd]

    tr=translate(text,code)

    await update.message.reply_text(tr)

# ---------------- AUTO GROUP TRANSLATE ----------------

async def autotrans(update:Update,context:ContextTypes.DEFAULT_TYPE):

    chat=update.effective_chat

    admins=await context.bot.get_chat_administrators(chat.id)

    if update.effective_user.id not in [a.user.id for a in admins]:
        await update.message.reply_text("Admins only")
        return

    cursor.execute("INSERT OR IGNORE INTO groups(group_id) VALUES(?)",(chat.id,))
    cursor.execute("SELECT auto_translate FROM groups WHERE group_id=?",(chat.id,))

    state=cursor.fetchone()[0]
    new=0 if state else 1

    cursor.execute("UPDATE groups SET auto_translate=? WHERE group_id=?",(new,chat.id))
    db.commit()

    await update.message.reply_text(
    "Auto translate enabled" if new else "Auto translate disabled"
    )

# ---------------- ADMIN PANEL ----------------

async def admin_panel(update:Update,context:ContextTypes.DEFAULT_TYPE):

    if update.effective_user.id not in config.ADMINS:
        return

    keyboard=[
        [InlineKeyboardButton("📊 Stats",callback_data="stats")],
        [InlineKeyboardButton("📢 Broadcast",callback_data="broadcast")],
        [InlineKeyboardButton("👥 Users",callback_data="users")],
        [InlineKeyboardButton("👥 Groups",callback_data="groups")]
    ]

    await update.message.reply_text(
    "Admin Panel",
    reply_markup=InlineKeyboardMarkup(keyboard)
    )

# ---------------- ADMIN BUTTONS ----------------

async def admin_buttons(update:Update,context:ContextTypes.DEFAULT_TYPE):

    query=update.callback_query
    await query.answer()

    if query.from_user.id not in config.ADMINS:
        return

    if query.data=="stats":

        cursor.execute("SELECT COUNT(*) FROM users")
        users=cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM groups")
        groups=cursor.fetchone()[0]

        cursor.execute("SELECT translations FROM stats")
        trans=cursor.fetchone()[0]

        await query.message.reply_text(
        f"📊 Bot Stats\n\nUsers: {users}\nGroups: {groups}\nTranslations: {trans}"
        )

    elif query.data=="users":

        cursor.execute("SELECT COUNT(*) FROM users")
        users=cursor.fetchone()[0]

        await query.message.reply_text(f"Total users: {users}")

    elif query.data=="groups":

        cursor.execute("SELECT COUNT(*) FROM groups")
        groups=cursor.fetchone()[0]

        await query.message.reply_text(f"Total groups: {groups}")

    elif query.data=="broadcast":

        await query.message.reply_text("Send message using:\n/broadcast your message")

# ---------------- BROADCAST ----------------

async def broadcast(update:Update,context:ContextTypes.DEFAULT_TYPE):

    if update.effective_user.id not in config.ADMINS:
        return

    msg=" ".join(context.args)

    cursor.execute("SELECT user_id FROM users")
    users=cursor.fetchall()

    sent=0

    for u in users:
        try:
            await context.bot.send_message(u[0],msg)
            sent+=1
        except:
            pass

    await update.message.reply_text(f"Broadcast sent to {sent} users")

# ---------------- MESSAGE HANDLER ----------------

async def messages(update:Update,context:ContextTypes.DEFAULT_TYPE):

    text=update.message.text

    if text.startswith("/trans"):
        await reply_translate(update)

    elif text.startswith("/"):
        await quick_translate(update)

# ---------------- INLINE ----------------

async def inline(update:Update,context:ContextTypes.DEFAULT_TYPE):

    query=update.inline_query.query

    if not query:
        return

    tr=translate(query,"en")

    results=[InlineQueryResultArticle(
    id=str(uuid.uuid4()),
    title="Translate",
    input_message_content=InputTextMessageContent(tr)
    )]

    await update.inline_query.answer(results)

# ---------------- MAIN ----------------

def main():

    app=Application.builder().token(config.BOT_TOKEN).build()

    app.add_handler(CommandHandler("start",start))
    app.add_handler(CommandHandler("help",help_cmd))
    app.add_handler(CommandHandler("admin",admin_panel))
    app.add_handler(CommandHandler("autotranslate",autotrans))
    app.add_handler(CommandHandler("broadcast",broadcast))

    app.add_handler(MessageHandler(filters.TEXT,messages))

    app.add_handler(CallbackQueryHandler(admin_buttons))

    app.add_handler(InlineQueryHandler(inline))

    print("Xonio Translate running")

    app.run_polling()

if __name__=="__main__":
    main()