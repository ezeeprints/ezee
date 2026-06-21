'use client';

import React from 'react';
import styles from '../../student/student.module.css';

interface OrderHistoryProps {
  onClose: () => void;
}

interface MockOrder {
  id: string;
  date: string;
  filename: string;
  pages: number;
  format: 'Color' | 'B&W';
  price: string;
  status: 'With you 🎒' | 'Resting on shelf 🌿';
}

export default function OrderHistory({ onClose }: OrderHistoryProps) {
  const orders: MockOrder[] = [
    { id: '1', date: '12 May 2026', filename: 'Semester_1_Calculus_Notes.pdf', pages: 42, format: 'Color', price: '$12.50', status: 'With you 🎒' },
    { id: '2', date: '02 Jun 2026', filename: 'History_Thesis_Final_Draft.pdf', pages: 110, format: 'B&W', price: '$18.90', status: 'With you 🎒' },
    { id: '3', date: '15 Jun 2026', filename: 'Resume_2026.pdf', pages: 2, format: 'Color', price: '$2.00', status: 'With you 🎒' },
    { id: '4', date: '20 Jun 2026', filename: 'Chemistry_Lab_Report_4.pdf', pages: 15, format: 'B&W', price: '$3.50', status: 'Resting on shelf 🌿' }
  ];

  return (
    <div className={styles.paperModal} style={{ width: '800px', maxWidth: '95vw', padding: '3.5rem 3rem' }}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close Order History">×</button>
      
      {/* Vintage Library Binder Spine line / border simulation on the left */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '18px',
        backgroundColor: '#7A6D8C',
        opacity: 0.85,
        borderRadius: '4px 0 0 4px',
        boxShadow: 'inset -3px 0 5px rgba(0,0,0,0.2)'
      }} />

      {/* Decorative Hole Punches like an old binder */}
      <div style={{ position: 'absolute', left: '30px', top: '10%', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#2A2928', opacity: 0.15 }} />
      <div style={{ position: 'absolute', left: '30px', top: '50%', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#2A2928', opacity: 0.15 }} />
      <div style={{ position: 'absolute', left: '30px', top: '90%', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#2A2928', opacity: 0.15 }} />

      <div style={{ paddingLeft: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '2px dashed rgba(42, 41, 40, 0.2)', paddingBottom: '1rem', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontFamily: 'Instrument Sans', fontSize: '2.2rem', color: '#2A2928', margin: 0, fontWeight: 'normal' }}>
              Your Notes
            </h2>
            <p style={{ fontFamily: 'Space Grotesk', fontSize: '0.9rem', color: '#7A6D8C', margin: '0.2rem 0 0 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Safely stored and remembered
            </p>
          </div>
          <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.9rem', color: '#A9B59D', border: '1px solid #A9B59D', padding: '0.2rem 0.6rem', borderRadius: '4px', transform: 'rotate(2deg)' }}>
            EZEE PRINTS
          </span>
        </div>

        {/* Vintage Ledger Layout */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(42, 41, 40, 0.1)' }}>
                <th style={{ fontFamily: 'Space Grotesk', fontWeight: 'bold', fontSize: '0.9rem', padding: '0.8rem 0.5rem', color: '#7A6D8C' }}>DATE</th>
                <th style={{ fontFamily: 'Space Grotesk', fontWeight: 'bold', fontSize: '0.9rem', padding: '0.8rem 0.5rem', color: '#7A6D8C' }}>THE NOTES</th>
                <th style={{ fontFamily: 'Space Grotesk', fontWeight: 'bold', fontSize: '0.9rem', padding: '0.8rem 0.5rem', color: '#7A6D8C', textAlign: 'center' }}>PAGES</th>
                <th style={{ fontFamily: 'Space Grotesk', fontWeight: 'bold', fontSize: '0.9rem', padding: '0.8rem 0.5rem', color: '#7A6D8C', textAlign: 'right' }}>EXCHANGE 🪙</th>
                <th style={{ fontFamily: 'Space Grotesk', fontWeight: 'bold', fontSize: '0.9rem', padding: '0.8rem 0.5rem', color: '#7A6D8C', textAlign: 'center' }}>WHERE THEY ARE</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr 
                  key={order.id} 
                  className={styles.wiggle}
                  style={{ 
                    borderBottom: '1px solid rgba(42, 41, 40, 0.05)', 
                    fontFamily: 'Instrument Sans', 
                    fontSize: '1rem',
                    backgroundColor: idx % 2 === 0 ? 'rgba(42, 41, 40, 0.01)' : 'transparent'
                  }}
                >
                  <td style={{ padding: '1rem 0.5rem', color: '#7A6D8C', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>{order.date}</td>
                  <td style={{ padding: '1rem 0.5rem', fontWeight: 600, fontSize: '1.1rem', color: '#2A2928' }}>{order.filename}</td>
                  <td style={{ padding: '1rem 0.5rem', textAlign: 'center', color: '#7A6D8C', fontSize: '0.9rem' }}>
                    {order.pages} pp • {order.format}
                  </td>
                  <td style={{ padding: '1rem 0.5rem', textAlign: 'right', fontFamily: 'Space Grotesk', fontWeight: 'bold', color: '#2A2928' }}>{order.price}</td>
                  <td style={{ padding: '1rem 0.5rem', textAlign: 'center' }}>
                    <span style={{
                      display: 'inline-block',
                      fontFamily: 'Space Grotesk',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '3px',
                      backgroundColor: order.status === 'With you 🎒' ? 'rgba(169, 181, 157, 0.15)' : 'rgba(212, 138, 112, 0.15)',
                      color: order.status === 'With you 🎒' ? '#A9B59D' : '#D48A70',
                      border: `1px solid ${order.status === 'With you 🎒' ? 'rgba(169, 181, 157, 0.3)' : 'rgba(212, 138, 112, 0.3)'}`,
                      transform: idx % 2 === 0 ? 'rotate(-2deg)' : 'rotate(1deg)'
                    }}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tiny Ezi Illustration in corner instead of corporate stamp */}
        <div style={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '2.5rem',
          opacity: 0.8,
          pointerEvents: 'none',
          userSelect: 'none'
        }}>
          <svg width="45" height="60" viewBox="0 0 80 110">
            <path d="M 40 12 C 62 12 74 42 74 68 C 74 90 62 108 40 108 C 18 108 6 90 6 68 C 6 42 18 12 40 12 Z" fill="#2A2928" />
            <ellipse cx="40" cy="52" rx="24" ry="19" fill="#FAF7F1" />
            {/* Happy eyes */}
            <path d="M 30 50 Q 35 46 40 50" stroke="#2A2928" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 40 50 Q 45 46 50 50" stroke="#2A2928" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <ellipse cx="28" cy="56" rx="5" ry="3" fill="#D48A70" opacity="0.4" />
            <ellipse cx="52" cy="56" rx="5" ry="3" fill="#D48A70" opacity="0.4" />
            {/* Smile */}
            <path d="M 35 60 Q 40 64 45 60" stroke="#2A2928" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Holding a little book */}
            <path d="M 12 70 C 8 60 12 50 18 45" stroke="#2A2928" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 68 70 C 72 60 68 50 62 45" stroke="#2A2928" strokeWidth="8" strokeLinecap="round" fill="none" />
            <rect x="25" y="42" width="30" height="20" rx="2" fill="#A9B59D" />
            <rect x="28" y="45" width="24" height="14" rx="1" fill="#FAF7F1" />
            <line x1="40" y1="46" x2="40" y2="58" stroke="rgba(42,41,40,0.15)" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </div>
  );
}
