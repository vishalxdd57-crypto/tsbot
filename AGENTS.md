# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Xonio Translate is a **Telegram bot** (`bot.py`) that translates messages using Google Translate (via `deep-translator`). It stores user/group data in a local SQLite database (`xonio.db`). Configuration (bot token, admin IDs) lives in `config.py`.

### Running the bot

```
python3 bot.py
```

The bot uses long-polling (`run_polling()`). It will print "Xonio Translate running" on successful startup.

### Key caveats

- **Conflict errors on startup** are expected if another instance of the bot is already running with the same `BOT_TOKEN`. The Telegram Bot API only allows one polling connection per token. This does not indicate a code bug.
- **No test suite exists** in this repository. Verification is done by checking imports, syntax (`python3 -m py_compile bot.py`), and testing the translation pipeline manually.
- **No linter is configured.** Use `python3 -m py_compile bot.py` for syntax checking.
- **SQLite database** (`xonio.db`) is auto-created on first run. No migrations needed.
- The bot requires internet access for both the Telegram API and Google Translate.

### Dependencies

Managed via `pip install -r requirements.txt`. See `requirements.txt` for the full list. The runtime specifies Python 3.10+ (see `runtime.txt`), but 3.12 also works.
