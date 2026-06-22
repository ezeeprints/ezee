'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../../student/student.module.css';

interface PaymentsProps {
  onClose: () => void;
}

interface Transaction {
  id: string;
  date: string;
  desc: string;
  credits: number;
  cost: string;
}

export default function Payments({ onClose }: PaymentsProps) {
  const [credits, setCredits] = useState(75);

  const transactions: Transaction[] = [
    { id: '1', date: '21 Jun', desc: 'Refill', credits: 50, cost: '£5.00' },
    { id: '2', date: '20 Jun', desc: 'Chemistry Lab', credits: -15, cost: 'Used' },
    { id: '3', date: '15 Jun', desc: 'Resume', credits: -10, cost: 'Used' },
    { id: '4', date: '02 Jun', desc: 'Refill', credits: 50, cost: '£5.00' }
  ];

  const handleAddCredits = () => {
    setCredits(prev => prev + 50);
  };

  const variants = {
    initial: { opacity: 0, y: 50, rotateZ: 5, scale: 0.9 },
    animate: { opacity: 1, y: 0, rotateZ: 0, scale: 1, transition: { duration: 0.6, type: 'spring' as const, bounce: 0.3 } },
    exit: { opacity: 0, y: 50, rotateZ: -5, scale: 0.9, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={styles.paperModal} 
      style={{ 
        width: '400px', 
        maxWidth: '90vw', 
        maxHeight: '85vh',
        overflowY: 'auto',
        padding: '3rem 2.5rem',
        background: '#FAF7F1',
        boxShadow: '0 20px 40px rgba(42, 41, 40, 0.15)',
        borderRadius: '0 0 4px 4px',
        position: 'relative',
        filter: 'drop-shadow(0 0 10px rgba(42, 41, 40, 0.05))'
      }}
    >
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close Payments" style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', fontSize: '1.5rem', color: '#7A6D8C', cursor: 'pointer' }}>×</button>
      
      {/* Torn Top Edge Simulation */}
      <div style={{
        position: 'absolute',
        top: '-8px',
        left: 0,
        right: 0,
        height: '8px',
        background: 'radial-gradient(circle at 10px 0, transparent 10px, #FAF7F1 11px) repeat-x',
        backgroundSize: '20px 8px',
        backgroundPosition: '0 0'
      }} />

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.9rem', fontFamily: 'Space Grotesk', color: '#7A6D8C', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
          * RECEIPT *
        </span>
        <h2 style={{ fontFamily: 'Instrument Sans', fontSize: '3rem', color: '#2A2928', margin: '1rem 0 0 0', fontWeight: 'bold' }}>
          {credits}
        </h2>
        <p style={{ fontFamily: 'Space Grotesk', fontSize: '1rem', color: '#7A6D8C', margin: '0' }}>
          Available Pages
        </p>
        <button 
          onClick={handleAddCredits} 
          className={styles.tactileBtn} 
          style={{ marginTop: '1.5rem', padding: '0.8rem 2rem', fontSize: '1rem', background: '#2A2928', color: '#FAF7F1', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Instrument Sans', transition: 'all 0.3s' }}
        >
          Add Pages
        </button>
      </div>

      <div style={{ borderTop: '1px dashed #7A6D8C', paddingTop: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {transactions.map((t) => (
            <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Space Grotesk', fontSize: '0.95rem' }}>
              <div>
                <div style={{ color: '#2A2928', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.desc}</div>
                <div style={{ fontSize: '0.8rem', color: '#7A6D8C' }}>{t.date}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ 
                  fontWeight: 'bold', 
                  color: t.credits > 0 ? '#2A2928' : '#7A6D8C' 
                }}>
                  {t.credits > 0 ? `+${t.credits}` : t.credits}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Barcode Footer */}
      <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.8 }}>
        <div style={{ height: '40px', width: '100%', background: 'repeating-linear-gradient(90deg, #2A2928, #2A2928 2px, transparent 2px, transparent 6px, #2A2928 6px, #2A2928 9px, transparent 9px, transparent 12px)' }} />
        <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.75rem', marginTop: '0.5rem', color: '#7A6D8C', letterSpacing: '0.2em' }}>
          THANK YOU
        </span>
      </div>
    </motion.div>
  );
}
