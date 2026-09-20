import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Volume1, Music, Sparkles, Upload } from 'lucide-react';

const DEFAULT_MUSIC_TRACKS = [
  { src: '/music/background-music.mp3', type: 'audio/mpeg' },
  { src: '/music/WhatsApp Audio 2026-09-20 at 6.17.14 PM.mpeg', type: 'audio/mpeg' },
];

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [customAudioUrl, setCustomAudioUrl] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef(null);

  // Initialize volume and event listeners
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }

    const handlePlayMusic = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log('Autoplay deferred until user interaction:', err);
        });
      }
    };

    const handlePauseMusic = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    const handleToggleMusic = () => {
      toggleMusic();
    };

    window.addEventListener('play-bg-music', handlePlayMusic);
    window.addEventListener('pause-bg-music', handlePauseMusic);
    window.addEventListener('toggle-bg-music', handleToggleMusic);

    // Try background playback on initial interaction anywhere
    const handleFirstInteraction = () => {
      // Don't force if already started or user intentionally stopped
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('play-bg-music', handlePlayMusic);
      window.removeEventListener('pause-bg-music', handlePauseMusic);
      window.removeEventListener('toggle-bg-music', handleToggleMusic);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => {
        console.log('Playback error:', e);
      });
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      audioRef.current.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const handleCustomAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomAudioUrl(url);
      setIsPlaying(true);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = url;
          audioRef.current.load();
          audioRef.current.play().catch(err => console.log(err));
        }
      }, 100);
    }
  };

  return (
    <div 
      className="music-player-pill"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 99,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'rgba(2, 22, 34, 0.92)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(0, 245, 212, 0.4)',
        padding: '8px 16px',
        borderRadius: '9999px',
        boxShadow: isPlaying 
          ? '0 8px 32px rgba(0,0,0,0.6), 0 0 24px rgba(0, 245, 212, 0.35)'
          : '0 8px 24px rgba(0,0,0,0.5)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={() => setShowVolumeSlider(true)}
      onMouseLeave={() => setShowVolumeSlider(false)}
    >
      {/* Background Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        {customAudioUrl ? (
          <source src={customAudioUrl} />
        ) : (
          DEFAULT_MUSIC_TRACKS.map((track, i) => (
            <source key={i} src={track.src} type={track.type} />
          ))
        )}
      </audio>

      {/* Animated Equalizer Wave when playing */}
      {isPlaying && (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '18px', marginRight: '2px' }}>
          {[0.6, 1, 0.8, 0.4, 0.9, 0.5].map((heightScale, i) => (
            <span
              key={i}
              style={{
                width: '3px',
                height: '100%',
                background: 'linear-gradient(to top, #00b4d8, #00f5d4)',
                borderRadius: '2px',
                animation: `eqBounce 0.75s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.12}s`,
                transformOrigin: 'bottom',
              }}
            />
          ))}
        </div>
      )}

      {/* Main Play / Pause Circle Button */}
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
        style={{
          background: isPlaying ? 'linear-gradient(135deg, #00b4d8, #06d6a0)' : 'rgba(255,255,255,0.12)',
          border: 'none',
          color: isPlaying ? '#011627' : '#ffffff',
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: isPlaying ? '0 0 16px rgba(0, 245, 212, 0.65)' : 'none',
          flexShrink: 0,
        }}
      >
        {isPlaying ? (
          isMuted ? <VolumeX size={18} /> : (volume > 0.5 ? <Volume2 size={18} /> : <Volume1 size={18} />)
        ) : (
          <VolumeX size={18} />
        )}
      </button>

      {/* Track info & Custom song upload link */}
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: '100px' }}>
        <span style={{ 
          fontSize: '0.82rem', 
          fontWeight: 600, 
          color: isPlaying ? '#00f5d4' : '#c8f4f9', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '5px' 
        }}>
          <Music size={12} color="#00f5d4" />
          {isPlaying ? 'Romantic Music' : 'Play Music'}
        </span>
        <label style={{ fontSize: '0.68rem', color: '#7ec2cb', cursor: 'pointer', textDecoration: 'underline' }}>
          {customAudioUrl ? 'Custom Music' : '+ Change Song'}
          <input
            type="file"
            accept="audio/*"
            onChange={handleCustomAudioUpload}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {/* Expandable Volume Slider */}
      {(showVolumeSlider || isPlaying) && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginLeft: '4px',
          transition: 'opacity 0.2s ease',
        }}>
          <button
            onClick={toggleMute}
            style={{
              background: 'transparent',
              border: 'none',
              color: isMuted ? '#ffd166' : '#7ec2cb',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
            }}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            aria-label="Music volume"
            style={{
              width: '60px',
              height: '4px',
              accentColor: '#00f5d4',
              cursor: 'pointer',
              borderRadius: '2px',
            }}
          />
        </div>
      )}

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
