'use client';

import React from 'react';

interface Props {
  isClosingTime: boolean;
}

export default function CompletionShelf({ isClosingTime }: Props) {
  return (
    <div style={{ position: 'relative', width: '250px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
      
      {/* Warm Shelf Light */}
      <div style={{
        position: 'absolute', top: 0, width: '100px', height: '100px',
        background: isClosingTime ? 'transparent' : 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)',
        zIndex: 0
      }} />

      {/* Hanging Lamp */}
      <div style={{ position: 'absolute', top: '-50px', width: '40px', height: '30px', background: '#3D3A38', borderRadius: '50% 50% 0 0', borderBottom: '2px solid #D4AF37', zIndex: 10 }}>
        <div style={{ position: 'absolute', bottom: '-5px', left: '10px', width: '20px', height: '5px', background: isClosingTime ? '#333' : '#FFF', boxShadow: isClosingTime ? 'none' : '0 0 10px #FFF' }} />
      </div>
      <div style={{ position: 'absolute', top: '-100px', width: '4px', height: '50px', background: '#111', zIndex: 9 }} />

      {/* Completed Packages */}
      <div style={{ display: 'flex', gap: '5px', zIndex: 5, alignItems: 'flex-end', paddingBottom: '10px' }}>
        
        {/* Wrapped Package 1 */}
        <div style={{ width: '60px', height: '80px', background: '#D1C7B7', border: '1px solid #AFA595', position: 'relative' }}>
          {/* String binding */}
          <div style={{ position: 'absolute', top: '50%', width: '100%', height: '2px', background: '#8B5A2B' }} />
          <div style={{ position: 'absolute', left: '50%', width: '2px', height: '100%', background: '#8B5A2B' }} />
          {/* Note */}
          <div style={{ position: 'absolute', top: '10px', right: '5px', width: '15px', height: '15px', background: '#FFC107', transform: 'rotate(10deg)' }} />
        </div>

        {/* Wrapped Package 2 */}
        <div style={{ width: '40px', height: '60px', background: '#C2B8A3', border: '1px solid #AFA595', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '30%', width: '100%', height: '2px', background: '#8B5A2B' }} />
          <div style={{ position: 'absolute', top: '70%', width: '100%', height: '2px', background: '#8B5A2B' }} />
        </div>

        {/* Wrapped Package 3 */}
        <div style={{ width: '70px', height: '40px', background: '#EAE5DB', border: '1px solid #CCC', position: 'relative' }}>
          {/* Ribbon */}
          <div style={{ position: 'absolute', left: '20px', width: '10px', height: '100%', background: '#9B2C2C' }} />
        </div>

      </div>

      {/* The Shelf Surface */}
      <div style={{ width: '100%', height: '15px', background: '#4A3219', borderBottom: '5px solid #2A1A0B', borderRadius: '4px', boxShadow: '0 10px 20px rgba(0,0,0,0.5)', zIndex: 10 }} />
      
      <span style={{ marginTop: '15px', fontFamily: 'Space Grotesk', fontSize: '0.7rem', color: '#888', letterSpacing: '0.1em' }}>READY FOR PICKUP</span>
    </div>
  );
}
