'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { audio } from '../AudioEngine';

interface WeatherUIProps {
  onClose: () => void;
  isNight: boolean;
  setRoomWeather: (preset: 'sunny' | 'rainy' | 'sunset' | 'midnight') => void;
}

interface WeatherPreset {
  id: 'sunny' | 'rainy' | 'sunset' | 'midnight';
  label: string;
  timeLabel: string;
  description: string;
  scene: React.ReactNode;
  cardBg: string;
  selected?: boolean;
}

function SunnyScene() {
  return (
    <svg width="110" height="75" viewBox="0 0 110 75">
      {/* Sky */}
      <rect width="110" height="75" fill="#87CEEB" opacity="0.4" />
      {/* Sun */}
      <circle cx="85" cy="18" r="12" fill="#F4D03F" opacity="0.9" />
      {/* Sun rays */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <line key={i}
            x1={85 + Math.cos(angle) * 15} y1={18 + Math.sin(angle) * 15}
            x2={85 + Math.cos(angle) * 20} y2={18 + Math.sin(angle) * 20}
            stroke="#F4D03F" strokeWidth="2" opacity="0.6"
          />
        );
      })}
      {/* Clouds */}
      <ellipse cx="30" cy="22" rx="18" ry="9" fill="#fff" opacity="0.8" />
      <ellipse cx="42" cy="18" rx="13" ry="8" fill="#fff" opacity="0.8" />
      {/* Ground / sill */}
      <rect y="60" width="110" height="15" fill="#8B5A2B" />
      {/* Curtain sides */}
      <path d="M 0 0 C 10 15 5 40 8 75" fill="#D48A70" opacity="0.5" />
      <path d="M 110 0 C 100 15 105 40 102 75" fill="#D48A70" opacity="0.5" />
      {/* Bird */}
      <path d="M 55 35 Q 58 32 62 35 Q 58 38 55 35" fill="#2A2928" opacity="0.4" />
    </svg>
  );
}

function RainyScene() {
  return (
    <svg width="110" height="75" viewBox="0 0 110 75">
      {/* Sky – grey */}
      <rect width="110" height="75" fill="#4A5568" opacity="0.35" />
      {/* Heavy clouds */}
      <ellipse cx="30" cy="20" rx="25" ry="12" fill="#718096" opacity="0.7" />
      <ellipse cx="55" cy="15" rx="30" ry="14" fill="#4A5568" opacity="0.7" />
      <ellipse cx="82" cy="22" rx="22" ry="11" fill="#718096" opacity="0.65" />
      {/* Rain drops on glass */}
      {[15, 30, 45, 60, 75, 90].map((x, i) => (
        <g key={i} opacity="0.55">
          <line x1={x} y1={30 + (i % 3) * 5} x2={x - 2} y2={42 + (i % 3) * 5} stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
          <line x1={x + 10} y1={38 + (i % 2) * 6} x2={x + 8} y2={50 + (i % 2) * 6} stroke="#93C5FD" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      ))}
      {/* Sill */}
      <rect y="60" width="110" height="15" fill="#8B5A2B" />
      {/* Curtains */}
      <path d="M 0 0 C 12 20 6 45 10 75" fill="#EAE4DD" opacity="0.45" />
      <path d="M 110 0 C 98 20 104 45 100 75" fill="#EAE4DD" opacity="0.45" />
    </svg>
  );
}

function SunsetScene() {
  return (
    <svg width="110" height="75" viewBox="0 0 110 75">
      {/* Gradient sky */}
      <defs>
        <linearGradient id="sunsetGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F97316" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#FB923C" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <rect width="110" height="75" fill="url(#sunsetGrad)" />
      {/* Setting sun on horizon */}
      <ellipse cx="55" cy="62" rx="20" ry="10" fill="#F4D03F" opacity="0.55" />
      {/* Horizon glow */}
      <ellipse cx="55" cy="62" rx="40" ry="12" fill="#F97316" opacity="0.2" />
      {/* Silhouette clouds */}
      <ellipse cx="25" cy="35" rx="20" ry="8" fill="#7C3AED" opacity="0.2" />
      <ellipse cx="82" cy="30" rx="18" ry="7" fill="#7C3AED" opacity="0.2" />
      {/* Sill */}
      <rect y="68" width="110" height="7" fill="#5C3D1D" />
      {/* Curtains – darker, drawn */}
      <path d="M 0 0 C 15 25 8 50 12 75" fill="#C4956A" opacity="0.4" />
      <path d="M 110 0 C 95 25 102 50 98 75" fill="#C4956A" opacity="0.4" />
    </svg>
  );
}

function MidnightScene() {
  return (
    <svg width="110" height="75" viewBox="0 0 110 75">
      {/* Deep night sky */}
      <rect width="110" height="75" fill="#0F172A" opacity="0.85" />
      {/* Moon */}
      <circle cx="78" cy="20" r="12" fill="#F1F5F9" opacity="0.9" />
      <circle cx="84" cy="18" r="10" fill="#0F172A" opacity="0.9" />
      {/* Stars */}
      {[{x:15,y:12},{x:35,y:8},{x:50,y:18},{x:28,y:28},{x:60,y:10},{x:20,y:40}].map((s,i) => (
        <circle key={i} cx={s.x} cy={s.y} r="1.2" fill="#E2E8F0" opacity={0.5 + i * 0.08} />
      ))}
      {/* Lamp glow from outside */}
      <radialGradient id="lampExt" cx="50%" cy="90%" r="60%">
        <stop offset="0%" stopColor="#F4D03F" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#F4D03F" stopOpacity="0" />
      </radialGradient>
      <rect width="110" height="75" fill="url(#lampExt)" />
      {/* Sill */}
      <rect y="62" width="110" height="13" fill="#1E293B" />
      {/* Curtains – dark */}
      <path d="M 0 0 C 12 20 6 45 8 75" fill="#1E293B" opacity="0.75" />
      <path d="M 110 0 C 98 20 104 45 102 75" fill="#1E293B" opacity="0.75" />
    </svg>
  );
}

