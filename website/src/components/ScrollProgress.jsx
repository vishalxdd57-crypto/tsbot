import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPos = window.scrollY;
      setProgress(totalHeight > 0 ? (scrollPos / totalHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: '3px',
        background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))',
        zIndex: 9999,
        transition: 'width 0.1s linear',
        boxShadow: '0 0 10px var(--neon-cyan), 0 0 20px var(--neon-magenta)',
      }}
    />
  );
}
