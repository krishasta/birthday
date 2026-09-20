import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Gift, ArrowDown, Feather, Video, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

const EnvelopeIntro = ({ herName, onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isVideoMuted;
    setIsVideoMuted(!isVideoMuted);
  };

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    soundFX.playChime();
    window.dispatchEvent(new CustomEvent('play-bg-music'));

    // Fire Peacock Confetti explosion (Teal, Cyan, Emerald, Gold, Purple)
    const count = 220;
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
      colors: ['#00f5d4', '#ffd166', '#ffffff'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#00b4d8', '#06d6a0', '#7209b7'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#06d6a0', '#ffd166', '#00f5d4'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#c8f4f9', '#a8e6cf'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#0077b6', '#ffd166'],
    });

    if (onOpen) onOpen();
  };

  return (
    <div className="hero-envelope-section" style={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '70px 16px 40px',
      position: 'relative',
      zIndex: 2,
      overflow: 'hidden',
    }}>
      {/* Background Video Layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
      }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isVideoMuted}
          playsInline
          webkit-playsinline="true"
          preload="auto"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.88,
            filter: 'brightness(0.95) contrast(1.06) saturate(1.1)',
            transform: 'scale(1.01)',
            transition: 'opacity 0.5s ease',
          }}
        >
          <source src="/videos/IMG_5649.mp4" type="video/mp4" />
          <source src="/videos/IMG_5649.MOV" type="video/quicktime" />
        </video>
        {/* Crisp soft gradient overlay to preserve video clarity & text readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(1, 13, 20, 0.45) 0%, rgba(1, 13, 20, 0.12) 30%, rgba(1, 13, 20, 0.12) 70%, #010d14 100%)',
        }} />
      </div>

      {/* Floating Video Controls Badge (Mobile-optimized) */}
      <div className="video-control-pill" style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(2, 28, 44, 0.82)',
        backdropFilter: 'blur(12px)',
        padding: '5px 10px',
        borderRadius: '9999px',
        border: '1px solid rgba(0, 245, 212, 0.35)',
        boxShadow: '0 4px 18px rgba(0,0,0,0.4)',
      }}>
        <span className="video-label" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#c8f4f9', fontSize: '0.75rem', fontWeight: 500 }}>
          <Video size={12} color="#00f5d4" />
          <span className="video-text">Video</span>
        </span>
        <button
          onClick={toggleVideoPlay}
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(0, 245, 212, 0.25)',
            color: '#c8f4f9',
            borderRadius: '50%',
            width: '26px',
            height: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          title={isVideoPlaying ? 'Pause Video' : 'Play Video'}
          aria-label="Toggle Video Play"
        >
          {isVideoPlaying ? <Pause size={11} /> : <Play size={11} />}
        </button>
        <button
          onClick={toggleVideoMute}
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(0, 245, 212, 0.25)',
            color: '#c8f4f9',
            borderRadius: '50%',
            width: '26px',
            height: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          title={isVideoMuted ? 'Unmute Video Audio' : 'Mute Video Audio'}
          aria-label="Toggle Video Audio"
        >
          {isVideoMuted ? <VolumeX size={11} /> : <Volume2 size={11} color="#00f5d4" />}
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '24px', maxWidth: '620px', width: '100%', position: 'relative', zIndex: 2 }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '5px 16px',
          borderRadius: '9999px',
          background: 'rgba(0, 245, 212, 0.15)',
          border: '1px solid rgba(0, 245, 212, 0.4)',
          color: '#00f5d4',
          fontSize: 'clamp(0.75rem, 2.8vw, 0.88rem)',
          fontWeight: 600,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginBottom: '14px',
          backdropFilter: 'blur(8px)',
        }}>
          <Sparkles size={14} /> Royal Birthday Surprise <Sparkles size={14} />
        </span>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.1rem, 6.8vw, 3.8rem)',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #ffffff 25%, #c8f4f9 60%, #00f5d4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.2,
          marginBottom: '10px',
          textShadow: '0 4px 20px rgba(0,0,0,0.6)',
          wordBreak: 'break-word',
        }}>
          Happy Birthday, {herName || 'Karthini'}! 🪶
        </h1>
        <p style={{
          fontFamily: 'var(--font-main)',
          color: '#b5e5eb',
          fontSize: 'clamp(0.95rem, 3.2vw, 1.1rem)',
          fontWeight: 300,
          lineHeight: 1.5,
          textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          padding: '0 8px',
        }}>
          A digital palace of love, timeless memories, and heartfelt promises crafted just for you.
        </p>
      </div>

      {/* Realistic Royal Peacock Envelope */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: 'min(94vw, 450px)',
          minHeight: isOpen ? 'auto' : '250px',
          position: 'relative',
          zIndex: 2,
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          perspective: '1000px',
        }}
      >
        {/* The Envelope Base Container */}
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(145deg, #052a3f 0%, #011420 100%)',
          borderRadius: '22px',
          border: '1.5px solid rgba(0, 245, 212, 0.35)',
          boxShadow: '0 20px 45px rgba(0,0,0,0.7), 0 0 35px rgba(0, 245, 212, 0.22)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(18px, 4.5vw, 24px)',
          overflow: 'hidden',
        }}>
          {/* Gold ribbon accents */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '32px',
            background: 'linear-gradient(90deg, #d4af37, #ffd166, #aa771c)',
            opacity: isOpen ? 0.2 : 0.65,
            boxShadow: '0 0 12px rgba(212, 175, 55, 0.5)',
            transition: 'opacity 0.6s ease',
          }} />
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '32px',
            background: 'linear-gradient(180deg, #d4af37, #ffd166, #aa771c)',
            opacity: isOpen ? 0.2 : 0.65,
            boxShadow: '0 0 12px rgba(212, 175, 55, 0.5)',
            transition: 'opacity 0.6s ease',
          }} />

          {!isOpen ? (
            /* Unopened State */
            <div style={{
              zIndex: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
              padding: '12px 0',
            }}>
              <button
                onClick={handleOpenEnvelope}
                className="wax-seal"
                style={{
                  transform: isHovered ? 'scale(1.12) rotate(6deg)' : 'scale(1)',
                }}
                title="Click to break the seal and open!"
                aria-label="Open Birthday Envelope"
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Feather size={22} color="#ffd166" />
                  <span style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#ffd166', marginTop: '2px' }}>OPEN</span>
                </div>
              </button>
              <div style={{ textAlign: 'center', zIndex: 6 }}>
                <p style={{ fontFamily: 'var(--font-hand)', fontSize: 'clamp(1.4rem, 4.5vw, 1.65rem)', color: '#c8f4f9', lineHeight: 1.3 }}>
                  Click the royal wax seal to open 🪶💌
                </p>
                <span style={{ fontSize: '0.8rem', color: '#7ec2cb' }}>Curated with infinite love for Karthini</span>
              </div>
            </div>
          ) : (
            /* Unfolded Romantic Letter State */
            <div style={{
              zIndex: 5,
              background: '#f8fcfa',
              borderRadius: '14px',
              padding: 'clamp(16px, 4vw, 24px) clamp(14px, 3.5vw, 20px)',
              color: '#06283d',
              boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
              width: '100%',
              animation: 'letterUnfold 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              border: '1px solid #b2ded7',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #7ec2cb', paddingBottom: '8px', flexWrap: 'wrap', gap: '4px' }}>
                <span style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1.35rem, 4vw, 1.55rem)', color: '#0077b6', fontWeight: 700 }}>
                  To My Love, {herName || 'Karthini'} ❤️
                </span>
                <span style={{ fontSize: '0.72rem', color: '#0a9396', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                  September 20 🪶
                </span>
              </div>

              <p style={{
                fontFamily: 'var(--font-hand)',
                fontSize: 'clamp(1.15rem, 3.6vw, 1.35rem)',
                lineHeight: 1.5,
                color: '#073b4c',
              }}>
                "September 20… உனக்கு Birthday மட்டும் இல்ல. எனக்கு நீ எவ்வளவு முக்கியமானவள் என்று இன்னொரு முறை உணர வைக்கும் ஒரு நாள். இந்த birthday-க்கு என் மனசுல இருக்கிற சில உண்மையான வார்த்தைகளை உனக்கு கொடுக்கிறேன்."
              </p>

              <div style={{
                fontFamily: 'var(--font-romantic)',
                fontSize: 'clamp(1.5rem, 4.5vw, 1.8rem)',
                color: '#0077b6',
                textAlign: 'right',
                marginTop: '2px',
              }}>
                Always yours, Gopi ❤️
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                <a
                  href="#heartfelt-letter"
                  className="btn-romantic"
                  style={{
                    width: '100%',
                    fontSize: 'clamp(0.85rem, 2.6vw, 0.95rem)',
                    padding: '10px 16px',
                    textDecoration: 'none',
                    minHeight: '44px',
                  }}
                >
                  <Feather size={16} /> Read Gopi's Full Heartfelt Letter 💌
                </a>
                <a
                  href="#memory-album"
                  className="btn-outline-romantic"
                  style={{
                    width: '100%',
                    fontSize: 'clamp(0.82rem, 2.4vw, 0.9rem)',
                    padding: '9px 14px',
                    textDecoration: 'none',
                    color: '#0a9396',
                    borderColor: '#a8dadc',
                    background: 'rgba(0, 180, 216, 0.08)',
                    minHeight: '42px',
                  }}
                >
                  <Gift size={15} /> Photo Album & Birthday Cake <ArrowDown size={15} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes letterUnfold {
          0% { opacity: 0; transform: scale(0.85) translateY(15px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default EnvelopeIntro;
