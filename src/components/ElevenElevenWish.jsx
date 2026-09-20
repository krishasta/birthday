import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Star, Moon, Globe, Copy, Check, Feather } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

const ElevenElevenWish = ({ herName = 'Karthini' }) => {
  const [copied, setCopied] = useState(false);
  const [wishCount, setWishCount] = useState(0);

  const fullWishText = `11:11 🦚🫀🪐🫂✨🌙🌍
If I had one wish at this exact moment, I wouldn’t wish for a perfect life, more money, or anything the world could give me.
I’d simply wish for you—to stay in my life, to keep growing with me, and to keep sharing all the little moments that somehow become my favourite memories.

Happy Birthday, my love. 🎂❤️
You came into my life and became a part of me in ways I never expected. Somewhere between our conversations, our laughter, our silly fights, our beautiful moments, and even the difficult days, you became someone I could never look at as “just another person.”
You became my person. ❤️

I know we’re not perfect. We have our misunderstandings, our arguments, and days when we don’t understand each other. But even through all of that, my heart still chooses you. Because loving you was never about finding someone perfect—it was about finding someone who feels worth holding onto, worth understanding, and worth choosing every single day.

On your birthday, I just want you to know this:
I’m proud of you. I’m grateful for you. And I’m so thankful that I get to call you mine. 🫶🏻
I hope this new year of your life gives you the happiness you deserve, the peace your heart needs, and the courage to chase every dream you have. And if life ever feels heavy, I hope you remember that you don’t have to carry everything alone.
I’ll be there—not because I promised a perfect forever, but because I genuinely want to be beside you for as much of that forever as life allows. ❤️

So at 11:11, I’m making just one wish…
May I get to see you smile, love you, annoy you, support you, fight with you, make up with you, and create a thousand more memories with you. 🥹❤️

Happy Birthday, my beautiful girl. 🎂
You are one of the most precious chapters of my life, and I hope our story has many, many pages left♾️
11:11 — I wished for you today, tomorrow, and every day after that. ❤️✨`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullWishText);
    setCopied(true);
    soundFX.playPop();
    setTimeout(() => setCopied(false), 3000);
  };

  const handleMakeWish = () => {
    soundFX.playChime();
    setWishCount(prev => prev + 1);

    // Cosmic 11:11 Starburst Confetti
    const count = 180;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#ffd166', '#ffffff', '#00f5d4'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#00b4d8', '#7209b7', '#06d6a0'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.9,
      colors: ['#ffd166', '#00f5d4', '#ff70a6'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#c8f4f9', '#ffd166'],
    });
  };

  return (
    <section id="eleven-eleven-wish" style={{
      maxWidth: '940px',
      margin: '60px auto',
      padding: '0 16px',
      position: 'relative',
      zIndex: 2,
    }}>
      {/* Header Badge */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 20px',
          borderRadius: '9999px',
          background: 'rgba(255, 209, 102, 0.15)',
          border: '1px solid rgba(255, 209, 102, 0.45)',
          color: '#ffd166',
          fontSize: '0.85rem',
          fontWeight: 700,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          marginBottom: '12px',
          backdropFilter: 'blur(8px)',
        }}>
          <Star size={14} fill="#ffd166" color="#ffd166" /> Cosmic 11:11 Birthday Wish <Star size={14} fill="#ffd166" color="#ffd166" />
        </span>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.2rem, 5.5vw, 3.4rem)',
          background: 'linear-gradient(135deg, #ffffff 15%, #ffd166 50%, #00f5d4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '10px',
          lineHeight: 1.2,
          textShadow: '0 4px 25px rgba(0,0,0,0.6)',
        }}>
          11:11 🦚🫀🪐🫂✨🌙🌍
        </h2>
        <p style={{
          color: '#c8f4f9',
          fontSize: '1.05rem',
          maxWidth: '650px',
          margin: '0 auto',
        }}>
          "When the universe aligns at 11:11, my heart makes only one wish — you."
        </p>
      </div>

      {/* Main Cosmic Wish Container */}
      <div style={{
        background: 'linear-gradient(165deg, rgba(4, 28, 44, 0.95) 0%, rgba(2, 18, 30, 0.98) 50%, rgba(1, 10, 18, 0.99) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: '1.5px solid rgba(255, 209, 102, 0.4)',
        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.85), 0 0 50px rgba(255, 209, 102, 0.15), inset 0 0 50px rgba(0, 245, 212, 0.05)',
        padding: 'clamp(24px, 5vw, 54px) clamp(20px, 4.5vw, 48px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative Inner Starlight Frame */}
        <div style={{
          position: 'absolute',
          inset: '12px',
          border: '1px dashed rgba(0, 245, 212, 0.25)',
          borderRadius: '16px',
          pointerEvents: 'none',
        }} />

        {/* Ambient Cosmic Orbs */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          left: '10%',
          width: '280px',
          height: '280px',
          background: 'radial-gradient(circle, rgba(255, 209, 102, 0.15) 0%, transparent 70%)',
          filter: 'blur(45px)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '5%',
          right: '5%',
          width: '280px',
          height: '280px',
          background: 'radial-gradient(circle, rgba(0, 245, 212, 0.15) 0%, transparent 70%)',
          filter: 'blur(45px)',
          pointerEvents: 'none',
        }} />

        {/* Top Header Row with 11:11 Time Emblem */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 209, 102, 0.25)',
          paddingBottom: '20px',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '14px',
          position: 'relative',
          zIndex: 2,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.8rem, 4.5vw, 2.4rem)',
              fontWeight: 800,
              color: '#ffd166',
              letterSpacing: '2px',
              textShadow: '0 0 15px rgba(255, 209, 102, 0.6)',
            }}>
              11:11
            </span>
            <span style={{ fontSize: '1.4rem' }}>🦚🫀🪐</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #ffd166, #e5a93c)',
            color: '#011627',
            padding: '6px 18px',
            borderRadius: '9999px',
            boxShadow: '0 4px 16px rgba(255, 209, 102, 0.4)',
            fontSize: '0.82rem',
            fontWeight: 800,
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            <Sparkles size={14} /> My Universe Wish 🌍
          </div>
        </div>

        {/* Wish Content Body */}
        <div style={{
          fontFamily: 'var(--font-main)',
          fontSize: 'clamp(1.05rem, 2.6vw, 1.25rem)',
          color: '#e2f8f5',
          lineHeight: '1.9',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Opening Statement */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 209, 102, 0.1) 0%, rgba(0, 245, 212, 0.08) 100%)',
            borderLeft: '4px solid #ffd166',
            borderRight: '1px solid rgba(255, 209, 102, 0.2)',
            borderTop: '1px solid rgba(255, 209, 102, 0.2)',
            borderBottom: '1px solid rgba(255, 209, 102, 0.2)',
            padding: '20px 24px',
            borderRadius: '0 18px 18px 0',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}>
            <p style={{ margin: 0, fontSize: 'clamp(1.1rem, 2.8vw, 1.3rem)', fontStyle: 'italic', color: '#ffffff', lineHeight: 1.7 }}>
              "If I had one wish at this exact moment, I wouldn’t wish for a perfect life, more money, or anything the world could give me.<br />
              <strong style={{ color: '#ffd166', display: 'block', marginTop: '8px', fontStyle: 'normal' }}>
                I’d simply wish for you—to stay in my life, to keep growing with me, and to keep sharing all the little moments that somehow become my favourite memories."
              </strong>
            </p>
          </div>

          {/* Birthday Greeting Callout */}
          <p style={{ color: '#d0f4de' }}>
            <strong style={{ color: '#00f5d4', fontSize: '1.25rem' }}>Happy Birthday, my love. 🎂❤️</strong><br />
            You came into my life and became a part of me in ways I never expected. Somewhere between our conversations, our laughter, our silly fights, our beautiful moments, and even the difficult days, you became someone I could never look at as “just another person.”
          </p>

          {/* "You Became My Person" Radiant Centerpiece */}
          <div style={{
            textAlign: 'center',
            padding: '24px 20px',
            background: 'linear-gradient(135deg, rgba(255, 209, 102, 0.16) 0%, rgba(0, 245, 212, 0.16) 100%)',
            borderRadius: '20px',
            border: '1.5px solid rgba(255, 209, 102, 0.5)',
            boxShadow: '0 10px 32px rgba(255, 209, 102, 0.2), inset 0 0 20px rgba(0, 245, 212, 0.1)',
            margin: '6px 0',
          }}>
            <span style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(2.5rem, 6.5vw, 3.5rem)',
              background: 'linear-gradient(135deg, #ffffff 15%, #ffd166 60%, #00f5d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'block',
              fontWeight: 700,
              textShadow: '0 0 25px rgba(255, 209, 102, 0.4)',
            }}>
              You became my person. ❤️🫂
            </span>
          </div>

          <p>
            I know we’re not perfect. We have our misunderstandings, our arguments, and days when we don’t understand each other. But even through all of that, <strong style={{ color: '#00f5d4' }}>my heart still chooses you.</strong>
          </p>

          {/* Core Philosophy */}
          <div style={{
            background: 'rgba(0, 245, 212, 0.08)',
            border: '1px solid rgba(0, 245, 212, 0.35)',
            borderRadius: '16px',
            padding: '18px 22px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
          }}>
            <p style={{ margin: 0, color: '#e0fbf2', fontWeight: 500 }}>
              Because loving you was never about finding someone perfect—<strong style={{ color: '#ffd166' }}>it was about finding someone who feels worth holding onto, worth understanding, and worth choosing every single day.</strong>
            </p>
          </div>

          {/* On your birthday... */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.18) 0%, rgba(2, 62, 138, 0.14) 100%)',
            borderLeft: '4px solid #00b4d8',
            borderRight: '1px solid rgba(0, 180, 216, 0.2)',
            borderTop: '1px solid rgba(0, 180, 216, 0.2)',
            borderBottom: '1px solid rgba(0, 180, 216, 0.2)',
            padding: '18px 22px',
            borderRadius: '0 16px 16px 0',
          }}>
            <span style={{ color: '#00f5d4', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              On your birthday, I just want you to know this:
            </span>
            <p style={{ margin: 0, fontSize: '1.2rem', color: '#ffffff', fontWeight: 600 }}>
              "I’m proud of you. I’m grateful for you. And I’m so thankful that I get to call you mine. 🫶🏻"
            </p>
          </div>

          <p>
            I hope this new year of your life gives you the happiness you deserve, the peace your heart needs, and the courage to chase every dream you have. And if life ever feels heavy, I hope you remember that <strong style={{ color: '#ffd166' }}>you don’t have to carry everything alone.</strong>
          </p>

          {/* Genuine Promise */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(6, 214, 160, 0.14) 0%, rgba(0, 180, 216, 0.1) 100%)',
            borderRadius: '16px',
            padding: '20px 22px',
            border: '1px solid rgba(6, 214, 160, 0.4)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}>
            <p style={{ margin: 0, color: '#c8f4f9', fontWeight: 500 }}>
              "I’ll be there—not because I promised a perfect forever, but because <strong style={{ color: '#06d6a0', fontSize: '1.25rem', display: 'block', marginTop: '6px' }}>I genuinely want to be beside you for as much of that forever as life allows. ❤️</strong>"
            </p>
          </div>

          {/* 11:11 Grand Climax Declaration Box */}
          <div style={{
            background: 'linear-gradient(145deg, #032238 0%, #011422 100%)',
            color: '#fff',
            borderRadius: '20px',
            padding: '28px 24px',
            textAlign: 'center',
            boxShadow: '0 12px 40px rgba(0,0,0,0.6), 0 0 35px rgba(255, 209, 102, 0.25)',
            border: '1.5px solid rgba(255, 209, 102, 0.6)',
          }}>
            <span style={{ color: '#ffd166', fontSize: '0.92rem', letterSpacing: '1.5px', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              ✨ So at 11:11, I’m making just one wish… ✨
            </span>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.2rem, 3.2vw, 1.55rem)',
              lineHeight: 1.7,
              color: '#ffffff',
              fontStyle: 'italic',
              margin: '0 auto 16px',
            }}>
              "May I get to see you smile, love you, annoy you, support you, fight with you, make up with you, and create a thousand more memories with you. 🥹❤️"
            </p>
            <div style={{
              display: 'inline-block',
              padding: '6px 18px',
              background: 'rgba(255, 209, 102, 0.15)',
              border: '1px solid rgba(255, 209, 102, 0.4)',
              borderRadius: '9999px',
              color: '#ffd166',
              fontSize: '0.85rem',
              fontWeight: 700,
            }}>
              Happy Birthday, my beautiful girl. 🎂
            </div>
          </div>

          {/* Infinity Story Quote */}
          <div style={{
            textAlign: 'center',
            marginTop: '10px',
            padding: '16px 20px',
            background: 'rgba(0, 245, 212, 0.08)',
            border: '1px solid rgba(0, 245, 212, 0.3)',
            borderRadius: '16px',
          }}>
            <p style={{
              fontSize: 'clamp(1.15rem, 3vw, 1.35rem)',
              color: '#d0f4de',
              fontWeight: 600,
              margin: 0,
            }}>
              "You are one of the most precious chapters of my life, and I hope our story has many, many pages left ♾️"
            </p>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.25rem, 3.2vw, 1.5rem)',
              fontWeight: 700,
              color: '#ffd166',
              marginTop: '10px',
              textShadow: '0 0 15px rgba(255, 209, 102, 0.5)',
            }}>
              11:11 — I wished for you today, tomorrow, and every day after that. ❤️✨
            </div>
          </div>
        </div>

        {/* Bottom Interactive Toolbar */}
        <div style={{
          marginTop: '36px',
          paddingTop: '22px',
          borderTop: '1px solid rgba(255, 209, 102, 0.25)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          position: 'relative',
          zIndex: 2,
        }}>
          <button
            onClick={handleMakeWish}
            className="btn-romantic"
            style={{
              background: 'linear-gradient(135deg, #ffd166 0%, #e5a93c 50%, #00f5d4 100%)',
              color: '#011627',
              padding: '12px 24px',
              fontSize: '0.95rem',
              fontWeight: 800,
            }}
          >
            <Star size={18} fill="#011627" color="#011627" />
            Make an 11:11 Wish Together ✨ {wishCount > 0 ? `(${wishCount})` : ''}
          </button>

          <button
            onClick={handleCopy}
            className="btn-outline-romantic"
            style={{
              borderColor: 'rgba(255, 209, 102, 0.4)',
              color: '#ffd166',
              padding: '11px 22px',
              fontSize: '0.92rem',
            }}
          >
            {copied ? (
              <>
                <Check size={16} color="#00f5d4" /> 11:11 Wish Saved to Clipboard!
              </>
            ) : (
              <>
                <Copy size={16} /> Save 11:11 Wish As Keepsake
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ElevenElevenWish;
