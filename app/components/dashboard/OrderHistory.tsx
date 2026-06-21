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
  status: 'Completed' | 'Shipped' | 'Cancelled';
}

export default function OrderHistory({ onClose }: OrderHistoryProps) {
  const orders: MockOrder[] = [
    { id: 'EZ-8812', date: '12 May 2026', filename: 'Semester_1_Calculus_Notes.pdf', pages: 42, format: 'Color', price: '$12.50', status: 'Completed' },
    { id: 'EZ-8904', date: '02 Jun 2026', filename: 'History_Thesis_Final_Draft.pdf', pages: 110, format: 'B&W', price: '$18.90', status: 'Completed' },
    { id: 'EZ-9011', date: '15 Jun 2026', filename: 'Resume_2026.pdf', pages: 2, format: 'Color', price: '$2.00', status: 'Completed' },
    { id: 'EZ-9112', date: '20 Jun 2026', filename: 'Chemistry_Lab_Report_4.pdf', pages: 15, format: 'B&W', price: '$3.50', status: 'Shipped' }
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
              Library Ledger
            </h2>
            <p style={{ fontFamily: 'Space Grotesk', fontSize: '0.9rem', color: '#7A6D8C', margin: '0.2rem 0 0 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Student Print Journal • Vol. 1
            </p>
          </div>
          <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.9rem', color: '#D48A70', border: '1px solid #D48A70', padding: '0.2rem 0.6rem', borderRadius: '4px', transform: 'rotate(2deg)' }}>
            EZEE PRINTS
          </span>
        </div>

        {/* Vintage Ledger Layout */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(42, 41, 40, 0.1)' }}>
                <th style={{ fontFamily: 'Space Grotesk', fontWeight: 'bold', fontSize: '0.9rem', padding: '0.8rem 0.5rem', color: '#7A6D8C' }}>DATE DUE/REC</th>
                <th style={{ fontFamily: 'Space Grotesk', fontWeight: 'bold', fontSize: '0.9rem', padding: '0.8rem 0.5rem', color: '#7A6D8C' }}>ITEM ID</th>
                <th style={{ fontFamily: 'Space Grotesk', fontWeight: 'bold', fontSize: '0.9rem', padding: '0.8rem 0.5rem', color: '#7A6D8C' }}>DOCUMENT NAME</th>
                <th style={{ fontFamily: 'Space Grotesk', fontWeight: 'bold', fontSize: '0.9rem', padding: '0.8rem 0.5rem', color: '#7A6D8C', textAlign: 'center' }}>PAGES / TYPE</th>
                <th style={{ fontFamily: 'Space Grotesk', fontWeight: 'bold', fontSize: '0.9rem', padding: '0.8rem 0.5rem', color: '#7A6D8C', textAlign: 'right' }}>FEE</th>
                <th style={{ fontFamily: 'Space Grotesk', fontWeight: 'bold', fontSize: '0.9rem', padding: '0.8rem 0.5rem', color: '#7A6D8C', textAlign: 'center' }}>STATUS</th>
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
                  <td style={{ padding: '1rem 0.5rem', fontFamily: 'Space Grotesk', fontSize: '0.9rem', color: '#2A2928' }}>{order.id}</td>
                  <td style={{ padding: '1rem 0.5rem', fontWeight: 500, color: '#2A2928' }}>{order.filename}</td>
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
                      backgroundColor: order.status === 'Completed' ? 'rgba(169, 181, 157, 0.15)' : order.status === 'Shipped' ? 'rgba(212, 138, 112, 0.15)' : 'rgba(122, 109, 140, 0.15)',
                      color: order.status === 'Completed' ? '#A9B59D' : order.status === 'Shipped' ? '#D48A70' : '#7A6D8C',
                      border: `1px solid ${order.status === 'Completed' ? 'rgba(169, 181, 157, 0.3)' : order.status === 'Shipped' ? 'rgba(212, 138, 112, 0.3)' : 'rgba(122, 109, 140, 0.3)'}`,
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

        {/* Ink Stamp Decoration */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          right: '3rem',
          border: '3px double #D48A70',
          color: '#D48A70',
          padding: '0.4rem 1.2rem',
          fontFamily: 'Space Grotesk',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          textTransform: 'uppercase',
          borderRadius: '6px',
          opacity: 0.7,
          transform: 'rotate(-8deg)',
          pointerEvents: 'none',
          userSelect: 'none'
        }}>
          OFFICIAL LOG
        </div>
      </div>
    </div>
  );
}
