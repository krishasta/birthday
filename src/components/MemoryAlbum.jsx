import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, ChevronLeft, ChevronRight, Maximize2, 
  X, Plus, Heart, Sparkles, RefreshCw, Upload, Camera, Film, ArrowRight,
  Image as ImageIcon, Grid, Trash2, Download, Check, Link2, Copy, ExternalLink, Loader2,
  Compass, Coffee, Cake, Smile, Layers, Tag
} from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

const ALBUMS = [
  { id: 'all', name: 'All Moments', icon: Sparkles, color: '#00f5d4' },
  { id: 'adventures', name: 'Adventures & Trips', icon: Compass, color: '#06d6a0' },
  { id: 'dates', name: 'Cozy Dates & Cafes', icon: Coffee, color: '#ffd166' },
  { id: 'celebrations', name: 'Celebrations & Milestones', icon: Cake, color: '#00b4d8' },
  { id: 'candids', name: 'Sweet Candid Clicks', icon: Smile, color: '#7209b7' },
];

const DEFAULT_MEMORIES = [
  {
    id: 1,
    image: '/assets/memory1.jpg',
    title: 'Golden Sunset & Soft Whispers',
    album: 'adventures',
    date: 'Our Unforgettable Walk',
    note: 'Walking with your hand in mine as the ocean waves touched our feet... That was the moment I knew I wanted to walk beside you forever.',
    likes: 24,
  },
  {
    id: 2,
    image: '/assets/memory2.jpg',
    title: 'Coffee, Laughter & Late Mornings',
    album: 'dates',
    date: 'Cozy Cafe Date',
    note: 'The sweetest sound in the entire world will always be your spontaneous laughter over a warm cup of coffee.',
    likes: 42,
  },
  {
    id: 3,
    image: '/assets/memory3.jpg',
    title: 'Counting Stars Under The Sky',
    album: 'adventures',
    date: 'Stargazing Night',
    note: 'Even with a billion sparkling stars in the sky, my eyes were only looking at you.',
    likes: 38,
  },
  {
    id: 4,
    image: '/assets/memory4.jpg',
    title: 'Wildflowers & Golden Sun',
    album: 'adventures',
    date: 'Scenic Roadtrip',
    note: 'Every adventure with you feels like a dream I never want to wake up from. Happy Birthday, my greatest adventure!',
    likes: 56,
  },
  {
    id: 5,
    image: '/assets/cake.jpg',
    title: 'Celebrating Sweet Moments',
    album: 'celebrations',
    date: 'Birthday Surprise',
    note: 'Every smile of yours is a celebration in itself. May this year bring you all the warmth, peace, and love you give to others.',
    likes: 64,
  },
  {
    id: 6,
    image: '/assets/memory1.jpg',
    title: 'Our Beautiful Tomorrow',
    album: 'candids',
    date: 'Hand In Hand',
    note: 'Looking into your eyes gives me all the strength and peace I will ever need. Forever by your side, Karthini.',
    likes: 49,
  },
];

