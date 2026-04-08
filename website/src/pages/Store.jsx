import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import './Store.css';

const products = [
  {
    id: 1,
    category: 'Bot Templates',
    items: [
      {
        title: 'Moderation Bot Template',
        desc: 'Full-featured group management bot with anti-spam, filters, welcome messages, and admin controls.',
        price: '₹499',
        icon: '🛡️',
      },
      {
        title: 'E-Commerce Bot Template',
        desc: 'Complete shopping bot with product catalog, cart system, payment integration, and order tracking.',
        price: '₹699',
        icon: '🛒',
      },
      {
        title: 'Support Bot Template',
        desc: 'Customer support bot with ticket system, FAQ responses, and agent routing capabilities.',
        price: '₹399',
        icon: '💬',
      },
    ],
  },
  {
    id: 2,
    category: 'Automation Scripts',
    items: [
      {
        title: 'Social Media Scheduler',
        desc: 'Automated posting and scheduling across multiple platforms with analytics dashboard.',
        price: '₹599',
        icon: '📱',
      },
      {
        title: 'Web Scraper Suite',
        desc: 'Powerful web scraping toolkit with proxy rotation, anti-detection, and data export features.',
        price: '₹799',
        icon: '🕷️',
      },
      {
        title: 'File Organizer Pro',
        desc: 'Intelligent file management automation with custom rules, deduplication, and cloud sync.',
        price: '₹299',
        icon: '📁',
      },
    ],
  },
  {
    id: 3,
    category: 'Website Templates',
    items: [
      {
        title: 'Portfolio Pro Template',
        desc: 'Stunning portfolio website with animations, dark theme, and responsive design. React + Vite.',
        price: '₹999',
        icon: '🎨',
      },
      {
        title: 'Landing Page Builder',
        desc: 'High-converting landing page template with sections, CTAs, and analytics integration.',
        price: '₹599',
        icon: '🚀',
      },
      {
        title: 'Dashboard UI Kit',
        desc: 'Admin dashboard template with charts, tables, auth pages, and dark/light modes.',
        price: '₹1,299',
        icon: '📊',
      },
    ],
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

export default function Store() {
  return (
    <PageTransition>
      <section className="store-hero">
        <div className="container">
          <h1 className="section-title">Digital Store</h1>
          <p className="section-subtitle">
            Premium templates, scripts, and tools — ready to deploy. Save weeks of development time.
          </p>
        </div>
      </section>

      {products.map((cat, catIdx) => (
        <section className="section store-category" key={cat.id}>
          <div className="container">
            <motion.h2
              className="store-category__title"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="store-category__dot" />
              {cat.category}
            </motion.h2>

            <div className="grid-3">
              {cat.items.map((item, i) => (
                <motion.div
                  className="product-card"
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  custom={i}
                >
                  <div className="product-card__icon">{item.icon}</div>
                  <h3 className="product-card__title">{item.title}</h3>
                  <p className="product-card__desc">{item.desc}</p>
                  <div className="product-card__bottom">
                    <span className="product-card__price">{item.price}</span>
                    <button className="btn-primary product-card__buy">
                      Buy Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          {catIdx < products.length - 1 && (
            <div className="glow-line" style={{ width: '60%', marginTop: 60 }} />
          )}
        </section>
      ))}
    </PageTransition>
  );
}
