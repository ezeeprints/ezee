'use client';

import React, { useState } from 'react';
import styles from '../../student/student.module.css';

interface DeskUIProps {
  onClose: () => void;
}

interface Decoration {
  id: string;
  name: string;
  emoji: string;
  unlocked: boolean;
  requirement: string;
}

export default function DeskUI({ onClose }: DeskUIProps) {
  const [decorations, setDecorations] = useState<Decoration[]>([
    { id: 'dec-1', name: 'Mini Cactus Plant', emoji: '🌵', unlocked: true, requirement: '1 Completed Order' },
    { id: 'dec-2', name: 'Cozy Pajamas for Ezi', emoji: '🛌', unlocked: true, requirement: 'Night Study Session' },
    { id: 'dec-3', name: 'Vintage Brass Lamp', emoji: '💡', unlocked: false, requirement: '5 Completed Orders' },
    { id: 'dec-4', name: 'Study Buddy Cat', emoji: '🐱', unlocked: true, requirement: 'Loyal User Badge' },
    { id: 'dec-5', name: 'Thermal Coffee Mug', emoji: '☕', unlocked: false, requirement: 'Weekend Print Order' }
  ]);

  const [quote, setQuote] = useState({
    text: 'Take a deep breath. You are doing great. One page at a time.',
    author: 'Ezi'
  });

  const unlockedCount = decorations.filter(d => d.unlocked).length;

  return (
    <div className={styles.paperModal} style={{ width: '700px', maxWidth: '95vw', padding: '3.5rem 3rem' }}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close Desk Companion">×</button>
      
      {/* Decorative Washi Tape on top left and top right */}
      <div style={{ position: 'absolute', top: '-12px', left: '10%', transform: 'rotate(-4deg)', width: '70px', height: '24px', background: 'rgba(212, 138, 112, 0.3)', border: '1px solid rgba(0,0,0,0.03)' }} />
      <div style={{ position: 'absolute', top: '-12px', right: '10%', transform: 'rotate(3deg)', width: '70px', height: '24px', background: 'rgba(169, 181, 157, 0.3)', border: '1px solid rgba(0,0,0,0.03)' }} />

      <div style={{ display: 'flex', gap: '3rem' }}>
        
        {/* Left column: Ezi's Journal / Status */}
        <div style={{ flex: 1.2 }}>
          <h2 style={{ fontFamily: 'Instrument Sans', fontSize: '2.2rem', color: '#2A2928', margin: '0 0 1rem 0', borderBottom: '2px dashed rgba(42, 41, 40, 0.2)', paddingBottom: '0.5rem' }}>
            Ezi's Study Log
          </h2>

          {/* Character Mood Status */}
          <div style={{ background: '#EAE4DD', borderRadius: '8px', padding: '1.2rem', marginBottom: '1.5rem', border: '1px solid rgba(42,41,40,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2.5rem', animation: 'float 4s ease-in-out infinite' }}>☕</span>
              <div>
                <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.8rem', color: '#7A6D8C', textTransform: 'uppercase' }}>Current Mood</div>
                <div style={{ fontFamily: 'Instrument Sans', fontSize: '1.2rem', fontWeight: 'bold', color: '#2A2928' }}>Sorting books & Sketching</div>
              </div>
            </div>
          </div>

          {/* Motivation Quote Card */}
          <div style={{ 
            background: '#fff', 
            borderLeft: '4px solid #D48A70', 
            padding: '1rem 1.2rem', 
            boxShadow: '1px 3px 8px rgba(0,0,0,0.03)',
            marginBottom: '1.5rem'
          }}>
            <p style={{ fontFamily: 'Instrument Sans', fontSize: '1.1rem', fontStyle: 'italic', margin: '0 0 0.5rem 0', color: '#2A2928', lineHeight: '1.5' }}>
              "{quote.text}"
            </p>
            <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.85rem', color: '#7A6D8C', fontWeight: 'bold' }}>
              — {quote.author} the Study Companion
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontFamily: 'Space Grotesk', fontSize: '0.85rem', color: '#7A6D8C' }}>
            <div style={{ background: 'rgba(169, 181, 157, 0.1)', padding: '0.6rem', borderRadius: '4px', textAlign: 'center' }}>
              🍀 Season: <span style={{ color: '#2A2928', fontWeight: 'bold' }}>Exam Season</span>
            </div>
            <div style={{ background: 'rgba(212, 138, 112, 0.1)', padding: '0.6rem', borderRadius: '4px', textAlign: 'center' }}>
              🌈 Weather: <span style={{ color: '#2A2928', fontWeight: 'bold' }}>Cozy Rain</span>
            </div>
          </div>
        </div>

        {/* Right column: Rewards / Decorations */}
        <div style={{ flex: 1, borderLeft: '1px solid rgba(42, 41, 40, 0.1)', paddingLeft: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.2rem' }}>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.1rem', margin: 0, textTransform: 'uppercase', color: '#7A6D8C' }}>
              Room Treasures
            </h3>
            <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.85rem', color: '#A9B59D', fontWeight: 'bold' }}>
              {unlockedCount}/{decorations.length} Unlocked
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {decorations.map((dec) => (
              <div 
                key={dec.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.8rem',
                  borderRadius: '6px',
                  backgroundColor: dec.unlocked ? '#FAF7F1' : 'rgba(42, 41, 40, 0.03)',
                  border: dec.unlocked ? '1px solid rgba(42, 41, 40, 0.15)' : '1px dashed rgba(42, 41, 40, 0.1)',
                  opacity: dec.unlocked ? 1 : 0.65,
                  transition: 'all 0.2s ease'
                }}
                className={dec.unlocked ? styles.wiggle : ''}
              >
                <span style={{ fontSize: '1.8rem' }}>{dec.emoji}</span>
                <div style={{ fontFamily: 'Instrument Sans' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#2A2928' }}>{dec.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#7A6D8C', fontFamily: 'Space Grotesk' }}>
                    {dec.unlocked ? 'Placed in room' : `Locked: ${dec.requirement}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
