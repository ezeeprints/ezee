'use client';

import React, { useState } from 'react';
import styles from './print.module.css';

interface PaymentDeskProps {
  pageCount: number;
  copies: number;
  colorMode: string;
  isNight: boolean;
  onPay: () => void;
  onBack: () => void;
}

function WalletPouch() {
  return (
    <svg width="220" height="140" viewBox="0 0 220 140" style={{ filter: 'drop-shadow(0 12px 24px rgba(42,41,40,0.15))' }}>
      {/* Wallet base */}
      <rect x="10" y="20" width="200" height="110" rx="12" fill="#8B6340" />
      {/* Wallet texture / stitching */}
      <rect x="14" y="24" width="192" height="102" rx="8" fill="none" stroke="rgba(42,41,40,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
      {/* Pouch flap (open) */}
      <path d="M 10 20 Q 110 -20 210 20 L 210 60 Q 110 80 10 60 Z" fill="#A87A51" />
      <path d="M 14 24 Q 110 -12 206 24" fill="none" stroke="rgba(42,41,40,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
      {/* Button clasp */}
      <circle cx="110" cy="50" r="8" fill="#D4A574" stroke="rgba(42,41,40,0.2)" strokeWidth="1" />
      <circle cx="110" cy="50" r="3" fill="#8B6340" />
      
      {/* Inside shadow */}
      <path d="M 10 60 Q 110 80 210 60 L 210 130 L 10 130 Z" fill="rgba(42,41,40,0.15)" />
    </svg>
  );
}

function UpiCard({ onClick, isHovered }: { onClick: () => void, isHovered: boolean }) {
  return (
    <svg 
      width="160" height="100" viewBox="0 0 160 100" 
      onClick={onClick}
      style={{ 
        cursor: 'pointer',
        transform: isHovered ? 'translateY(-10px) rotate(-2deg)' : 'translateY(0) rotate(5deg)',
        transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        filter: isHovered ? 'drop-shadow(0 16px 32px rgba(42,41,40,0.2))' : 'drop-shadow(0 4px 12px rgba(42,41,40,0.15))'
      }}
    >
      {/* Card base */}
      <rect x="4" y="4" width="152" height="92" rx="8" fill="#EAE4DD" stroke="rgba(42,41,40,0.1)" strokeWidth="1" />
      {/* Chip */}
      <rect x="16" y="35" width="20" height="16" rx="3" fill="#D4A574" stroke="rgba(42,41,40,0.1)" strokeWidth="0.5" />
      <path d="M 16 43 L 36 43 M 26 35 L 26 51" stroke="rgba(42,41,40,0.1)" strokeWidth="0.5" />
      {/* Tap indicator */}
      <path d="M 130 35 Q 135 43 130 51" stroke="rgba(42,41,40,0.3)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 136 32 Q 142 43 136 54" stroke="rgba(42,41,40,0.3)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 142 29 Q 149 43 142 57" stroke="rgba(42,41,40,0.3)" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Text / Logo */}
      <text x="16" y="24" fontFamily="Space Grotesk" fontSize="10" fill="#2A2928" fontWeight="700">STUDENT UPI</text>
      <text x="16" y="80" fontFamily="Space Grotesk" fontSize="8" fill="#7A6D8C" letterSpacing="2">•••• 4092</text>
    </svg>
  );
}

function PhysicalCoins() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" style={{ position: 'absolute', right: '-40px', bottom: '10px', filter: 'drop-shadow(0 4px 6px rgba(42,41,40,0.15))' }}>
      <circle cx="30" cy="30" r="14" fill="#EAE4DD" stroke="#D4A574" strokeWidth="2" />
      <circle cx="30" cy="30" r="10" fill="none" stroke="rgba(42,41,40,0.1)" strokeWidth="1" strokeDasharray="2 2" />
      <text x="30" y="34" textAnchor="middle" fontFamily="Space Grotesk" fontSize="10" fill="#D4A574" fontWeight="700">5</text>
      
      <circle cx="50" cy="55" r="12" fill="#D4A574" stroke="#8B6340" strokeWidth="1" />
      <circle cx="50" cy="55" r="8" fill="none" stroke="rgba(42,41,40,0.1)" strokeWidth="1" strokeDasharray="2 2" />
      <text x="50" y="58" textAnchor="middle" fontFamily="Space Grotesk" fontSize="8" fill="#8B6340" fontWeight="700">1</text>
      
      <circle cx="70" cy="35" r="14" fill="#EAE4DD" stroke="#D4A574" strokeWidth="2" />
      <circle cx="70" cy="35" r="10" fill="none" stroke="rgba(42,41,40,0.1)" strokeWidth="1" strokeDasharray="2 2" />
      <text x="70" y="39" textAnchor="middle" fontFamily="Space Grotesk" fontSize="10" fill="#D4A574" fontWeight="700">5</text>
    </svg>
  );
}

