'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function SupportBoard() {
  const notes = [
    { id: 1, type: 'pinned', title: 'Paper Jam at Night Owl', color: '#FFF9C4', x: 20, y: 30, rotation: -5 },
    { id: 2, type: 'sealed', title: 'Refund Request', color: '#F5EFE7', x: 120, y: 50, rotation: 3 },
    { id: 3, type: 'pinned', title: 'Vendor Onboarding', color: '#C8E6C9', x: 50, y: 140, rotation: -2 },
  ];

  return (
    <div style={{ position: 'relative', width: '300px', height: '400px', margin: 'auto' }}>
      {/* Corkboard Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: '#8B5A2B', // Cork texture base
        borderRadius: '8px', border: '12px solid #36220E', // Wooden frame
        boxShadow: '0 15px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.8)'
      }}>
        {/* Subtle cork texture dots */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.1,
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '4px 4px'
        }} />
      </div>

      {/* Pinned Notes & Sealed Letters */}
      {notes.map((note) => (
        <motion.div
          key={note.id}
          whileHover={{ scale: 1.05, zIndex: 10 }}
          style={{
            position: 'absolute',
            left: `${note.x}px`, top: `${note.y}px`,
            width: note.type === 'sealed' ? '140px' : '100px',
            height: note.type === 'sealed' ? '80px' : '100px',
            background: note.color,
            rotate: note.rotation,
            boxShadow: '2px 4px 10px rgba(0,0,0,0.3)',
            padding: '10px',
            cursor: 'pointer',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            textAlign: 'center'
          }}
        >
          {note.type === 'pinned' && (
            <div style={{
              position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)',
              width: '8px', height: '8px', borderRadius: '50%', background: '#9B2C2C', // Red pin
              boxShadow: '1px 2px 2px rgba(0,0,0,0.2)'
            }} />
          )}
          {note.type === 'sealed' && (
            <>
              {/* Envelope flap */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '40px',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                background: 'linear-gradient(to bottom right, rgba(0,0,0,0.05), transparent)'
              }} />
              {/* Wax Seal */}
              <div style={{
                position: 'absolute', top: '30px', left: '50%', transform: 'translateX(-50%)',
                width: '16px', height: '16px', borderRadius: '50%', background: '#5C3D1D',
                boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }} />
            </>
          )}

          <span style={{ 
            fontFamily: note.type === 'sealed' ? 'Cabinet Grotesk' : 'Space Grotesk', 
            fontSize: note.type === 'sealed' ? '0.9rem' : '0.7rem', 
            color: '#2A2928', fontWeight: note.type === 'sealed' ? 'bold' : 'normal',
            marginTop: note.type === 'pinned' ? '10px' : '0'
          }}>
            {note.title}
          </span>
        </motion.div>
      ))}

      {/* Label */}
      <div style={{
        position: 'absolute', bottom: '-40px', left: '50%', transform: 'translateX(-50%)',
        fontFamily: 'Space Grotesk', fontSize: '0.8rem', color: '#F5EFE7', letterSpacing: '0.1em',
        textTransform: 'uppercase', opacity: 0.6
      }}>
        Support Requests
      </div>
    </div>
  );
}
