'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useObservatoryEnvironment } from './useObservatoryEnvironment';

export default function WiseOwl() {
  const [showInsight, setShowInsight] = useState(false);
  const { env } = useObservatoryEnvironment();
  const isNight = env.timeOfDay === 'night' || env.timeOfDay === 'sunset';

  const toggleInsight = () => {
    setShowInsight(!showInsight);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Bookshelf Background */}
      <div style={{
        position: 'absolute', top: '10%', bottom: '10%', width: '80%',
        background: isNight ? '#2A1A0B' : '#4A3219', borderRadius: '4px', border: '10px solid #36220E',
        boxShadow: 'inset 0 20px 50px rgba(0,0,0,0.8)', zIndex: 0,
        display: 'flex', flexDirection: 'column', padding: '2rem',
        transition: 'background 4s ease'
      }}>
        {/* Shelves */}
        <div style={{ width: '100%', height: '20px', background: '#5C3D1D', marginTop: '20%', boxShadow: '0 10px 20px rgba(0,0,0,0.5)', position: 'relative' }}>
          {/* A few shifting books */}
          <motion.div animate={{ rotateZ: [-1, 1, -1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', bottom: '20px', left: '10%', width: '20px', height: '80px', background: '#800020' }} />
          <motion.div animate={{ rotateZ: [1, -1, 1] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', bottom: '20px', left: '15%', width: '25px', height: '90px', background: '#556B2F' }} />
        </div>
        <div style={{ width: '100%', height: '20px', background: '#5C3D1D', marginTop: '30%', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }} />
      </div>

      {/* The Owl */}
      <motion.div
        onClick={toggleInsight}
        whileHover={{ scale: 1.05 }}
        style={{
          position: 'absolute', top: '22%', right: '25%', zIndex: 10,
          cursor: 'pointer'
        }}
      >
        <svg width="80" height="100" viewBox="0 0 80 100">
          {/* Body */}
          <path d="M 20 40 Q 40 10 60 40 L 65 80 Q 40 100 15 80 Z" fill={isNight ? "#2A2928" : "#3D3A38"} stroke="#2A2928" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="30" cy="45" r="12" fill="#F5EFE7" />
          <circle cx="50" cy="45" r="12" fill="#F5EFE7" />
          
          <motion.circle 
            cx="30" cy="45" r="4" fill="#D4AF37"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: isNight ? 8 : 5 }}
          />
          <motion.circle 
            cx="50" cy="45" r="4" fill="#D4AF37" 
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: isNight ? 8 : 5 }}
          />
          
          {isNight && (
            <motion.path 
              d="M 20 45 Q 30 35 40 45" stroke="#2A2928" strokeWidth="3" fill="none" // Reading glasses / sleepy lids
            />
          )}

          {/* Beak */}
          <path d="M 35 55 L 45 55 L 40 65 Z" fill="#D4AF37" />

          {/* Tiny Book at Night */}
          {isNight && (
            <g transform="translate(25, 70)">
              <rect width="30" height="15" fill="#F5EFE7" rx="2" />
              <line x1="15" y1="0" x2="15" y2="15" stroke="#D4AF37" strokeWidth="2" />
            </g>
          )}
        </svg>
      </motion.div>

      {/* Insight Tooltip */}
      <AnimatePresence>
        {showInsight && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            style={{
              position: 'absolute', top: '15%', right: '35%',
              background: '#F5EFE7', color: '#2A2928',
              padding: '1.5rem', borderRadius: '4px', width: '300px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)', zIndex: 20,
              fontFamily: 'Instrument Sans'
            }}
          >
            <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Quiet Insight
            </div>
            <p style={{ fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>
              {isNight 
                ? `"The stars are out. The queues are quiet. You can rest soon."`
                : `"The morning rush has settled. It might rain later, but all is well."`}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
