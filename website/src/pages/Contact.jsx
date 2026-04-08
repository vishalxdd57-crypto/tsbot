import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import './Contact.css';

const contactLinks = [
  {
    icon: '📨',
    label: 'Telegram',
    value: '@VishalXD',
    href: 'https://t.me/VishalXD',
    color: 'cyan',
  },
  {
    icon: '💻',
    label: 'GitHub',
    value: 'github.com/VishalXD',
    href: 'https://github.com/VishalXD',
    color: 'purple',
  },
  {
    icon: '📸',
    label: 'Instagram',
    value: '@VishalXD',
    href: 'https://instagram.com/VishalXD',
    color: 'magenta',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <PageTransition>
      <section className="contact-hero">
        <div className="container">
          <h1 className="section-title">Get in Touch</h1>
          <p className="section-subtitle">
            Have a project idea, want to collaborate, or just want to say hi?
            I'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="section contact-main">
        <div className="container contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="contact-info__title">Let's Connect</h2>
            <p className="contact-info__desc">
              The fastest way to reach me is via Telegram. For project inquiries,
              feel free to send a detailed message using the form.
            </p>

            <div className="contact-links">
              {contactLinks.map((link, i) => (
                <motion.a
                  className={`contact-link contact-link--${link.color}`}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  key={link.label}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                >
                  <span className="contact-link__icon">{link.icon}</span>
                  <div>
                    <span className="contact-link__label">{link.label}</span>
                    <span className="contact-link__value">{link.value}</span>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="contact-cta">
              <a
                href="https://t.me/VishalXD"
                className="btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                💬 Message on Telegram
              </a>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="contact-form__title">Send a Message</h3>

            <div className="contact-form__field">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows={5}
                required
              />
            </div>

            <button type="submit" className="btn-primary contact-form__submit">
              {sent ? '✓ Message Sent!' : 'Send Message →'}
            </button>

            {sent && (
              <motion.p
                className="contact-form__success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Thanks for reaching out! I'll get back to you soon.
              </motion.p>
            )}
          </motion.form>
        </div>
      </section>
    </PageTransition>
  );
}
