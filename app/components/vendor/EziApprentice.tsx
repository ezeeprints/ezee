'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  isClosingTime: boolean;
}

export default function EziApprentice({ isClosingTime }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      style={{
        position: 'absolute',
        bottom: '25vh',
        right: '10vw',
        width: '100px',
        height: '120px',
        zIndex: 20,
        cursor: 'pointer',
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 100 120">
        {/* Ezi's blob body */}
        <motion.path
          d="M 30 20 Q 50 0 70 20 Q 90 50 80 90 Q 50 120 20 90 Q 10 50 30 20 Z"
          fill="#4A90E2"
          animate={{ scaleY: isClosingTime ? [1, 1.05, 1] : [1, 0.95, 1] }}
          transition={{ duration: isClosingTime ? 4 : 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Tiny Apron */}
        <path d="M 35 50 L 65 50 L 75 100 L 25 100 Z" fill="#5C3D1D" />
        {/* Apron straps */}
        <path d="M 35 50 L 20 20 M 65 50 L 80 20" stroke="#36220E" strokeWidth="3" fill="none" />
        
        {/* Tiny Pocket */}
        <path d="M 45 60 L 55 60 L 55 70 L 45 70 Z" fill="#36220E" />
        
        {/* Pen in pocket */}
        <line x1="48" y1="55" x2="48" y2="65" stroke="#FFF" strokeWidth="2" />

        {isClosingTime ? (
          /* Sleeping Face */
          <g>
            <path d="M 35 35 Q 40 38 45 35" stroke="#1A1918" strokeWidth="3" fill="none" />
            <path d="M 55 35 Q 60 38 65 35" stroke="#1A1918" strokeWidth="3" fill="none" />
            <motion.text x="70" y="20" fill="#FFF" fontSize="12" animate={{ opacity: [0, 1, 0], y: [0, -10] }} transition={{ duration: 4, repeat: Infinity }}>Z</motion.text>
            <motion.text x="80" y="10" fill="#FFF" fontSize="16" animate={{ opacity: [0, 1, 0], y: [0, -15] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}>Z</motion.text>
          </g>
        ) : (
          /* Working Face & Goggles */
          <g>
            {/* Goggles strap */}
            <path d="M 20 35 L 80 35" stroke="#1A1918" strokeWidth="4" />
            {/* Goggles frames */}
            <circle cx="40" cy="35" r="12" fill="#D4AF37" stroke="#36220E" strokeWidth="2" />
            <circle cx="60" cy="35" r="12" fill="#D4AF37" stroke="#36220E" strokeWidth="2" />
            {/* Eyes */}
            <circle cx="40" cy="35" r="4" fill="#1A1918" />
            <circle cx="60" cy="35" r="4" fill="#1A1918" />
            {/* Mouth */}
            <path d="M 45 48 Q 50 52 55 48" stroke="#1A1918" strokeWidth="2" fill="none" />
          </g>
        )}
      </svg>
      
      {/* Tooltip */}
      {!isClosingTime && (
        <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', background: '#F5EFE7', color: '#2A2928', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontFamily: 'Space Grotesk', whiteSpace: 'nowrap', opacity: 0.8 }}>
          Helping quietly
        </div>
      )}
    </motion.div>
  );
}
