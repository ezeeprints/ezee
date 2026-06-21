'use client';

import React, { useState } from 'react';
import styles from '../../student/student.module.css';

interface PrintStudioProps {
  onClose: () => void;
}

export default function PrintStudio({ onClose }: PrintStudioProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Future logic: handle file drop
  };

  return (
    <div className={styles.paperModal} style={{ width: '800px', maxWidth: '90vw' }}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close Print Studio">×</button>
      
      {/* Decorative Tape */}
      <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', width: '100px', height: '30px', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }} />

      <div style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start' }}>
        
        {/* Left Side: Upload Zone */}
        <div style={{ flex: 1 }}>
          <h2 className={styles.modalHeader}>Print Studio</h2>
          <p style={{ fontFamily: 'Instrument Sans', fontSize: '1.2rem', marginBottom: '2rem', color: '#7A6D8C' }}>
            Drop your documents here. Let's get them printed.
          </p>

          <div 
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${dragActive ? '#D48A70' : '#A9B59D'}`,
              borderRadius: '8px',
              padding: '3rem 2rem',
              textAlign: 'center',
              backgroundColor: dragActive ? 'rgba(212, 138, 112, 0.05)' : 'transparent',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            {/* Paper Clip SVG decoration */}
            <svg style={{ position: 'absolute', top: '-15px', right: '20px', width: '30px', height: '60px', transform: 'rotate(15deg)' }} viewBox="0 0 30 60">
               <path d="M 15 50 L 15 15 Q 15 5 25 5 Q 35 5 35 25 L 35 55 Q 35 70 15 70 Q -5 70 -5 45 L -5 20" fill="none" stroke="#7A6D8C" strokeWidth="4" strokeLinecap="round" />
            </svg>

            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>📄</span>
            <span style={{ fontFamily: 'Space Grotesk', fontWeight: 'bold' }}>Drag & Drop PDF</span>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#7A6D8C' }}>or click to browse</p>
          </div>
        </div>

        {/* Right Side: Active Orders */}
        <div style={{ flex: 1, borderLeft: '1px solid rgba(42, 41, 40, 0.1)', paddingLeft: '2rem' }}>
          <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem', marginBottom: '1.5rem' }}>Active Orders</h3>
          
          {/* A Paper Stack Order Item */}
          <div style={{
            background: '#fff',
            padding: '1.5rem',
            boxShadow: '2px 4px 10px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(0,0,0,0.05)',
            position: 'relative',
            transform: 'rotate(-1deg)',
            marginBottom: '2rem'
          }}>
            {/* Curled corner */}
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.05) 50%)' }} />
            
            {/* Bookmark ribbon */}
            <div style={{ position: 'absolute', top: '-10px', right: '20px', width: '15px', height: '40px', background: '#D48A70', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }} />

            <h4 style={{ fontFamily: 'Instrument Sans', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Physics Notes.pdf</h4>
            <p style={{ color: '#7A6D8C', fontSize: '0.9rem', margin: 0 }}>Processing • 12 pages, B&W</p>
            
            {/* Tiny Ezi progress indicator */}
            <div style={{ marginTop: '1rem', height: '4px', background: '#EAE4DD', borderRadius: '2px', position: 'relative' }}>
               <div style={{ width: '40%', height: '100%', background: '#A9B59D', borderRadius: '2px' }} />
               <span style={{ position: 'absolute', left: '40%', top: '-10px', transform: 'translateX(-50%)', fontSize: '0.8rem' }}>🏃</span>
            </div>
          </div>

          <button className={styles.tactileBtn} style={{ width: '100%', justifyContent: 'center' }}>
            View Order History
          </button>
        </div>

      </div>
    </div>
  );
}
