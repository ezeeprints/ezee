'use client';

import React, { useState } from 'react';
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
    { id: '#PAY-9041', date: '21 Jun 2026', desc: 'Added 50 Print Credits', credits: 50, cost: '$5.00' },
    { id: '#PAY-8822', date: '20 Jun 2026', desc: 'Chemistry Lab Report 4 (EZ-9112)', credits: -15, cost: 'Credits' },
    { id: '#PAY-8751', date: '15 Jun 2026', desc: 'Resume_2026.pdf Print Job', credits: -10, cost: 'Credits' },
    { id: '#PAY-8600', date: '02 Jun 2026', desc: 'Added 50 Print Credits', credits: 50, cost: '$5.00' }
  ];

  const handleAddCredits = () => {
    setCredits(prev => prev + 50);
  };

  return (
    <div className={styles.paperModal} style={{ width: '500px', maxWidth: '95vw', padding: '3.5rem 2.5rem' }}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close Payments">×</button>
      
      {/* Decorative metal clip at the top of the receipt */}
      <div style={{
        position: 'absolute',
        top: '-10px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80px',
        height: '24px',
        background: '#7A6D8C',
        borderRadius: '3px 3px 0 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }} />

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span style={{ fontSize: '1.2rem', fontFamily: 'Space Grotesk', color: '#7A6D8C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          * EZEE PAYMENTS RECEIPT *
        </span>
        <h2 style={{ fontFamily: 'Instrument Sans', fontSize: '2.4rem', color: '#2A2928', margin: '0.5rem 0 0 0', fontWeight: 'bold' }}>
          {credits} Credits
        </h2>
        <p style={{ fontFamily: 'Space Grotesk', fontSize: '0.9rem', color: '#7A6D8C', margin: '0.2rem 0' }}>
          1 Credit = 1 B&W Page Printed
        </p>
        <button 
          onClick={handleAddCredits} 
          className={styles.tactileBtn} 
          style={{ marginTop: '1rem', padding: '0.6rem 1.5rem', fontSize: '0.95rem' }}
        >
          Add 50 Credits ($5.00)
        </button>
      </div>

      <div style={{ borderTop: '2px dashed rgba(42, 41, 40, 0.2)', paddingTop: '1.5rem' }}>
        <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '0.95rem', color: '#7A6D8C', textTransform: 'uppercase', margin: '0 0 1rem 0' }}>
          Ledger Transactions
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {transactions.map((t) => (
            <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Instrument Sans', fontSize: '0.95rem', borderBottom: '1px dotted rgba(42,41,40,0.1)', paddingBottom: '0.5rem' }}>
              <div>
                <div style={{ fontWeight: 'bold', color: '#2A2928' }}>{t.desc}</div>
                <div style={{ fontSize: '0.8rem', color: '#7A6D8C', fontFamily: 'Space Grotesk' }}>{t.date} • {t.id}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ 
                  fontWeight: 'bold', 
                  fontFamily: 'Space Grotesk', 
                  color: t.credits > 0 ? '#A9B59D' : '#D48A70' 
                }}>
                  {t.credits > 0 ? `+${t.credits}` : t.credits} pts
                </span>
                <div style={{ fontSize: '0.8rem', color: '#7A6D8C' }}>{t.cost}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Barcode */}
      <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.65 }}>
        <div style={{ height: '35px', width: '180px', background: 'repeating-linear-gradient(90deg, #2A2928, #2A2928 2px, transparent 2px, transparent 6px)' }} />
        <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.75rem', marginTop: '0.3rem', color: '#7A6D8C' }}>
          EZEE-STUDENT-WALLET-2026
        </span>
      </div>
    </div>
  );
}
