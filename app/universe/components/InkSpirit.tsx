'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useUniverse } from '../UniverseProvider';

export default function InkSpirit() {
  const { timeOfDay, weather } = useUniverse();

  const isNight = timeOfDay === 'night';
  const isRaining = weather === 'rain';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{
        position: 'fixed',
        bottom: '2vh',
        right: '2vw',
        width: '60px',
        height: '80px',
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      {/* Tiny Lamp that turns on at night or during rain */}
      {(isNight || isRaining) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-10px',
            width: '40px',
            height: '40px',
            background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)',
          }}
        />
      )}

      {/* The Ink Spirit Body */}
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 100 120"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Soft shadowy body */}
        <path
          d="M 20 60 Q 50 20 80 60 Q 90 100 50 110 Q 10 100 20 60 Z"
          fill="var(--texture-ink)"
          opacity="0.9"
        />

        {/* Tiny book */}
        <path d="M 40 70 L 60 70 L 65 85 L 35 85 Z" fill="var(--texture-paper)" />
        <line x1="50" y1="70" x2="50" y2="85" stroke="var(--texture-dark-wood)" strokeWidth="1" />

        {/* Quietly reading (Eyes looking down) */}
        <path d="M 40 55 Q 45 58 50 55" stroke="var(--texture-paper)" strokeWidth="2" fill="none" opacity="0.8" />
        <path d="M 60 55 Q 65 58 70 55" stroke="var(--texture-paper)" strokeWidth="2" fill="none" opacity="0.8" />
        
        {/* Scarf / Texture detail */}
        <path d="M 30 65 Q 50 75 70 65" stroke="var(--texture-fabric)" strokeWidth="3" fill="none" opacity="0.6" />
      </motion.svg>
    </motion.div>
  );
}
