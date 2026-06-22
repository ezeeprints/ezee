'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  isClosingTime: boolean;
}

export default function Workbench({ isClosingTime }: Props) {
  
  const orders = [
    { id: '1', title: 'Arch Thesis', type: 'urgent', status: 'waiting', x: 20 },
    { id: '2', title: 'Biology Notes', type: 'normal', status: 'waiting', x: 120 },
    { id: '3', title: 'Design Portfolio', type: 'normal', status: 'binding', x: 400 },
  ];

  return (
    <div style={{ position: 'absolute', bottom: 0, width: '100vw', height: '45vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Workbench Backboard */}
      <div style={{ position: 'absolute', bottom: '30vh', width: '80vw', height: '20vh', background: '#36220E', borderRadius: '8px 8px 0 0', border: '4px solid #2A1A0B', zIndex: 5, display: 'flex', padding: '1rem', gap: '2rem' }}>
        
        {/* Binding Machine on backboard */}
        <div style={{ width: '80px', height: '60px', background: '#3D3A38', border: '2px solid #111', borderRadius: '4px', position: 'relative', marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Lever */}
          <div style={{ width: '10px', height: '40px', background: '#D4AF37', position: 'absolute', top: '-30px', right: '10px', borderRadius: '5px' }} />
          {/* Press */}
          <div style={{ width: '60px', height: '10px', background: '#2A2928', marginTop: '10px', borderRadius: '2px' }} />
          <span style={{ fontSize: '0.4rem', color: '#888', marginTop: 'auto', marginBottom: '5px' }}>BINDER PRESS</span>
        </div>
        
        {/* Sticky Notes on backboard */}
        <div style={{ width: '50px', height: '50px', background: '#FFC107', transform: 'rotate(-5deg)', boxShadow: '2px 2px 5px rgba(0,0,0,0.3)', padding: '5px', fontFamily: 'Space Grotesk', fontSize: '0.4rem', color: '#111' }}>
          Call Aisha at 5 PM
        </div>

        {/* Working Note */}
        {!isClosingTime && (
          <div style={{ width: '80px', height: '30px', background: '#FFF9C4', transform: 'rotate(2deg)', boxShadow: '2px 2px 5px rgba(0,0,0,0.3)', padding: '5px', fontFamily: 'Space Grotesk', fontSize: '0.5rem', color: '#111', marginLeft: 'auto' }}>
            Working on it ✨
          </div>
        )}
      </div>

      {/* Workbench Surface */}
      <div style={{ position: 'absolute', bottom: '-10vh', width: '120vw', height: '40vh', background: '#4A3219', borderRadius: '50% 50% 0 0', boxShadow: 'inset 0 20px 50px rgba(0,0,0,0.8), 0 -10px 20px rgba(0,0,0,0.5)', zIndex: 10 }}>
        
        {/* Spatial Zones Labels */}
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '80vw', margin: '0 auto', paddingTop: '2rem', fontFamily: 'Space Grotesk', fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}>
          <span>WAITING TRAY</span>
          <span>PRINTING</span>
          <span>BINDING AREA</span>
        </div>

        {/* Physical Orders on the desk */}
        {!isClosingTime && orders.map(order => (
          <motion.div
            key={order.id}
            drag
            dragConstraints={{ left: 0, right: 800, top: 0, bottom: 50 }}
            whileHover={{ scale: 1.05, cursor: 'grab' }}
            whileDrag={{ scale: 1.1, cursor: 'grabbing', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
            style={{
              position: 'absolute', top: '80px', left: `${order.x}px`,
              width: '120px', height: '160px', background: '#F5EFE7',
              borderRadius: '2px', border: '1px solid #CCC',
              padding: '10px', display: 'flex', flexDirection: 'column',
              boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
            }}
          >
            {/* Leather Strap (if normal order) */}
            {order.type === 'normal' && (
              <div style={{ position: 'absolute', top: '30%', left: '-5px', width: '130px', height: '8px', background: '#5C3D1D', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
            )}

            {/* Bookmark */}
            {order.type === 'urgent' && (
              <div style={{ position: 'absolute', top: '-15px', left: '20px', width: '15px', height: '30px', background: '#2E4C38', borderBottom: '5px solid transparent', borderLeft: '7.5px solid #2E4C38', borderRight: '7.5px solid #2E4C38' }} />
            )}

            {/* Physical Binding clip visual */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '15px', background: '#3D3A38', borderBottom: '2px solid #111' }} />
            
            {/* Urgent ribbon */}
            {order.type === 'urgent' && (
              <div style={{ position: 'absolute', top: '-5px', right: '10px', width: '15px', height: '40px', background: '#9B2C2C', boxShadow: '2px 2px 4px rgba(0,0,0,0.2)' }} />
            )}

            <div style={{ marginTop: '20px', fontFamily: 'Space Grotesk', fontSize: '0.5rem', color: '#888' }}>ORDER #{order.id}</div>
            <div style={{ fontFamily: 'Instrument Sans', fontSize: '1rem', color: '#2A2928', fontWeight: 'bold' }}>{order.title}</div>
            
            {order.status === 'binding' && (
              <div style={{ marginTop: 'auto', display: 'flex', gap: '5px' }}>
                <div style={{ width: '20px', height: '20px', background: '#5C3D1D', borderRadius: '50%' }} /> {/* Binding ring */}
                <div style={{ width: '20px', height: '20px', background: '#5C3D1D', borderRadius: '50%' }} />
              </div>
            )}
          </motion.div>
        ))}

        {/* Coffee Mug & Ink Bottle */}
        <div style={{ position: 'absolute', bottom: '15vh', left: '15vw', display: 'flex', gap: '20px', alignItems: 'flex-end', zIndex: 25 }}>
          {/* Coffee Mug */}
          <div style={{ position: 'relative', width: '50px', height: '60px', background: '#F5EFE7', borderRadius: '4px', border: '2px solid #CCC' }}>
            {!isClosingTime && (
              <motion.div animate={{ y: [-10, -30], opacity: [0, 0.5, 0], x: [0, 5, -5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} style={{ position: 'absolute', top: '-10px', left: '15px', width: '20px', height: '20px', background: 'rgba(255,255,255,0.3)', filter: 'blur(5px)', borderRadius: '50%' }} />
            )}
          </div>
          
          {/* Ink Bottle */}
          <div style={{ position: 'relative', width: '30px', height: '40px', background: '#2A1A0B', borderRadius: '4px 4px 2px 2px', border: '1px solid #111' }}>
            <div style={{ position: 'absolute', top: '-10px', left: '5px', width: '20px', height: '10px', background: '#111', borderRadius: '2px' }} />
            <div style={{ position: 'absolute', bottom: '5px', left: '5px', width: '20px', height: '15px', background: '#0A0A0A', borderRadius: '2px', opacity: 0.8 }} />
            <span style={{ position: 'absolute', top: '10px', left: '8px', fontSize: '0.3rem', color: '#D4AF37', fontFamily: 'Space Grotesk' }}>INK</span>
          </div>
        </div>

      </div>

    </div>
  );
}
