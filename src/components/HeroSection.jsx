import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Cake, Image as ImageIcon, Calendar, Clock, Edit3, Feather } from 'lucide-react';

const HeroSection = ({ herName, startDate, onOpenCustomizer }) => {
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate || '2023-09-20T00:00:00');
      const now = new Date();
      const diffMs = Math.max(0, now - start);

      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
      const seconds = Math.floor((diffMs / 1000) % 60);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  return (
    <section id="celebration-hub" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '32px',
      position: 'relative',
      zIndex: 2,
    }}>
      {/* Top Banner with in-place customize shortcut */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        gap: '12px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(0, 245, 212, 0.12)',
          padding: '6px 18px',
          borderRadius: '9999px',
          border: '1px solid rgba(0, 245, 212, 0.3)',
          fontSize: '0.85rem',
          color: '#c8f4f9',
        }}>
          <Sparkles size={14} color="#00f5d4" />
          <span>Royal Peacock Celebration Edition 🪶</span>
        </div>

        <button
          onClick={onOpenCustomizer}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(0, 245, 212, 0.25)',
            borderRadius: '9999px',
            color: '#c8f4f9',
            padding: '6px 14px',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          title="Change name, date, photos, or love notes"
        >
          <Edit3 size={14} /> Personalize Surprise
        </button>
      </div>

      {/* Main Title Card */}
      <div className="glass-card" style={{
        padding: 'clamp(24px, 5vw, 48px)',
        textAlign: 'center',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Soft peacock glow aura */}
        <div style={{
          position: 'absolute',
          top: '-30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '380px',
          height: '220px',
          background: 'radial-gradient(circle, rgba(0,245,212,0.25) 0%, rgba(10,147,150,0.15) 50%, transparent 70%)',
          filter: 'blur(35px)',
          pointerEvents: 'none',
        }} />

        <h2 style={{
          fontFamily: 'var(--font-script)',
          fontSize: 'clamp(2.5rem, 7vw, 4.8rem)',
          background: 'linear-gradient(135deg, #ffffff 15%, #c8f4f9 45%, #00f5d4 75%, #ffd166 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.15,
          marginBottom: '14px',
        }}>
          Happy Birthday, {herName || 'Karthini'}! 🪶
        </h2>

        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.1rem, 2.8vw, 1.45rem)',
          fontStyle: 'italic',
          color: '#d0f4de',
          maxWidth: '800px',
          margin: '0 auto 28px',
          lineHeight: 1.6,
        }}>
          "You bring royal grace, pure joy, and infinite radiance to my life. September 20 is the most magical day because you were born."
        </p>

        {/* Days Together Counter */}
        <div style={{
          background: 'rgba(2, 20, 32, 0.75)',
          border: '1px solid rgba(0, 245, 212, 0.35)',
          borderRadius: '20px',
          padding: '20px 16px',
          maxWidth: '660px',
          margin: '0 auto',
          boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: '#00f5d4',
            fontSize: '0.9rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '14px',
          }}>
            <Sparkles size={16} color="#ffd166" />
            <span>Time We've Spent Making Memories Together</span>
            <Sparkles size={16} color="#ffd166" />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px',
          }}>
            {[
              { label: 'Days', val: timeTogether.days },
              { label: 'Hours', val: timeTogether.hours },
              { label: 'Minutes', val: timeTogether.minutes },
              { label: 'Seconds', val: timeTogether.seconds },
            ].map((item, idx) => (
              <div key={idx} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '10px 6px',
                border: '1px solid rgba(0, 245, 212, 0.15)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                  fontWeight: 700,
                  color: '#ffd166',
                }}>
                  {item.val}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#a8dadc',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Jump Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '14px',
          marginTop: '32px',
        }}>
          <a href="#heartfelt-letter" className="btn-romantic">
            <Feather size={18} /> Read Gopi's Heartfelt Letter 💌
          </a>
          <a href="#birthday-cake" className="btn-outline-romantic">
            <Cake size={18} /> Blow Cake Candles
          </a>
          <a href="#memory-album" className="btn-outline-romantic">
            <ImageIcon size={18} /> View Photo Album
          </a>
          <a href="#love-notes" className="btn-outline-romantic">
            <Heart size={18} /> Reasons I Love You
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