function PhysicalStamps() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" style={{ position: 'absolute', left: '-50px', top: '20px', transform: 'rotate(-15deg)', filter: 'drop-shadow(0 2px 4px rgba(42,41,40,0.1))' }}>
      <rect x="10" y="10" width="40" height="48" fill="#FAF7F1" stroke="#A9B59D" strokeWidth="1.5" strokeDasharray="4 2" />
      <rect x="14" y="14" width="32" height="30" fill="#A9B59D" opacity="0.2" />
      <path d="M 18 36 L 24 20 L 30 36 L 36 20 L 42 36" fill="none" stroke="#A9B59D" strokeWidth="1.5" strokeLinecap="round" />
      <text x="30" y="52" textAnchor="middle" fontFamily="Space Grotesk" fontSize="6" fill="#7A6D8C">POST</text>
    </svg>
  );
}

export default function PaymentDesk({ pageCount, copies, colorMode, isNight, onPay, onBack }: PaymentDeskProps) {
  const [upiHover, setUpiHover] = useState(false);
  
  // Calculate cost
  const ratePerPage = colorMode === 'color' ? 5 : 2;
  const totalCost = pageCount * copies * ratePerPage;
  
  return (
    <div className={styles.paymentDrawerPhase} style={{ position: 'absolute', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: isNight ? 'rgba(28,26,24,0.95)' : 'rgba(250,247,241,0.95)', animation: `${styles.phaseIn} 0.5s ease forwards` }}>
      
      {/* Back button */}
      <button 
        onClick={onBack}
        style={{ position: 'absolute', top: '2rem', left: '2rem', background: 'none', border: 'none', fontFamily: 'Space Grotesk', fontSize: '0.9rem', color: '#7A6D8C', cursor: 'pointer', opacity: 0.8 }}
      >
        ← Back to Desk
      </button>

      <h2 style={{ fontFamily: 'Instrument Sans', fontSize: '1.5rem', color: isNight ? '#EAE4DD' : '#2A2928', marginBottom: '3rem', fontWeight: 600 }}>
        The Desk Drawer
      </h2>
      
      <div style={{ position: 'relative', display: 'flex', gap: '3rem', alignItems: 'center' }}>
        
        {/* Left: The Receipt */}
        <div style={{ 
          position: 'relative',
          background: '#FAF7F1', 
          padding: '2rem 1.5rem',
          width: '240px',
          boxShadow: '0 4px 12px rgba(42,41,40,0.08)',
          transform: 'rotate(-2deg)',
          zIndex: 10
        }}>
          {/* Jagged top */}
          <div style={{ position: 'absolute', top: '-6px', left: 0, right: 0, height: '6px', background: 'linear-gradient(-45deg, #FAF7F1 4px, transparent 0), linear-gradient(45deg, #FAF7F1 4px, transparent 0)', backgroundSize: '8px 8px', backgroundRepeat: 'repeat-x' }} />
          
          <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '0.8rem', color: '#7A6D8C', textAlign: 'center', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>RECEIPT</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontFamily: 'Space Grotesk', fontSize: '0.85rem', color: '#2A2928' }}>
            <span>{pageCount} Pages</span>
            <span>₹{pageCount * ratePerPage}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontFamily: 'Space Grotesk', fontSize: '0.85rem', color: '#2A2928' }}>
            <span>{copies} Copies</span>
            <span>× {copies}</span>
          </div>
          
          <div style={{ borderTop: '1px dashed rgba(42,41,40,0.2)', margin: '1rem 0' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.85rem', color: '#7A6D8C' }}>Total</span>
            <span style={{ fontFamily: 'Instrument Sans', fontSize: '1.5rem', fontWeight: 700, color: '#2A2928' }}>₹{totalCost}</span>
          </div>

          <PhysicalStamps />
        </div>

        {/* Right: The Wallet & Payment */}
        <div style={{ position: 'relative' }}>
          <WalletPouch />
          
          {/* UPI Card slightly sticking out of wallet */}
          <div 
            style={{ position: 'absolute', top: '20px', left: '30px', zIndex: 5 }}
            onMouseEnter={() => setUpiHover(true)}
            onMouseLeave={() => setUpiHover(false)}
          >
            <UpiCard onClick={onPay} isHovered={upiHover} />
            
            {/* Click instruction */}
            <div style={{ 
              position: 'absolute', top: '110px', left: '20px', 
              fontFamily: 'Instrument Sans', fontSize: '0.85rem', color: isNight ? 'rgba(234,228,221,0.6)' : 'rgba(42,41,40,0.6)',
              opacity: upiHover ? 1 : 0, transition: 'opacity 0.3s ease',
              pointerEvents: 'none',
              whiteSpace: 'nowrap'
            }}>
              Tap card to pay
            </div>
          </div>

          <PhysicalCoins />
        </div>

      </div>

    </div>
  );
}
