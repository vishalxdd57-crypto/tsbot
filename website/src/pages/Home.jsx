import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import './Home.css';

const services = [
  {
    icon: '🤖',
    title: 'Telegram Bots',
    desc: 'Custom Telegram bots for automation, moderation, and business workflows.',
  },
  {
    icon: '⚙️',
    title: 'Automation',
    desc: 'End-to-end process automation to save time and boost productivity.',
  },
  {
    icon: '🌐',
    title: 'Web Development',
    desc: 'Modern, responsive websites and web applications built to perform.',
  },
  {
    icon: '📦',
    title: 'Digital Products',
    desc: 'Premium templates, scripts, and tools ready for deployment.',
  },
];

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '1000+', label: 'Happy Clients' },
  { value: '3+', label: 'Years Experience' },
  { value: '24/7', label: 'Support Available' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function Home() {
  return (
    <PageTransition>
      <section className="hero">
        <div className="hero__bg-grid" />
        <div className="hero__glow hero__glow--1" />
        <div className="hero__glow hero__glow--2" />
        <div className="container hero__content">
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            🚀 Welcome to the future
          </motion.div>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            I'm <span className="hero__name">Vishal XD</span>
            <br />
            <span className="hero__subtitle-text">Developer &bull; Automator &bull; Creator</span>
          </motion.h1>

          <motion.p
            className="hero__desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Building powerful Telegram bots, automation systems, and digital
            products that help businesses scale and individuals succeed.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link to="/courses" className="btn-primary">
              Explore Courses →
            </Link>
            <Link to="/contact" className="btn-secondary">
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section services">
        <div className="container">
          <h2 className="section-title">What I Do</h2>
          <p className="section-subtitle">
            Specialized services designed to automate, optimize, and elevate your digital presence.
          </p>
          <div className="grid-2 grid-2--services">
            {services.map((s, i) => (
              <motion.div
                className="service-card"
                key={s.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                custom={i}
              >
                <span className="service-card__icon">{s.icon}</span>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <motion.div
                className="stat"
                key={s.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <span className="stat__value">{s.value}</span>
                <span className="stat__label">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <motion.div
            className="cta-box"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="cta-box__title">Ready to Build Something Amazing?</h2>
            <p className="cta-box__desc">
              Whether you need a custom bot, an automation pipeline, or a full website — let's make it happen.
            </p>
            <div className="cta-box__actions">
              <Link to="/store" className="btn-primary">Browse Store</Link>
              <Link to="/contact" className="btn-secondary">Contact Me</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
