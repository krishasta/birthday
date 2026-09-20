import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Heart, Sparkles, Feather } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [customAudioUrl, setCustomAudioUrl] = useState(null);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (customAudioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(e => console.log(e));
        setIsPlaying(true);
      }
    } else {
      const active = soundFX.toggleRomanticBGM();
      setIsPlaying(active);
    }
  };

  const handleCustomAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      soundFX.stopRomanticBGM();
      setCustomAudioUrl(url);
      setIsPlaying(true);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(err => console.log(err));
        }
      }, 100);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 99,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: 'rgba(2, 22, 34, 0.88)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(0, 245, 212, 0.35)',
      padding: '8px 16px',
      borderRadius: '9999px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.6), 0 0 20px rgba(0, 245, 212, 0.25)',
    }}>
      {customAudioUrl && (
        <audio
          ref={audioRef}
          src={customAudioUrl}
          loop
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Animated Equalizer Wave when playing */}
      {isPlaying && (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '18px', marginRight: '4px' }}>
          {[0.6, 1, 0.8, 0.4, 0.9].map((heightScale, i) => (
            <span
              key={i}
              style={{
                width: '3px',
                height: '100%',
                background: 'linear-gradient(to top, #00b4d8, #00f5d4)',
                borderRadius: '2px',
                animation: `eqBounce 0.8s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.15}s`,
                transformOrigin: 'bottom',
              }}
            />
          ))}
        </div>
      )}

      <button
        onClick={toggleMusic}
        aria-label="Toggle Romantic Music"
        style={{
          background: isPlaying ? 'linear-gradient(135deg, #00b4d8, #06d6a0)' : 'rgba(255,255,255,0.1)',
          border: 'none',
          color: isPlaying ? '#011627' : '#ffffff',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: isPlaying ? '0 0 15px rgba(0, 245, 212, 0.6)' : 'none',
        }}
      >
        {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#c8f4f9', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Music size={12} color="#00f5d4" />
          {isPlaying ? 'Royal Melody' : 'Play Music'}
        </span>
        <label style={{ fontSize: '0.7rem', color: '#7ec2cb', cursor: 'pointer', textDecoration: 'underline' }}>
          {customAudioUrl ? 'Custom Song Loaded' : '+ Add Her Favorite Song'}
          <input
            type="file"
            accept="audio/*"
            onChange={handleCustomAudioUpload}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      <style>{`
        @keyframes eqBounce {
          0% { transform: scaleY(0.2); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
