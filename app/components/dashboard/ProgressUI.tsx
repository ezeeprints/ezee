'use client';

import React from 'react';
import styles from '../../student/student.module.css';

interface ProgressUIProps {
  onClose: () => void;
}

export default function ProgressUI({ onClose }: ProgressUIProps) {
  const journalEntries = [
    { date: 'Monsoon Evening', text: 'Placed the pot near the desk. It likes the sound of the rain.' },
    { date: 'Midnight Study', text: 'A small sprout turned towards the lamp while you were reading.' },
    { date: 'Golden Hour', text: 'Ezi watered the soil. Two tiny new leaves have unfurled.' },
    { date: 'Quiet Afternoon', text: 'It stands quietly, breathing in the warmth of the sun.' }
  ];

  return (
    <div className={styles.paperModal} style={{ width: '580px', maxWidth: '95vw', padding: '3.5rem 3rem' }}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close Plant Journal">×</button>
      
      {/* Decorative leaf sketch on top center of page */}
      <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(5deg)', width: '80px', height: '26px', background: 'rgba(169, 181, 157, 0.35)', border: '1px solid rgba(0,0,0,0.03)' }} />

      <h2 className={styles.modalHeader}>A Quiet Journal</h2>

      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {/* Left Side: Growth Visual (Potted Plant growing illustration) */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
            
            {/* Ambient dust */}
            <circle cx="80" cy="20" r="3" fill="#A9B59D" opacity="0.6" />
            <circle cx="20" cy="40" r="2" fill="#D48A70" opacity="0.4" />
            <circle cx="70" cy="80" r="1.5" fill="#A9B59D" opacity="0.5" />
          </svg>
        </div>

        {/* Right Side: Diary Entries */}
        <div style={{ flex: 1.2, fontFamily: 'Instrument Sans' }}>
          <p style={{ fontFamily: 'Space Grotesk', fontSize: '0.85rem', color: '#7A6D8C', textTransform: 'uppercase', margin: '0 0 1.5rem 0', letterSpacing: '0.05em' }}>
            Ezi&apos;s Observations
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '1.5rem' }}>
            {journalEntries.map((entry, idx) => (
              <div key={idx} style={{ borderBottom: '1px dotted rgba(42,41,40,0.15)', paddingBottom: '0.8rem' }}>
                <div style={{ color: '#7A6D8C', fontSize: '0.75rem', fontFamily: 'Space Grotesk', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  {entry.date}
                </div>
                <div style={{ fontFamily: 'Instrument Sans', fontSize: '0.95rem', color: '#2A2928', lineHeight: '1.4' }}>
                  {entry.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '1rem',
            fontFamily: 'Instrument Sans',
            fontSize: '0.85rem',
            color: '#7A6D8C',
            fontStyle: 'italic'
          }}>
            &quot;It breathes softly alongside your books.&quot;
          </div>
        </div>
      </div>
    </div>
  );
}

