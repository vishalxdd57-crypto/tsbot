import { NavLink } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="glow-line" style={{ width: '80%' }} />
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">
            ⚡ Vishal<span className="footer__logo-accent">XD</span>
          </span>
          <p className="footer__tagline">
            Building powerful digital solutions with automation, bots & code.
          </p>
        </div>

        <div className="footer__nav">
          <h4 className="footer__heading">Pages</h4>
          <NavLink to="/" className="footer__link">Home</NavLink>
          <NavLink to="/courses" className="footer__link">Courses</NavLink>
          <NavLink to="/store" className="footer__link">Store</NavLink>
          <NavLink to="/about" className="footer__link">About</NavLink>
          <NavLink to="/contact" className="footer__link">Contact</NavLink>
        </div>

        <div className="footer__nav">
          <h4 className="footer__heading">Connect</h4>
          <a href="https://t.me/VishalXD" className="footer__link" target="_blank" rel="noreferrer">Telegram</a>
          <a href="https://github.com/VishalXD" className="footer__link" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://instagram.com/VishalXD" className="footer__link" target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </div>

      <div className="container">
        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Vishal XD. All rights reserved.</p>
          <p className="footer__credit">
            Crafted with <span style={{ color: 'var(--neon-magenta)' }}>♥</span> and code
          </p>
        </div>
      </div>
    </footer>
  );
}