const presets: WeatherPreset[] = [
  { id: 'sunny', label: 'Sunny Morning', timeLabel: 'Dawn', description: 'Warm light, quiet breeze. The birds are outside.', scene: <SunnyScene />, cardBg: '#FFFBF0' },
  { id: 'rainy', label: 'Cozy Rain', timeLabel: 'Evening', description: 'Rain on the glass. Everything slower.', scene: <RainyScene />, cardBg: '#EFF6FF' },
  { id: 'sunset', label: 'Golden Hour', timeLabel: 'Dusk', description: 'Long shadows. The lamp looks warmer at sunset.', scene: <SunsetScene />, cardBg: '#FFF7ED' },
  { id: 'midnight', label: 'Night', timeLabel: '1:30 AM', description: 'Moon. Stars. The kind of quiet that suits studying.', scene: <MidnightScene />, cardBg: '#0F172A' },
];

export default function WeatherUI({ onClose, isNight, setRoomWeather }: WeatherUIProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const handleSelectPreset = (preset: 'sunny' | 'rainy' | 'sunset' | 'midnight') => {
    audio.playWeatherCycleSound();
    setRoomWeather(preset);
    setTimeout(onClose, 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 20 }}
      transition={{ type: 'spring', damping: 28, stiffness: 100 }}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        background: 'rgba(42, 41, 40, 0.25)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        style={{
          background: '#FAF7F1',
          borderRadius: '8px',
          padding: '3rem 2.5rem',
          width: '600px',
          maxWidth: '95vw',
          maxHeight: '85vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 30px 60px rgba(42,41,40,0.18)',
        }}
      >
        {/* Washi tape */}
        <div style={{ position: 'absolute', top: '-10px', left: '22%', transform: 'rotate(-2deg)', width: '75px', height: '22px', background: 'rgba(122,109,140,0.3)', borderRadius: '2px' }} />

        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', fontSize: '1.5rem', color: 'rgba(42,41,40,0.3)', cursor: 'pointer', lineHeight: 1 }}
          aria-label="Close window"
        >×</button>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.72rem', color: 'rgba(42,41,40,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
            The window
          </div>
          <h2 style={{ fontFamily: 'Instrument Sans', fontSize: '2rem', color: '#2A2928', margin: '0 0 0.3rem 0', fontWeight: 400 }}>
            Outside
          </h2>
          <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.9rem', color: 'rgba(42,41,40,0.45)', margin: 0, fontStyle: 'italic' }}>
            What does it look like out there tonight?
          </p>
        </div>

        {/* Window preset cards */}
        <div className="mobile-col-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {presets.map(preset => {
            const isNightCard = preset.id === 'midnight';
            return (
              <motion.div
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                onHoverStart={() => setHovered(preset.id)}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', damping: 20 }}
                style={{
                  background: preset.cardBg,
                  border: `1.5px solid ${hovered === preset.id ? 'rgba(42,41,40,0.4)' : 'rgba(42,41,40,0.1)'}`,
                  borderRadius: '6px',
                  padding: '0',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  boxShadow: hovered === preset.id ? '3px 6px 20px rgba(42,41,40,0.12)' : '1px 3px 8px rgba(42,41,40,0.06)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
              >
                {/* Window scene illustration */}
                <div style={{
                  background: isNightCard ? '#0F172A' : 'rgba(42,41,40,0.04)',
                  padding: '1rem',
                  display: 'flex', justifyContent: 'center',
                  borderBottom: '1px solid rgba(42,41,40,0.06)',
                }}>
                  {preset.scene}
                </div>
                {/* Label */}
                <div style={{ padding: '1rem', background: isNightCard ? '#1E293B' : undefined }}>
                  <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.7rem', color: isNightCard ? 'rgba(226,232,240,0.5)' : 'rgba(42,41,40,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                    {preset.timeLabel}
                  </div>
                  <div style={{ fontFamily: 'Instrument Sans', fontSize: '1rem', fontWeight: 'bold', color: isNightCard ? '#E2E8F0' : '#2A2928', marginBottom: '0.25rem' }}>
                    {preset.label}
                  </div>
                  <div style={{ fontFamily: 'Instrument Sans', fontSize: '0.82rem', color: isNightCard ? 'rgba(226,232,240,0.5)' : 'rgba(42,41,40,0.45)', fontStyle: 'italic' }}>
                    {preset.description}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div style={{
          textAlign: 'center',
          fontFamily: 'Space Grotesk', fontSize: '0.75rem',
          color: 'rgba(42,41,40,0.3)', fontStyle: 'italic',
        }}>
          Currently {isNight ? 'Night is on' : 'Daytime is on'}
        </div>
      </motion.div>
    </motion.div>
  );
}