const APPS_SCRIPT_CODE = `function doGet(e) {
  var folderId = "157fqgUn1Hdf-t6pL4JHr6dTqtlKnGn4c"; // Your Google Drive Folder ID
  if (e && e.parameter && e.parameter.folderId) folderId = e.parameter.folderId;
  
  try {
    var folder = DriveApp.getFolderById(folderId);
    var files = folder.getFiles();
    var images = [];
    var count = 1;
    var albumTypes = ["adventures", "dates", "celebrations", "candids"];
    
    while (files.hasNext()) {
      var file = files.next();
      var mimeType = file.getMimeType();
      var fileName = file.getName();
      if (mimeType.indexOf("image/") !== -1 || fileName.match(/\\.(jpg|jpeg|png|webp|heic|gif)$/i)) {
        var fileId = file.getId();
        var albumChoice = albumTypes[(count - 1) % albumTypes.length];
        
        images.push({
          id: fileId,
          title: fileName.replace(/\\.[^/.]+$/, "").replace(/[-_]/g, " ") || ("Memory #" + count),
          album: albumChoice,
          date: Utilities.formatDate(file.getDateCreated(), "GMT", "MMMM yyyy"),
          image: "https://lh3.googleusercontent.com/d/" + fileId + "=w1600",
          thumbnail: "https://lh3.googleusercontent.com/d/" + fileId + "=w600",
          note: "A priceless memory from our journey together. Forever treasured in my heart.",
          likes: Math.floor(Math.random() * 25) + 15
        });
        count++;
      }
    }
    return ContentService.createTextOutput(JSON.stringify({ status: "success", count: images.length, photos: images }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

const MemoryAlbum = ({ customMemories, onUpdateMemories }) => {
  const [memories, setMemories] = useState(() => {
    const saved = localStorage.getItem('birthday_memories');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        // Ensure album property is assigned
        return parsed.map((item, idx) => ({
          ...item,
          album: item.album || ['adventures', 'dates', 'celebrations', 'candids'][idx % 4]
        }));
      } catch (e) {}
    }
    return customMemories || DEFAULT_MEMORIES;
  });

  const [selectedAlbum, setSelectedAlbum] = useState('all');
  const [likedCards, setLikedCards] = useState({});
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Google Drive Modal & Fetch States
  const [showDriveModal, setShowDriveModal] = useState(false);
  const [driveScriptUrl, setDriveScriptUrl] = useState(() => {
    return localStorage.getItem('birthday_drive_script_url') || 'https://script.google.com/macros/s/AKfycbzxpurewwXporcjBWbZv5U3sCCEErh7h2_yCMLjwvNSHtVd9KzHYI-Uug7jFOKSinPu/exec';
  });
  const [isFetchingDrive, setIsFetchingDrive] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Touch swipe support for mobile lightbox
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Filter memories by selected album
  const filteredMemories = selectedAlbum === 'all' 
    ? memories 
    : memories.filter(m => m.album === selectedAlbum);

  // Sync memories changes
  const saveMemories = (newList) => {
    setMemories(newList);
    try {
      localStorage.setItem('birthday_memories', JSON.stringify(newList));
    } catch (e) {
      console.warn('Storage quota exceeded, keeping in-memory state');
    }
    if (onUpdateMemories) onUpdateMemories(newList);
  };

  // Fetch photos from Google Apps Script Web App
  const fetchFromDriveScript = async (urlToFetch) => {
    const targetUrl = urlToFetch || driveScriptUrl;
    if (!targetUrl || !targetUrl.trim()) {
      alert('Please enter your Google Apps Script Web App URL first!');
      return;
    }

    setIsFetchingDrive(true);
    try {
      const cleanUrl = targetUrl.trim();
      const response = await fetch(cleanUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });
      const data = await response.json();

      if (data.status === 'success' && data.photos && data.photos.length > 0) {
        const albumKeys = ['adventures', 'dates', 'celebrations', 'candids'];
        const formatted = data.photos.map((p, idx) => ({
          ...p,
          album: p.album || albumKeys[idx % albumKeys.length]
        }));
        saveMemories(formatted);
        localStorage.setItem('birthday_drive_script_url', cleanUrl);
        soundFX.playChime();
        alert(`🎉 Successfully synced ${formatted.length} photos into categorized albums!`);
        setShowDriveModal(false);
      } else {
        alert(data.message || 'No photos found in this folder. Make sure folder permissions are set to "Anyone with the link can view".');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to Google Apps Script. Please verify the Web App deployment URL has "Who has access" set to "Anyone".');
    } finally {
      setIsFetchingDrive(false);
    }
  };

  // Auto-sync on first mount if URL is available
  useEffect(() => {
    if (driveScriptUrl && memories.length <= DEFAULT_MEMORIES.length) {
      fetch(driveScriptUrl)
        .then(res => res.json())
        .then(data => {
          if (data && data.status === 'success' && data.photos && data.photos.length > 0) {
            const albumKeys = ['adventures', 'dates', 'celebrations', 'candids'];
            const formatted = data.photos.map((p, idx) => ({
              ...p,
              album: p.album || albumKeys[idx % albumKeys.length]
            }));
            saveMemories(formatted);
          }
        })
        .catch(e => console.log('Drive auto-sync:', e));
    }
  }, []);

  // Lightbox slideshow timer
  useEffect(() => {
    let timer;
    if (selectedPhotoIndex !== null && isAutoPlaying) {
      timer = setInterval(() => {
        setSelectedPhotoIndex(prev => (prev + 1) % filteredMemories.length);
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [selectedPhotoIndex, isAutoPlaying, filteredMemories.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex(prev => (prev + 1) % filteredMemories.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex(prev => (prev - 1 + filteredMemories.length) % filteredMemories.length);
      } else if (e.key === 'Escape') {
        setSelectedPhotoIndex(null);
        setIsAutoPlaying(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, filteredMemories.length]);

  const handleOpenLightbox = (index, e) => {
    if (e) e.stopPropagation();
    setSelectedPhotoIndex(index);
    soundFX.playPop();
  };

  const handleCloseLightbox = () => {
    setSelectedPhotoIndex(null);
    setIsAutoPlaying(false);
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setSelectedPhotoIndex(prev => (prev - 1 + filteredMemories.length) % filteredMemories.length);
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setSelectedPhotoIndex(prev => (prev + 1) % filteredMemories.length);
  };

  const handleLike = (id, e) => {
    if (e) e.stopPropagation();
    soundFX.playPop();
    setLikedCards(prev => ({ ...prev, [id]: !prev[id] }));
    const updated = memories.map(m => {
      if (m.id === id) {
        return { ...m, likes: (m.likes || 0) + (likedCards[id] ? -1 : 1) };
      }
      return m;
    });
    saveMemories(updated);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset gallery to default photos?')) {
      saveMemories(DEFAULT_MEMORIES);
      soundFX.playChime();
    }
  };

  // Helper to resize/compress image for batch local file uploads
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height && width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.82));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // Batch Multi-Photo Upload handler
  const handleBatchUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      const albumKeys = ['adventures', 'dates', 'celebrations', 'candids'];
      const targetAlbum = selectedAlbum !== 'all' ? selectedAlbum : null;

      const newItems = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const base64 = await compressImage(file);
        newItems.push({
          id: Date.now() + i,
          image: base64,
          album: targetAlbum || albumKeys[(memories.length + i) % albumKeys.length],
          title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || `Memory ${memories.length + i + 1}`,
          date: 'Special Moment',
          note: 'A timeless memory captured in our journey together. Forever treasured in my heart.',
          likes: Math.floor(Math.random() * 25) + 15,
        });
      }

      const updated = [...newItems, ...memories];
      saveMemories(updated);
      soundFX.playChime();
      alert(`Successfully added ${files.length} photos to your gallery! 🎉`);
    } catch (err) {
      console.error(err);
      alert('Error uploading photos. Please try with fewer images.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  // Change Album tag for a photo
  const handleChangePhotoAlbum = (photoId, newAlbumId) => {
    const updated = memories.map(m => m.id === photoId ? { ...m, album: newAlbumId } : m);
    saveMemories(updated);
    soundFX.playPop();
  };

  // Mobile Touch handlers for Lightbox
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setSelectedPhotoIndex(prev => (prev + 1) % filteredMemories.length);
      } else {
        setSelectedPhotoIndex(prev => (prev - 1 + filteredMemories.length) % filteredMemories.length);
      }
    }
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_CODE);
    setCopiedCode(true);
    soundFX.playPop();
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <section id="memory-album" style={{
      maxWidth: '1200px',
      margin: '50px auto',
      padding: '0 16px',
      position: 'relative',
      zIndex: 2,
    }}>
      {/* Gallery Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '20px',
      }}>
        <div>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#00f5d4',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            marginBottom: '6px',
          }}>
            <Sparkles size={16} color="#ffd166" /> Curated Photo Albums 🪶
          </span>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            color: '#ffffff',
            lineHeight: 1.2,
          }}>
            Our Memory Collections 📸
          </h3>
          <p style={{ color: '#c8f4f9', fontSize: '0.95rem', marginTop: '4px' }}>
            Browse through categorized albums or sync all photos from your Google Drive.
          </p>
        </div>

        {/* Action Toolbar (Mobile Optimized) */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '10px',
        }}>
          {/* Google Drive Connect / Sync */}
          <button
            onClick={() => setShowDriveModal(true)}
            className="btn-romantic"
            style={{
              padding: '10px 18px',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Link2 size={16} /> Sync Google Drive 📁
          </button>

          {/* Batch Upload from Device */}
          <label className="btn-outline-romantic" style={{
            padding: '10px 18px',
            fontSize: '0.9rem',
            cursor: isUploading ? 'wait' : 'pointer',
            margin: 0,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <Upload size={16} />
            {isUploading ? 'Uploading...' : '+ Add Photos'}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleBatchUpload}
              disabled={isUploading}
              style={{ display: 'none' }}
            />
          </label>

          {/* Slideshow Trigger */}
          <button
            onClick={() => {
              if (filteredMemories.length === 0) return;
              setSelectedPhotoIndex(0);
              setIsAutoPlaying(true);
              soundFX.playChime();
            }}
            className="btn-outline-romantic"
            style={{
              padding: '10px 16px',
              fontSize: '0.9rem',
            }}
          >
            <Play size={16} fill="#00f5d4" color="#00f5d4" /> Slideshow
          </button>

          {/* Reset Defaults */}
          <button
            onClick={handleResetDefaults}
            className="btn-outline-romantic"
            style={{
              padding: '10px',
              color: '#7ec2cb',
            }}
            title="Reset to default photos"
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </div>

      {/* Themed Album Filter Tabs Bar (Horizontal Touch-Scrollable for Mobile) */}
      <div className="album-tabs-container" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        overflowX: 'auto',
        padding: '6px 2px 18px',
        marginBottom: '16px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}>
        {ALBUMS.map((album) => {
          const Icon = album.icon;
          const isActive = selectedAlbum === album.id;
          const count = album.id === 'all' 
            ? memories.length 
            : memories.filter(m => m.album === album.id).length;

          return (
            <button
              key={album.id}
              onClick={() => {
                setSelectedAlbum(album.id);
                soundFX.playPop();
              }}
              style={{
                background: isActive 
                  ? 'linear-gradient(135deg, rgba(0, 180, 216, 0.35), rgba(6, 214, 160, 0.45))' 
                  : 'rgba(2, 22, 34, 0.65)',
                border: isActive 
                  ? '1.5px solid #00f5d4' 
                  : '1px solid rgba(0, 245, 212, 0.2)',
                borderRadius: '9999px',
                padding: '8px 16px',
                color: isActive ? '#ffffff' : '#a8dadc',
                fontSize: '0.88rem',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 0 16px rgba(0, 245, 212, 0.35)' : 'none',
                transition: 'all 0.25s ease',
                flexShrink: 0,
              }}
            >
              <Icon size={15} color={isActive ? '#00f5d4' : album.color} />
              <span>{album.name}</span>
              <span style={{
                background: isActive ? '#00f5d4' : 'rgba(255,255,255,0.1)',
                color: isActive ? '#011627' : '#c8f4f9',
                padding: '2px 8px',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                fontFamily: 'monospace',
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Modern 3x3 Card Grid (Replicating Reference Screenshot) */}
      {filteredMemories.length === 0 ? (
        <div className="glass-card" style={{
          padding: '40px 20px',
          textAlign: 'center',
          color: '#c8f4f9',
        }}>
          <ImageIcon size={40} color="#00f5d4" style={{ margin: '0 auto 12px' }} />
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>
            No photos in this album yet!
          </h4>
          <p style={{ fontSize: '0.9rem', color: '#7ec2cb', marginBottom: '18px' }}>
            Sync from Google Drive or click "+ Add Photos" to add moments to this collection.
          </p>
          <button onClick={() => setSelectedAlbum('all')} className="btn-romantic">
            View All Photos
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(150px, 30vw, 360px), 1fr))',
          gap: 'clamp(12px, 2.5vw, 24px)',
        }}>
          {filteredMemories.map((item, index) => {
            const indexNum = String(index + 1).padStart(2, '0');
            const isLiked = likedCards[item.id];
            const albumObj = ALBUMS.find(a => a.id === item.album);

            return (
              <div
                key={item.id}
                onClick={(e) => handleOpenLightbox(index, e)}
                className="memory-card-item"
                style={{
                  position: 'relative',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  background: '#041c2c',
                  border: '1.5px solid rgba(0, 245, 212, 0.25)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.55)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Image with smooth hover scale */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                />

                {/* Gradient overlay for text/icon readability */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(1, 14, 23, 0.8) 0%, rgba(1, 14, 23, 0.1) 40%, transparent 70%)',
                  pointerEvents: 'none',
                }} />

                {/* Top Left Album Tag Badge */}
                {albumObj && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    background: 'rgba(2, 22, 34, 0.8)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(0, 245, 212, 0.3)',
                    color: '#c8f4f9',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    zIndex: 3,
                  }}>
                    {albumObj.name.split(' ')[0]}
                  </div>
                )}

                {/* Bottom Left Expand Icon Badge (Exactly like reference) */}
                <button
                  onClick={(e) => handleOpenLightbox(index, e)}
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: 'rgba(2, 22, 34, 0.75)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(0, 245, 212, 0.4)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 3,
                    transition: 'all 0.2s ease',
                    padding: 0,
                  }}
                  title="Expand Full Photo"
                >
                  <Maximize2 size={16} />
                </button>

                {/* Bottom Right Index Badge (e.g. #01, #02 like reference) */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(2, 22, 34, 0.75)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(0, 245, 212, 0.35)',
                  color: '#00f5d4',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  zIndex: 3,
                }}>
                  #{indexNum}
                </div>

                {/* Top Right Quick Love button */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  zIndex: 3,
                }}>
                  <button
                    onClick={(e) => handleLike(item.id, e)}
                    style={{
                      background: isLiked ? 'rgba(0, 245, 212, 0.9)' : 'rgba(2, 22, 34, 0.65)',
                      backdropFilter: 'blur(6px)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: isLiked ? '#011627' : '#ffffff',
                      transition: 'all 0.2s ease',
                    }}
                    title="Love this photo"
                  >
                    <Heart size={14} fill={isLiked ? '#011627' : 'transparent'} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Google Drive Apps Script Connect Modal */}
      {showDriveModal && (
        <div
          onClick={() => setShowDriveModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(1, 14, 23, 0.92)',
            backdropFilter: 'blur(16px)',
            zIndex: 2200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-card"
            style={{
              maxWidth: '580px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: 'clamp(24px, 4vw, 32px)',
              background: 'linear-gradient(145deg, #03263b, #011420)',
              border: '1.5px solid rgba(0, 245, 212, 0.45)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(0, 245, 212, 0.3)',
              borderRadius: '20px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link2 size={22} color="#00f5d4" />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#fff', margin: 0 }}>
                  Sync Google Drive Photos
                </h4>
              </div>
              <button
                onClick={() => setShowDriveModal(false)}
                style={{ background: 'none', border: 'none', color: '#c8f4f9', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ color: '#c8f4f9', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '20px' }}>
              Connect your Google Drive folder (<strong>157fqgUn1Hdf-t6pL4JHr6dTqtlKnGn4c</strong>) to pull all photos dynamically into categorized albums!
            </p>

            {/* URL Input Form */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', color: '#00f5d4', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Google Apps Script Web App URL:
              </label>
              <input
                type="url"
                value={driveScriptUrl}
                onChange={(e) => setDriveScriptUrl(e.target.value)}
                placeholder="https://script.google.com/macros/s/.../exec"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(0, 245, 212, 0.35)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  marginBottom: '10px',
                }}
              />
              <button
                onClick={() => fetchFromDriveScript()}
                disabled={isFetchingDrive}
                className="btn-romantic"
                style={{ width: '100%', padding: '12px' }}
              >
                {isFetchingDrive ? (
                  <>
                    <Loader2 size={16} className="spin" /> Syncing Photos From Drive...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> Fetch & Sync Drive Photos
                  </>
                )}
              </button>
            </div>

            {/* Quick 1-Minute Setup Guide */}
            <div style={{
              background: 'rgba(0, 245, 212, 0.06)',
              border: '1px dashed rgba(0, 245, 212, 0.3)',
              borderRadius: '12px',
              padding: '16px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ color: '#ffd166', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  📜 Google Apps Script Code (1-Click Deploy)
                </span>
                <button
                  onClick={handleCopyScript}
                  style={{
                    background: 'rgba(0, 245, 212, 0.15)',
                    border: '1px solid rgba(0, 245, 212, 0.4)',
                    color: '#00f5d4',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {copiedCode ? <Check size={12} color="#06d6a0" /> : <Copy size={12} />}
                  {copiedCode ? 'Copied!' : 'Copy Script'}
                </button>
              </div>

              <ol style={{ color: '#a8dadc', fontSize: '0.82rem', paddingLeft: '18px', margin: '0 0 10px 0', lineHeight: 1.6 }}>
                <li>Open <a href="https://script.google.com" target="_blank" rel="noreferrer" style={{ color: '#00f5d4' }}>script.google.com</a> and click <strong>New Project</strong>.</li>
                <li>Paste the script code and click <strong>Deploy</strong> &rarr; <strong>New Deployment</strong>.</li>
                <li>Select type: <strong>Web App</strong>, set "Who has access" to <strong>Anyone</strong>.</li>
                <li>Copy the generated Web App URL and paste it above!</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Mobile-Friendly Fullscreen Lightbox & Slideshow Modal */}
      {selectedPhotoIndex !== null && filteredMemories[selectedPhotoIndex] && (
        <div
          onClick={handleCloseLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(1, 14, 23, 0.94)',
            backdropFilter: 'blur(16px)',
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'clamp(12px, 3vw, 24px)',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          {/* Top Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '1100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 0',
              zIndex: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                background: 'rgba(0, 245, 212, 0.15)',
                border: '1px solid rgba(0, 245, 212, 0.35)',
                color: '#00f5d4',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontFamily: 'monospace',
                fontWeight: 700,
              }}>
                Photo {selectedPhotoIndex + 1} of {filteredMemories.length}
              </span>
              {isAutoPlaying && (
                <span style={{
                  color: '#ffd166',
                  fontSize: '0.78rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  <Sparkles size={12} /> Auto-playing
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Slideshow play/pause */}
              <button
                onClick={() => setIsAutoPlaying(prev => !prev)}
                style={{
                  background: isAutoPlaying ? 'linear-gradient(135deg, #00b4d8, #06d6a0)' : 'rgba(255,255,255,0.1)',
                  color: isAutoPlaying ? '#011627' : '#fff',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '6px 14px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 600,
                }}
              >
                {isAutoPlaying ? <Pause size={14} /> : <Play size={14} />}
                {isAutoPlaying ? 'Pause' : 'Play'}
              </button>

              {/* Close button */}
              <button
                onClick={handleCloseLightbox}
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                title="Close (Esc)"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Center Image Container with Navigation Arrows */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1000px',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '10px 0',
              overflow: 'hidden',
            }}
          >
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              style={{
                position: 'absolute',
                left: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(2, 22, 34, 0.75)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(0, 245, 212, 0.4)',
                color: '#ffffff',
                width: 'clamp(40px, 6vw, 50px)',
                height: 'clamp(40px, 6vw, 50px)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
              }}
              title="Previous Photo (Left Arrow / Swipe Right)"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Current Image */}
            <img
              src={filteredMemories[selectedPhotoIndex].image}
              alt={filteredMemories[selectedPhotoIndex].title}
              style={{
                maxHeight: 'min(70vh, 650px)',
                maxWidth: '96%',
                objectFit: 'contain',
                borderRadius: '16px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 35px rgba(0, 245, 212, 0.25)',
                border: '1.5px solid rgba(0, 245, 212, 0.3)',
                animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />

            {/* Next Button */}
            <button
              onClick={handleNext}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(2, 22, 34, 0.75)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(0, 245, 212, 0.4)',
                color: '#ffffff',
                width: 'clamp(40px, 6vw, 50px)',
                height: 'clamp(40px, 6vw, 50px)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
              }}
              title="Next Photo (Right Arrow / Swipe Left)"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bottom Caption & Memory Info */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '800px',
              textAlign: 'center',
              padding: '12px 18px',
              background: 'rgba(3, 26, 42, 0.85)',
              backdropFilter: 'blur(12px)',
              borderRadius: '16px',
              border: '1px solid rgba(0, 245, 212, 0.25)',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '4px',
              flexWrap: 'wrap',
            }}>
              <h4 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                color: '#ffffff',
              }}>
                {filteredMemories[selectedPhotoIndex].title}
              </h4>
              <button
                onClick={(e) => handleLike(filteredMemories[selectedPhotoIndex].id, e)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: likedCards[filteredMemories[selectedPhotoIndex].id] ? '#00f5d4' : '#7ec2cb',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.85rem',
                }}
              >
                <Heart size={16} fill={likedCards[filteredMemories[selectedPhotoIndex].id] ? '#00f5d4' : 'transparent'} />
                {filteredMemories[selectedPhotoIndex].likes || 0}
              </button>

              {/* Album selector dropdown */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginLeft: '6px' }}>
                <Tag size={13} color="#00f5d4" />
                <select
                  value={filteredMemories[selectedPhotoIndex].album || 'adventures'}
                  onChange={(e) => handleChangePhotoAlbum(filteredMemories[selectedPhotoIndex].id, e.target.value)}
                  style={{
                    background: 'rgba(0, 245, 212, 0.12)',
                    border: '1px solid rgba(0, 245, 212, 0.35)',
                    color: '#c8f4f9',
                    borderRadius: '6px',
                    padding: '2px 8px',
                    fontSize: '0.78rem',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="adventures" style={{ background: '#021e2f', color: '#fff' }}>Adventures & Trips</option>
                  <option value="dates" style={{ background: '#021e2f', color: '#fff' }}>Cozy Dates & Cafes</option>
                  <option value="celebrations" style={{ background: '#021e2f', color: '#fff' }}>Celebrations & Milestones</option>
                  <option value="candids" style={{ background: '#021e2f', color: '#fff' }}>Sweet Candid Clicks</option>
                </select>
              </div>
            </div>

            <p style={{
              fontFamily: 'var(--font-hand)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
              color: '#d0f4de',
              margin: 0,
              lineHeight: 1.4,
            }}>
              "{filteredMemories[selectedPhotoIndex].note}"
            </p>
          </div>
        </div>
      )}

      {/* Custom Styles & Mobile Hover Transitions */}
      <style>{`
        .album-tabs-container::-webkit-scrollbar {
          display: none;
        }
        .memory-card-item:hover {
          transform: translateY(-6px);
          border-color: rgba(0, 245, 212, 0.65) !important;
          box-shadow: 0 16px 36px rgba(0, 245, 212, 0.25), 0 8px 16px rgba(0,0,0,0.6) !important;
        }
        .memory-card-item:hover img {
          transform: scale(1.06);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default MemoryAlbum;
