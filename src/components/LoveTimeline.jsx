import React from 'react';
import { Heart, Compass, Star, Sparkles, Moon, Sun, Feather } from 'lucide-react';

const TIMELINE_EVENTS = [
  {
    step: '01',
    title: 'The First Spark',
    date: 'The Day Our Story Began',
    icon: Star,
    desc: 'The day we first met, when a simple conversation felt like finding something I had been searching for my entire life.',
  },
  {
    step: '02',
    title: 'Our First Magical Date',
    date: 'Butterflies & Constant Laughter',
    icon: Heart,
    desc: 'Losing track of time completely. Hours passed in what felt like seconds because neither of us wanted the night to end.',
  },
  {
    step: '03',
    title: 'Endless Adventures',
    date: 'Exploring The World Hand In Hand',
    icon: Compass,
    desc: 'From spontaneous road trips to quiet evenings in our own cozy world, every single memory with you is pure gold.',
  },
  {
    step: '04',
    title: 'September 20 & Forever',
    date: 'Celebrating Karthini’s Birthday!',
    icon: Feather,
    desc: 'Today we celebrate your life, your beauty, and the infinite happiness you bring into my world. Happy Birthday, my love!',
  },
];

const LoveTimeline = () => {
  return (
    <section id="our-journey" style={{
      maxWidth: '900px',
      margin: '60px auto',
      padding: '20px',
      position: 'relative',
      zIndex: 2,
    }}>
      <div style={{ textAlign: 'center', marginBottom: '44px' }}>
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
          <Sparkles size={16} color="#ffd166" /> Our Royal Story
        </span>
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: '#ffffff',
          marginBottom: '8px',
        }}>
          A Journey of Love & Milestones 🪶✨
        </h3>
        <p style={{ color: '#c8f4f9', fontSize: '1rem' }}>
          Every chapter with you is my favorite one.
        </p>
      </div>

      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}>
        {/* Central connecting glowing line */}
        <div style={{
          position: 'absolute',
          top: '20px',
          bottom: '20px',
          left: '28px',
          width: '2px',
          background: 'linear-gradient(to bottom, #00b4d8, #06d6a0, #ffd166)',
          opacity: 0.65,
          boxShadow: '0 0 10px rgba(0, 245, 212, 0.5)',
        }} />

        {TIMELINE_EVENTS.map((event, index) => {
          const Icon = event.icon;
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '24px',
                position: 'relative',
              }}
            >
              {/* Timeline Icon Badge */}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00b4d8, #06d6a0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#011627',
                flexShrink: 0,
                boxShadow: '0 0 20px rgba(0, 245, 212, 0.6)',
                zIndex: 2,
              }}>
                <Icon size={24} />
              </div>

              {/* Card */}
              <div className="glass-card" style={{
                flex: 1,
                padding: '24px',
                background: 'rgba(3, 26, 42, 0.75)',
                border: '1px solid rgba(0, 245, 212, 0.25)',
              }}>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                  gap: '8px',
                }}>
                  <h4 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.4rem',
                    color: '#ffffff',
                  }}>
                    {event.title}
                  </h4>
                  <span style={{
                    fontSize: '0.8rem',
                    color: '#00f5d4',
                    background: 'rgba(0, 245, 212, 0.12)',
                    padding: '3px 12px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(0, 245, 212, 0.35)',
                    fontWeight: 600,
                  }}>
                    {event.date}
                  </span>
                </div>

                <p style={{
                  fontFamily: 'var(--font-main)',
                  color: '#c8f4f9',
                  fontSize: '0.98rem',
                  lineHeight: 1.6,
                }}>
                  {event.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LoveTimeline;
