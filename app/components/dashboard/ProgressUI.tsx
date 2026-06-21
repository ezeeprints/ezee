'use client';

import React from 'react';
import styles from '../../student/student.module.css';

interface ProgressUIProps {
  onClose: () => void;
}

export default function ProgressUI({ onClose }: ProgressUIProps) {
  return (
    <div className={styles.paperModal} style={{ width: '580px', maxWidth: '95vw', padding: '3.5rem 3rem' }}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close Progress Journal">×</button>
      
      {/* Decorative leaf sketch on top center of page */}
      <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(5deg)', width: '80px', height: '26px', background: 'rgba(169, 181, 157, 0.35)', border: '1px solid rgba(0,0,0,0.03)' }} />

      <h2 className={styles.modalHeader}>Plant Growth & Progress</h2>

      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {/* Left Side: Growth Visual (Potted Plant growing illustration) */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'rgba(169, 181, 157, 0.08)',
          border: '1.5px dashed #A9B59D',
          borderRadius: '8px',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          {/* Handdrawn Potted plant representation */}
          <svg width="100" height="150" viewBox="0 0 100 150" style={{ overflow: 'visible' }}>
            {/* The Pot */}
            <path d="M 30 130 L 70 130 L 75 90 L 25 90 Z" fill="#D48A70" stroke="#2A2928" strokeWidth="3" />
            
            {/* The Stem */}
            <path d="M 50 90 Q 45 40 50 15" fill="none" stroke="#2A2928" strokeWidth="4" />
            
            {/* Leaves growing */}
            <path d="M 50 70 Q 20 60 30 45 Q 45 55 50 70" fill="#A9B59D" stroke="#2A2928" strokeWidth="2" />
            <path d="M 50 50 Q 80 40 70 25 Q 55 35 50 50" fill="#A9B59D" stroke="#2A2928" strokeWidth="2" />
            <path d="M 50 25 Q 35 15 45 5 Q 55 10 50 25" fill="#A9B59D" stroke="#2A2928" strokeWidth="2" />
            
            {/* Sparkling growth stars */}
            <path d="M 20 30 L 22 35 L 27 35 L 23 38 L 25 43 L 20 40 L 15 43 L 17 38 L 13 35 L 18 35 Z" fill="#D48A70" opacity="0.8" />
            <circle cx="80" cy="20" r="3" fill="#A9B59D" />
          </svg>

          <span style={{ fontFamily: 'Space Grotesk', fontSize: '1rem', fontWeight: 'bold', color: '#2A2928', marginTop: '1rem', display: 'block' }}>
            Stage 3: Matcha Sprout
          </span>
          <span style={{ fontFamily: 'Instrument Sans', fontSize: '0.8rem', color: '#7A6D8C' }}>
            Next growth at 200 pages printed
          </span>
        </div>

        {/* Right Side: Progress statistics */}
        <div style={{ flex: 1.2, fontFamily: 'Instrument Sans' }}>
          <p style={{ fontFamily: 'Space Grotesk', fontSize: '0.85rem', color: '#7A6D8C', textTransform: 'uppercase', margin: '0 0 1rem 0' }}>
            Study Journal Stats
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted rgba(42,41,40,0.15)', paddingBottom: '0.5rem' }}>
              <span style={{ color: '#7A6D8C' }}>Total Pages Printed:</span>
              <span style={{ fontWeight: 'bold', fontFamily: 'Space Grotesk', color: '#2A2928' }}>167 pages</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted rgba(42,41,40,0.15)', paddingBottom: '0.5rem' }}>
              <span style={{ color: '#7A6D8C' }}>Study Sessions:</span>
              <span style={{ fontWeight: 'bold', fontFamily: 'Space Grotesk', color: '#2A2928' }}>24 sessions</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted rgba(42,41,40,0.15)', paddingBottom: '0.5rem' }}>
              <span style={{ color: '#7A6D8C' }}>Current Streak:</span>
              <span style={{ fontWeight: 'bold', fontFamily: 'Space Grotesk', color: '#D48A70' }}>5 Days 🔥</span>
            </div>
          </div>

          {/* Achievement Badge */}
          <div style={{
            background: '#FAF7F1',
            border: '1px solid rgba(42, 41, 40, 0.15)',
            borderRadius: '6px',
            padding: '0.8rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem'
          }}>
            <span style={{ fontSize: '1.8rem' }}>🎖️</span>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#2A2928' }}>"Lofi Scholar" Badge</div>
              <div style={{ fontSize: '0.75rem', color: '#7A6D8C' }}>Unlocked for studying past midnight</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
