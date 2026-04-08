import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import './About.css';

const skills = [
  { name: 'Python', level: 95 },
  { name: 'Telegram Bot API', level: 92 },
  { name: 'JavaScript / React', level: 85 },
  { name: 'Automation & Scripting', level: 90 },
  { name: 'HTML / CSS', level: 88 },
  { name: 'Node.js', level: 80 },
  { name: 'Database (SQL / NoSQL)', level: 78 },
  { name: 'DevOps & Deployment', level: 75 },
];

const experience = [
  {
    year: '2024 — Present',
    title: 'Full-Stack Developer & Automation Expert',
    desc: 'Building premium Telegram bots, automation systems, and digital products for clients worldwide. Running courses and training programs.',
  },
  {
    year: '2023 — 2024',
    title: 'Freelance Bot Developer',
    desc: 'Delivered 30+ custom Telegram bots for businesses including moderation bots, e-commerce bots, and utility tools.',
  },
  {
    year: '2022 — 2023',
    title: 'Self-Taught Developer',
    desc: 'Learned Python, web development, and automation through self-study. Started building personal projects and open-source tools.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function About() {
  return (
    <PageTransition>
      <section className="about-hero">
        <div className="container">
          <h1 className="section-title">About Me</h1>
          <p className="section-subtitle">
            Developer, creator, and automation enthusiast building the future one bot at a time.
          </p>
        </div>
      </section>

      <section className="section about-intro">
        <div className="container about-intro__grid">
          <motion.div
            className="about-intro__avatar"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="about-intro__avatar-ring">
              <div className="about-intro__avatar-inner">
                <span className="about-intro__avatar-emoji">⚡</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-intro__content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="about-intro__title">
              Hey, I'm <span className="gradient-text">Vishal XD</span>
            </h2>
            <p>
              I'm a passionate developer specializing in Telegram bot development,
              process automation, and web technologies. With over 3 years of
              experience, I've helped businesses automate their workflows and build
              powerful digital tools.
            </p>
            <p>
              My mission is to make technology accessible and useful for everyone.
              Whether it's a custom Telegram bot that manages your community, an
              automation script that saves hours of manual work, or a beautiful
              website that converts visitors into customers — I build solutions
              that work.
            </p>
            <p>
              When I'm not coding, I create educational content, build courses,
              and contribute to the developer community. I believe in learning by
              doing and sharing knowledge freely.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section about-skills">
        <div className="container">
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle">Technologies and tools I work with daily.</p>
          <div className="skills-list">
            {skills.map((skill, i) => (
              <motion.div
                className="skill-row"
                key={skill.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div className="skill-row__header">
                  <span className="skill-row__name">{skill.name}</span>
                  <span className="skill-row__pct">{skill.level}%</span>
                </div>
                <div className="skill-row__bar">
                  <motion.div
                    className="skill-row__fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-experience">
        <div className="container">
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">My journey so far.</p>
          <div className="timeline">
            {experience.map((exp, i) => (
              <motion.div
                className="timeline__item"
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div className="timeline__dot" />
                <div className="timeline__content">
                  <span className="timeline__year">{exp.year}</span>
                  <h3 className="timeline__title">{exp.title}</h3>
                  <p className="timeline__desc">{exp.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
