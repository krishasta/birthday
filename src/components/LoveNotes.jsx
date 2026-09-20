import React, { useState } from 'react';
import { Heart, Sparkles, Smile, Star, Coffee, Music, Sun, Gift, Compass, Shield, Feather } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

const DEFAULT_REASONS = [
  {
    id: 1,
    icon: Smile,
    title: 'Your Contagious Smile',
    content: 'The way your whole face lights up whenever you are genuinely happy can turn my worst day into sunshine instantly.',
  },
  {
    id: 2,
    icon: Heart,
    title: 'Your Golden Heart',
    content: 'Your empathy and gentleness toward everyone and everything around you inspires me to be a better human every day.',
  },
  {
    id: 3,
    icon: Star,
    title: 'Your Sparkling Eyes',
    content: 'Whenever you look at me or get excited about something you love, your eyes hold the most mesmerizing warmth in the universe.',
  },
  {
    id: 4,
    icon: Coffee,
    title: 'Our Cozy Little Habits',
    content: 'Sharing quiet mornings, silly inside jokes, and whispering dreams in our own little world where nobody else exists.',
  },
  {
    id: 5,
    icon: Music,
    title: 'The Sound of Your Voice',
    content: 'Hearing your voice is my favorite comfort playlist. It feels like home no matter where on Earth we are.',
  },
  {
    id: 6,
    icon: Sun,
    title: 'Your Radiant Energy',
    content: 'You bring royal grace, colors, and life to every room you enter. You make everyday moments feel like celebrations.',
  },
  {
    id: 7,
    icon: Shield,
    title: 'Being My Safe Haven',
    content: 'With you, I can completely be myself without any masks or fear. You make me feel loved, respected, and cherished.',
  },
  {
    id: 8,
    icon: Compass,
    title: 'Our Spontaneous Adventures',
    content: 'Whether we are driving with no destination or trying a new dessert, every single trip is ten times more magical with you.',
  },
];

const LoveNotes = () => {
  const [revealed, setRevealed] = useState({});

  const toggleReveal = (id) => {
    soundFX.playPop();
    setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="love-notes" style={{
      maxWidth: '1100px',
      margin: '60px auto',
      padding: '20px',
      position: 'relative',
      zIndex: 2,
    }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span style={{
          color: '#00f5d4',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontSize: '0.85rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '6px',
        }}>
          <Feather size={16} color="#ffd166" /> From The Bottom of My Heart <Feather size={16} color="#ffd166" />
        </span>
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: '#ffffff',
          marginBottom: '8px',
        }}>
          Reasons Why I Love You 🪶💌
        </h3>
        <p style={{ color: '#c8f4f9', fontSize: '1rem' }}>
          Tap each royal card to reveal a special note!
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '20px',
      }}>
        {DEFAULT_REASONS.map((reason) => {
          const Icon = reason.icon;
          const isOpened = revealed[reason.id];

          return (
            <div
              key={reason.id}
              onClick={() => toggleReveal(reason.id)}
              className="glass-card"
              style={{
                padding: '24px 20px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                background: isOpened 
                  ? 'linear-gradient(145deg, rgba(6, 95, 115, 0.85), rgba(2, 35, 55, 0.95))' 
                  : 'rgba(3, 24, 38, 0.65)',
                border: isOpened ? '1px solid rgba(0, 245, 212, 0.65)' : '1px solid rgba(0, 245, 212, 0.18)',
                position: 'relative',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: isOpened ? 'linear-gradient(135deg, #00b4d8, #06d6a0)' : 'rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isOpened ? '#011627' : '#00f5d4',
                marginBottom: '14px',
                boxShadow: isOpened ? '0 0 16px rgba(0, 245, 212, 0.5)' : 'none',
              }}>
                <Icon size={24} />
              </div>

              <h4 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                color: '#ffffff',
                marginBottom: '10px',
              }}>
                {reason.title}
              </h4>

              {isOpened ? (
                <p style={{
                  fontFamily: 'var(--font-hand)',
                  fontSize: '1.35rem',
                  lineHeight: 1.4,
                  color: '#d0f4de',
                  animation: 'fadeIn 0.3s ease',
                }}>
                  "{reason.content}"
                </p>
              ) : (
                <div style={{
                  fontSize: '0.8rem',
                  color: '#7ec2cb',
                  background: 'rgba(0, 245, 212, 0.08)',
                  border: '1px solid rgba(0, 245, 212, 0.2)',
                  padding: '4px 14px',
                  borderRadius: '9999px',
                  marginTop: '6px',
                }}>
                  ✨ Tap to open note
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LoveNotes;
