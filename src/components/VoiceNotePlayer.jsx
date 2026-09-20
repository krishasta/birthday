import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Mic, Sparkles, Heart, Feather } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

const VoiceNotePlayer = ({ herName = 'Karthini' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const audioSrc = "/audio/WhatsApp Ptt 2026-09-20 at 9.46.40 AM.ogg";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration || 0);
      setCurrentTime(audio.currentTime || 0);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Temporarily pause background music so voice note is crystal clear
      soundFX.stopRomanticBGM();
      audioRef.current.play().catch(e => console.log(e));
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleRestart = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    audioRef.current.play().catch(e => console.log(e));
    setIsPlaying(true);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (timeInSec) => {
    if (isNaN(timeInSec)) return '0:00';
    const minutes = Math.floor(timeInSec / 60);
    const seconds = Math.floor(timeInSec % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="voice-message" style={{
      maxWidth: '820px',
      margin: '50px auto 40px',
      padding: '0 16px',
      position: 'relative',
      zIndex: 2,
    }}>
      <div className="glass-card" style={{
        background: 'linear-gradient(155deg, rgba(3, 30, 48, 0.94) 0%, rgba(1, 16, 26, 0.98) 100%)',
        borderRadius: '24px',
        border: '1.5px solid rgba(0, 245, 212, 0.4)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(0, 245, 212, 0.2)',
        padding: 'clamp(24px, 5vw, 36px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Hidden HTML5 Audio Element */}
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="metadata"
        />

        {/* Ambient Top Glow */}
        <div style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(0, 245, 212, 0.15) 0%, transparent 70%)',
          filter: 'blur(35px)',
          pointerEvents: 'none',
        }} />

        {/* Header Label */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '18px',
          flexWrap: 'wrap',
          gap: '10px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              background: 'linear-gradient(135deg, #00b4d8, #06d6a0)',
              color: '#011627',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(0, 245, 212, 0.35)',
            }}>
              <Mic size={14} /> Voice Note 🪶
            </span>
            <span style={{ fontSize: '0.85rem', color: '#ffd166', fontWeight: 600 }}>
              Special Audio Message
            </span>
          </div>

          <span style={{ fontSize: '0.78rem', color: '#7ec2cb' }}>
            September 20 • 9:46 AM
          </span>
        </div>

        {/* Title and Romantic Note */}
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.5rem, 4vw, 2.1rem)',
          color: '#ffffff',
          marginBottom: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          A Heartfelt Voice Message for {herName || 'Karthini'} 🎙️❤️
        </h3>
        <p style={{
          color: '#c8f4f9',
          fontSize: '0.95rem',
          marginBottom: '24px',
        }}>
          Tap play to listen to this special recorded voice message from the heart.
        </p>

        {/* Audio Player Controls Box */}
        <div style={{
          background: 'rgba(2, 20, 32, 0.85)',
          border: '1px solid rgba(0, 245, 212, 0.3)',
          borderRadius: '18px',
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}>
            {/* Big Main Play/Pause Button */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause Voice Message' : 'Play Voice Message'}
              style={{
                background: isPlaying
                  ? 'linear-gradient(135deg, #00b4d8, #06d6a0)'
                  : 'linear-gradient(135deg, #00f5d4, #ffd166)',
                color: '#011627',
                border: 'none',
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                boxShadow: '0 6px 20px rgba(0, 245, 212, 0.45)',
                transition: 'all 0.25s ease',
              }}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: '3px' }} />}
            </button>

            {/* Waveform Visualization Animation */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.82rem',
                color: '#a8dadc',
              }}>
                <span style={{ color: '#00f5d4', fontWeight: 600 }}>
                  {formatTime(currentTime)}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffd166' }}>
                  {isPlaying && <span>Playing voice note...</span>}
                  <span>{formatTime(duration)}</span>
                </span>
              </div>

              {/* Progress Slider Track */}
              <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '4px',
                    accentColor: '#00f5d4',
                    background: `linear-gradient(to right, #00f5d4 ${progressPercent}%, rgba(255,255,255,0.15) ${progressPercent}%)`,
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Animated Sound Wave Bars */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '3px',
                height: '16px',
                marginTop: '2px',
              }}>
                {[0.4, 0.8, 1, 0.6, 0.3, 0.9, 0.5, 0.7, 0.4, 0.9, 0.6, 0.3, 0.8, 1, 0.5, 0.7, 0.4, 0.8, 0.6, 0.3].map((heightScale, i) => (
                  <span
                    key={i}
                    style={{
                      flex: 1,
                      height: isPlaying ? '100%' : '30%',
                      background: isPlaying
                        ? 'linear-gradient(to top, #00b4d8, #00f5d4)'
                        : 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '2px',
                      transform: isPlaying ? `scaleY(${heightScale})` : 'scaleY(0.3)',
                      transformOrigin: 'bottom',
                      transition: isPlaying ? 'none' : 'all 0.3s ease',
                      animation: isPlaying ? `audioWaveBounce 0.7s ease-in-out infinite alternate` : 'none',
                      animationDelay: `${(i % 5) * 0.12}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Toolbar: Replay & Mute */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '10px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '10px',
          }}>
            <button
              onClick={handleRestart}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(0, 245, 212, 0.25)',
                borderRadius: '9999px',
                color: '#c8f4f9',
                padding: '5px 12px',
                fontSize: '0.78rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              title="Replay from beginning"
            >
              <RotateCcw size={12} /> Replay
            </button>

            <button
              onClick={toggleMute}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(0, 245, 212, 0.25)',
                borderRadius: '9999px',
                color: '#c8f4f9',
                padding: '5px 12px',
                fontSize: '0.78rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} color="#00f5d4" />}
              <span>{isMuted ? 'Unmute' : 'Mute'}</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes audioWaveBounce {
          0% { transform: scaleY(0.25); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
};

export default VoiceNotePlayer;
