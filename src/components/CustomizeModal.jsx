import React, { useState } from 'react';
import { X, Heart, Settings, Save, Sparkles, Calendar, User, Feather } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

const CustomizeModal = ({ 
  isOpen, 
  onClose, 
  herName, 
  setHerName, 
  startDate, 
  setStartDate 
}) => {
  const [tempName, setTempName] = useState(herName);
  const [tempDate, setTempDate] = useState(startDate);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setHerName(tempName);
    setStartDate(tempDate);
    localStorage.setItem('birthday_her_name', tempName);
    localStorage.setItem('birthday_start_date', tempDate);
    soundFX.playChime();
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(1, 14, 23, 0.88)',
      backdropFilter: 'blur(14px)',
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div className="glass-card" style={{
        maxWidth: '480px',
        width: '100%',
        padding: '32px 24px',
        background: 'linear-gradient(145deg, #03263b, #011420)',
        border: '1.5px solid rgba(0, 245, 212, 0.45)',
        position: 'relative',
        boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(0, 245, 212, 0.3)',
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: '#c8f4f9',
            cursor: 'pointer',
          }}
        >
          <X size={20} />
        </button>

        <h4 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.7rem',
          color: '#fff',
          marginBottom: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <Feather size={22} color="#00f5d4" /> Personalize Birthday App
        </h4>
        <p style={{ color: '#c8f4f9', fontSize: '0.9rem', marginBottom: '20px' }}>
          Change her name and anniversary date to customize the counters & banners instantly!
        </p>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{
              fontSize: '0.85rem',
              color: '#00f5d4',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '6px',
              fontWeight: 600,
            }}>
              <User size={14} /> Girlfriend's Name / Nickname:
            </label>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="e.g. Karthini, My Princess..."
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(0, 245, 212, 0.35)',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
              }}
              required
            />
          </div>

          <div>
            <label style={{
              fontSize: '0.85rem',
              color: '#00f5d4',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '6px',
              fontWeight: 600,
            }}>
              <Calendar size={14} /> The Day You Met / Started Dating:
            </label>
            <input
              type="date"
              value={tempDate}
              onChange={(e) => setTempDate(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(0, 245, 212, 0.35)',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                colorScheme: 'dark',
              }}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
            <button
              type="submit"
              className="btn-romantic"
              style={{ flex: 1 }}
            >
              <Save size={16} /> Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-outline-romantic"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomizeModal;
