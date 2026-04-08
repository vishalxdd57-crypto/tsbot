import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import './Courses.css';

const courses = [
  {
    id: 1,
    title: 'Telegram Bot Development Course',
    description:
      'Master Telegram bot development from scratch. Learn to build powerful bots using Python, handle commands, inline queries, payments, and deploy to production.',
    price: '₹999',
    originalPrice: '₹2,999',
    badge: 'Bestseller',
    features: ['15+ hours of content', 'Source code included', 'Lifetime access', 'Certificate of completion'],
    color: 'cyan',
  },
  {
    id: 2,
    title: 'Automation Mastery Course',
    description:
      'Learn to automate anything — from social media workflows to file management, web scraping, and scheduled tasks. Become an automation expert.',
    price: '₹1,499',
    originalPrice: '₹3,999',
    badge: 'Popular',
    features: ['20+ hours of content', 'Real-world projects', 'Automation templates', 'Community access'],
    color: 'magenta',
  },
  {
    id: 3,
    title: 'Python Beginner to Advanced',
    description:
      'Comprehensive Python course covering fundamentals, OOP, data structures, APIs, databases, and advanced topics. Perfect for absolute beginners.',
    price: '₹799',
    originalPrice: '₹1,999',
    badge: 'New',
    features: ['25+ hours of content', '100+ exercises', 'Mini projects', 'Discord community'],
    color: 'purple',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function Courses() {
  return (
    <PageTransition>
      <section className="courses-hero">
        <div className="container">
          <h1 className="section-title">Learn & Level Up</h1>
          <p className="section-subtitle">
            Premium courses designed to give you real-world skills in bot development, automation, and Python programming.
          </p>
        </div>
      </section>

      <section className="section courses-list">
        <div className="container">
          <div className="courses-grid">
            {courses.map((course, i) => (
              <motion.div
                className={`course-card course-card--${course.color}`}
                key={course.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                custom={i}
              >
                <div className="course-card__top">
                  <span className={`course-card__badge course-card__badge--${course.color}`}>
                    {course.badge}
                  </span>
                </div>

                <h3 className="course-card__title">{course.title}</h3>
                <p className="course-card__desc">{course.description}</p>

                <ul className="course-card__features">
                  {course.features.map((f) => (
                    <li key={f}>
                      <span className="course-card__check">✓</span> {f}
                    </li>
                  ))}
                </ul>

                <div className="course-card__pricing">
                  <span className="course-card__price">{course.price}</span>
                  <span className="course-card__original">{course.originalPrice}</span>
                </div>

                <div className="course-card__actions">
                  <button className="btn-primary course-card__buy">Buy Now</button>
                  <button className="btn-secondary course-card__details">View Details</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section courses-faq">
        <div className="container">
          <h2 className="section-title">Frequently Asked</h2>
          <p className="section-subtitle">Got questions? Here are some answers.</p>
          <div className="faq-grid">
            {[
              { q: 'Are the courses self-paced?', a: 'Yes! Once enrolled, you get lifetime access and can learn at your own pace.' },
              { q: 'Do I get source code?', a: 'Absolutely. All courses come with complete source code and project files.' },
              { q: 'Is there a refund policy?', a: 'We offer a 7-day money-back guarantee if you are not satisfied.' },
              { q: 'Can I get support?', a: 'Yes, you can reach out via Telegram or our community Discord for help.' },
            ].map((item, i) => (
              <motion.div
                className="faq-item"
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <h4 className="faq-item__q">{item.q}</h4>
                <p className="faq-item__a">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
