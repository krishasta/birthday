import React, { useMemo } from 'react';

const FloatingParticles = () => {
  const particles = useMemo(() => {
    // Peacock motifs: Feathers, glowing sparks, emeralds, royal blue hearts, gold stars, cyan drops
    const items = ['🪶', '✨', '💙', '💎', '💚', '⭐', '🪶', '✨', '💫', '🦚', '🌟'];
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      char: items[i % items.length],
      left: `${(i * 3.6 + Math.random() * 5) % 96}%`,
      size: `${15 + Math.random() * 18}px`,
      duration: `${8 + Math.random() * 12}s`,
      delay: `${Math.random() * 10}s`,
      opacity: 0.45 + Math.random() * 0.45,
    }));
  }, []);

  return (
    <div className="floating-particle-container">
      {particles.map((p) => (
        <span
          key={p.id}
          className="floating-particle"
          style={{
            left: p.left,
            fontSize: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
};

export default FloatingParticles;
