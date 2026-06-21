'use client';

import React, { useState } from 'react';
import styles from '../../student/student.module.css';
import { audio } from '../AudioEngine';

interface EasterEggUIProps {
  onClose: () => void;
}

export default function EasterEggUI({ onClose }: EasterEggUIProps) {
  const [purrActive, setPurrActive] = useState(false);

  const handleMeow = () => {
    audio.playWeatherCycleSound(); // Play a nice warm chime
    setPurrActive(true);
    setTimeout(() => {
      setPurrActive(false);
    }, 2000);
  };

  return (
    <div className={styles.paperModal} style={{ width: '450px', maxWidth: '95vw', padding: '3rem 2.5rem', textAlign: 'center' }}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close Easter Egg">×</button>
      
      {/* Decorative Washi Tape */}
      <div style={{ position: 'absolute', top: '-15px', left: '35%', transform: 'rotate(-6deg)', width: '85px', height: '28px', background: 'rgba(212, 138, 112, 0.45)', border: '1px solid rgba(0,0,0,0.03)' }} />

      <h2 style={{ fontFamily: 'Instrument Sans', fontSize: '1.8rem', color: '#2A2928', margin: '0 0 1.5rem 0', fontWeight: 'bold' }}>
        Secret Photo Found!
      </h2>

      {/* Polaroid photo representation */}
      <div style={{
        background: '#fff',
        padding: '1rem 1rem 3rem 1rem',
        boxShadow: '0 10px 25px rgba(42, 41, 40, 0.1)',
        border: '1px solid rgba(42, 41, 40, 0.08)',
        borderRadius: '2px',
        display: 'inline-block',
        transform: 'rotate(2deg)',
        marginBottom: '2rem',
        transition: 'transform 0.3s ease'
      }} className={styles.wiggle}>
        
        {/* The Picture Inside */}
        <div style={{
          width: '260px',
          height: '240px',
          background: '#7A6D8C',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)'
        }}>
          {/* Night Sky backdrop in picture */}
          <div style={{ position: 'absolute', inset: 0, background: '#1A1918' }} />

          {/* Star stickers */}
          <div style={{ position: 'absolute', top: '20px', left: '40px', color: '#FAF7F1', fontSize: '0.8rem', opacity: 0.5 }}>⭐</div>
          <div style={{ position: 'absolute', top: '50px', right: '40px', color: '#FAF7F1', fontSize: '0.6rem', opacity: 0.4 }}>⭐</div>

          {/* Draw Cozy Lamp glow inside photo */}
          <circle cx="210" cy="90" r="40" fill="#F4D03F" opacity="0.25" />
          
          {/* Ezi and Cat silhouettes or drawings sleeping side by side */}
          <svg width="180" height="150" viewBox="0 0 100 100" style={{ position: 'relative', zIndex: 10, marginTop: '20px' }}>
            {/* Tiny Cat curled up */}
            <ellipse cx="65" cy="75" rx="18" ry="12" fill="#2A2928" />
            <circle cx="50" cy="75" r="9" fill="#2A2928" />
            <polygon points="43,68 49,68 45,58" fill="#2A2928" />
            <polygon points="49,68 55,68 52,58" fill="#2A2928" />
            
            {/* Ezi sleeping next to cat */}
            <ellipse cx="30" cy="70" rx="14" ry="12" fill="#2A2928" />
            <circle cx="30" cy="70" r="10" fill="#FAF7F1" />
            <path d="M 23 70 Q 25 68 27 70" stroke="#2A2928" strokeWidth="1.5" fill="none" />
            <path d="M 33 70 Q 35 68 37 70" stroke="#2A2928" strokeWidth="1.5" fill="none" />
            <ellipse cx="25" cy="73" rx="3" ry="2" fill="#D48A70" opacity="0.6" />
            <ellipse cx="35" cy="73" rx="3" ry="2" fill="#D48A70" opacity="0.6" />
            <path d="M 29 74 Q 30 75 31 74" stroke="#2A2928" strokeWidth="1" fill="none" />
            {/* Tiny sleeping cap */}
            <path d="M 20 62 Q 30 50 35 60" fill="#7A6D8C" />
          </svg>
        </div>

        {/* Polaroid handwritten title */}
        <div style={{
          fontFamily: 'Space Grotesk',
          fontSize: '1.1rem',
          color: '#7A6D8C',
          marginTop: '1.2rem',
          fontWeight: 'normal',
          letterSpacing: '0.05em'
        }}>
          "Midnight Co-workers" • 2026
        </div>
      </div>

      <div>
        <button 
          onClick={handleMeow} 
          className={styles.tactileBtn}
          style={{ width: '80%', justifyContent: 'center' }}
        >
          {purrActive ? '🐱 Purrrrrr...' : '🐾 Pet Study Cat'}
        </button>
      </div>

    </div>
  );
}
