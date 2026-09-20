import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Wind, Flame, RotateCcw, Feather } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

const InteractiveCake = ({ herName }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [isBlowing, setIsBlowing] = useState(false);
  const [showWishModal, setShowWishModal] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    setIsBlowing(true);
    soundFX.playBlowCandle();

    setTimeout(() => {
      setCandlesLit(false);
      setIsBlowing(false);
      setShowWishModal(true);

      // Fireworks Peacock Confetti blast
      const duration = 3.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

      const colors = ['#00f5d4', '#06d6a0', '#00b4d8', '#ffd166', '#7209b7'];

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 55 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, colors, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, colors, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }
    }, 600);
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setShowWishModal(false);
    soundFX.playPop();
  };

  return (
    <section id="birthday-cake" style={{
      maxWidth: '1000px',
      margin: '40px auto',
      padding: '20px',
      position: 'relative',
      zIndex: 2,
    }}>
      <div className="glass-card" style={{
        padding: 'clamp(24px, 5vw, 44px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
      }}>
        {/* Title */}
        <span style={{
          fontSize: '0.85rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#00f5d4',
          fontWeight: 700,
          marginBottom: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <Feather size={14} /> Interactive Wish Ceremony <Feather size={14} />
        </span>
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: '#ffffff',
          marginBottom: '8px',
        }}>
          Make A Wish, {herName || 'Karthini'}! ✨
        </h3>
        <p style={{
          color: '#c8f4f9',
          maxWidth: '560px',
          marginBottom: '28px',
          fontSize: '1rem',
        }}>
          Close your eyes, hold your biggest dream in your heart, and tap the button to blow out your birthday candles!
        </p>

        {/* Cake Container with Flame Overlay */}
        <div style={{
          position: 'relative',
          width: 'min(90vw, 380px)',
          aspectRatio: '1/1',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.7), 0 0 35px rgba(0, 245, 212, 0.3)',
          border: '2px solid rgba(0, 245, 212, 0.4)',
          marginBottom: '28px',
        }}>
          <img
            src="/assets/cake.jpg"
            alt="Delicious Birthday Cake"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Candle Flame Hotspots positioned accurately above the cake candles */}
          <div style={{
            position: 'absolute',
            top: '18.5%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '14px',
            alignItems: 'center',
            justifyContent: 'center',
            width: '150px',
            zIndex: 10,
          }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {candlesLit ? (
                  <div className="flame" style={{ animationDelay: `${i * 0.15}s` }} />
                ) : (
                  <div className="smoke" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {candlesLit ? (
            <button
              onClick={handleBlowCandles}
              className="btn-romantic pulse-glow"
              style={{ fontSize: '1.1rem', padding: '14px 36px' }}
              disabled={isBlowing}
            >
              <Wind size={20} />
              {isBlowing ? 'Blowing Candle...' : 'Blow Out The Candles 🎂'}
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowWishModal(true)}
                className="btn-romantic"
              >
                <Sparkles size={18} /> Read Birthday Wish Note
              </button>
              <button
                onClick={handleRelight}
                className="btn-outline-romantic"
              >
                <RotateCcw size={18} /> Relight Candles
              </button>
            </div>
          )}
        </div>

        {/* Wish Reveal Modal / Banner */}
        {showWishModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 16, 26, 0.88)',
            backdropFilter: 'blur(12px)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.3s ease',
          }}>
            <div className="glass-card" style={{
              maxWidth: '520px',
              width: '100%',
              padding: '36px 28px',
              background: 'linear-gradient(145deg, rgba(3, 30, 48, 0.96), rgba(1, 15, 25, 0.98))',
              border: '1.5px solid rgba(0, 245, 212, 0.5)',
              textAlign: 'center',
              position: 'relative',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 50px rgba(0, 245, 212, 0.35)',
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #00b4d8, #ffd166)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 0 25px rgba(0, 245, 212, 0.6)',
              }}>
                <Sparkles size={30} color="#011627" />
              </div>

              <h4 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.9rem',
                color: '#fff',
                marginBottom: '10px',
              }}>
                May All Your Wishes Come True! 🪶✨
              </h4>

              <p style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '1.55rem',
                lineHeight: 1.5,
                color: '#c8f4f9',
                marginBottom: '24px',
              }}>
                "My wish was already fulfilled the very first day I met you, Karthini. You deserve every ounce of happiness, peace, love, and laughter that this universe has to offer today and forever."
              </p>

              <button
                onClick={() => setShowWishModal(false)}
                className="btn-romantic"
                style={{ width: '100%' }}
              >
                <Heart size={18} fill="#011627" color="#011627" /> Forever With You!
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
};

export default InteractiveCake;
