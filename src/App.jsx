import React, { useState, useEffect } from 'react';
import FloatingParticles from './components/FloatingParticles';
import MusicPlayer from './components/MusicPlayer';
import EnvelopeIntro from './components/EnvelopeIntro';
import HeartfeltLetter from './components/HeartfeltLetter';
import ElevenElevenWish from './components/ElevenElevenWish';
import InteractiveCake from './components/InteractiveCake';
import MemoryAlbum from './components/MemoryAlbum';
import LoveNotes from './components/LoveNotes';
import LoveTimeline from './components/LoveTimeline';
import VoiceNotePlayer from './components/VoiceNotePlayer';
import CustomizeModal from './components/CustomizeModal';
import { Heart, Sparkles, Settings } from 'lucide-react';

function App() {
  const [herName, setHerName] = useState(() => {
    const saved = localStorage.getItem('birthday_her_name');
    if (!saved || saved === 'My Sweetheart') return 'Karthini';
    return saved;
  });

  const [startDate, setStartDate] = useState(() => {
    const saved = localStorage.getItem('birthday_start_date');
    if (!saved || saved === '2024-01-01') return '2023-09-20';
    return saved;
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Background Animated Starry Glow */}
      <div className="bg-ambient-stars" />

      {/* Floating Romantic Hearts & Petals */}
      <FloatingParticles />

      {/* Background Music Widget */}
      <MusicPlayer />

      {/* 1. Envelope Opening Surprise */}
      <EnvelopeIntro 
        herName={herName} 
        onOpen={() => {
          // Scroll down smoothly to letter after open
          setTimeout(() => {
            const hub = document.getElementById('heartfelt-letter');
            if (hub) hub.scrollIntoView({ behavior: 'smooth' });
          }, 1200);
        }}
      />

      {/* 2. Gopi's Heartfelt Birthday Letter & Promises to Karthini */}
      <HeartfeltLetter herName={herName} />

      {/* 3. Cosmic 11:11 Birthday Wish & Eternal Promises */}
      <ElevenElevenWish herName={herName} />

      {/* 4. Interactive Birthday Cake & Wish Ceremony */}
      <InteractiveCake herName={herName} />

      {/* 5. 3D Polaroid Memory Album & Slideshow Presentation */}
      <MemoryAlbum />

      {/* 6. Reasons Why I Love You Cards */}
      <LoveNotes />

      {/* 7. Love Journey Milestone Timeline */}
      <LoveTimeline />

      {/* 8. Special Birthday Voice Note / Audio Message */}
      <VoiceNotePlayer herName={herName} />

      {/* Romantic Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '50px 20px 20px',
        color: '#c8f4f9',
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontFamily: 'var(--font-script)',
          fontSize: '2.2rem',
          color: '#ffffff',
          marginBottom: '8px',
        }}>
          <span>Always yours, Gopi</span>
          <Heart size={22} fill="#00f5d4" color="#00f5d4" />
        </div>
        <p style={{
          fontFamily: 'var(--font-hand)',
          fontSize: '1.45rem',
          color: '#d0f4de',
          maxWidth: '560px',
          margin: '0 auto 16px',
        }}>
          "September 20 will always be special to me, because the person I love was born on this day. Happy Birthday, Karthini 🪶❤️"
        </p>
        <button
          onClick={() => setIsCustomizerOpen(true)}
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(0, 245, 212, 0.35)',
            borderRadius: '9999px',
            color: '#00f5d4',
            padding: '6px 16px',
            fontSize: '0.82rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
          }}
        >
          <Settings size={13} /> Edit Name & Dates
        </button>
      </footer>

      {/* Customizer Modal */}
      <CustomizeModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        herName={herName}
        setHerName={setHerName}
        startDate={startDate}
        setStartDate={setStartDate}
      />
    </div>
  );
}

export default App;
