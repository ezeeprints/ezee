'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../vendor/vendor.module.css';

import { useUniverse } from '../../universe/UniverseProvider';
import Workbench from '@/app/components/vendor/Workbench';
import Printers from '@/app/components/vendor/Printers';
import EziApprentice from '@/app/components/vendor/EziApprentice';
import CompletionShelf from '@/app/components/vendor/CompletionShelf';
import MakerMemories from '@/app/components/vendor/MakerMemories';

export default function WorkshopRoom() {
  const { timeOfDay, weather, setUniverseState } = useUniverse();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const isNight = timeOfDay === 'night';
  const isClosingTime = isNight;
  
  const toggleClosingTime = () => {
    setUniverseState({
      timeOfDay: timeOfDay === 'night' ? 'goldenHour' : 'night',
      weather: weather === 'rain' ? 'clear' : 'rain'
    });
  };

  // Ambient Particles
  const dustParticles = mounted ? Array.from({ length: 30 }).map((_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 3 + 1, duration: Math.random() * 10 + 10, delay: Math.random() * 5,
  })) : [];

  const rainDrops = mounted && weather === 'rain' ? Array.from({ length: 150 }).map((_, i) => ({
    id: `rain-${i}`, x: Math.random() * 100, delay: Math.random() * 2, duration: Math.random() * 0.5 + 0.5,
  })) : [];

  if (!mounted) return null;

  return (
    <div className={styles.workshopContainer} style={{ background: isNight ? '#1A1105' : '#3E2A14', transition: 'background 4s ease' }}>
      
      {/* Ambient Effects */}
      {dustParticles.map(p => (
        <motion.div key={p.id} className={styles.dustParticle} style={{ width: p.size, height: p.size, left: `${p.x}vw`, top: `${p.y}vh` }} animate={{ y: [0, -50, 0], x: [0, Math.random() * 20 - 10, 0], opacity: [0, 0.4, 0] }} transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }} />
      ))}

      {rainDrops.map(r => (
        <motion.div key={r.id} className={styles.rainDrop} style={{ left: `${r.x}vw`, top: -50 }} animate={{ y: [0, 1200] }} transition={{ duration: r.duration, delay: r.delay, repeat: Infinity, ease: "linear" }} />
      ))}

      {/* Background Room Elements */}
      <div style={{ position: 'absolute', inset: 0, opacity: isClosingTime ? 0.3 : 1, transition: 'opacity 4s ease' }}>
        
        {/* Curtains */}
        <div className={`${styles.curtain} ${styles.curtainLeft}`} />
        <div className={`${styles.curtain} ${styles.curtainRight}`} />

        {/* Large Window */}
        <div className={styles.window}>
          <div className={styles.windowPane} />
          <div className={styles.windowPane} />
          <div className={styles.windowPane} />
        </div>

        {/* Maker Memories (Framed Log) */}
        <MakerMemories />

        {/* Wall Clock */}
        <div className={styles.wallClock}>
          <div className={styles.clockFace}>
            <motion.div className={`${styles.clockHand} ${styles.hourHand}`} animate={{ rotate: 360 }} transition={{ duration: 43200, repeat: Infinity, ease: 'linear' }} />
            <motion.div className={`${styles.clockHand} ${styles.minuteHand}`} animate={{ rotate: 360 }} transition={{ duration: 3600, repeat: Infinity, ease: 'linear' }} />
            <motion.div className={`${styles.clockHand} ${styles.secondHand}`} animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} />
          </div>
        </div>

        {/* Old Radio */}
        <div style={{ position: 'absolute', top: '20vh', right: '10vw', width: '120px', height: '80px', background: '#5C3D1D', borderRadius: '8px 8px 0 0', border: '4px solid #36220E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '80px', height: '40px', background: '#2A1A0B', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
            {Array.from({length: 15}).map((_, i) => (
              <div key={i} style={{ position: 'absolute', left: `${i * 6}px`, bottom: 0, width: '2px', height: '100%', background: '#111' }} />
            ))}
          </div>
          {/* Subtle Music Notes */}
          {!isClosingTime && Array.from({length: 3}).map((_, i) => (
            <motion.div key={i} className={styles.musicNote} style={{ left: '50px', top: '0px' }} animate={{ y: [0, -50], x: [0, Math.random() * 40 - 20], opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 1.5 }}>
              ♪
            </motion.div>
          ))}
        </div>

      </div>

      {/* Warm Lamp Glow */}
      <motion.div
        animate={{ opacity: isNight ? [0.6, 0.8, 0.6] : 0 }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', bottom: '0', left: '30vw', width: '40vw', height: '50vh', background: 'radial-gradient(ellipse at bottom, rgba(212,175,55,0.2) 0%, transparent 70%)', zIndex: 2, pointerEvents: 'none' }}
      />

      {/* Main Interactive Zones */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Area: Shelf & Printers */}
        <div style={{ height: '40vh', display: 'flex', justifyContent: 'space-between', padding: '0 5vw', paddingTop: '10vh' }}>
          <CompletionShelf isClosingTime={isClosingTime} />
          <Printers isClosingTime={isClosingTime} />
        </div>

        {/* Bottom Area: Workbench & Ezi & Cat */}
        <div style={{ height: '60vh', position: 'relative' }}>
          <Workbench isClosingTime={isClosingTime} />
          <EziApprentice isClosingTime={isClosingTime} />
          
        {/* Sleeping/Waking Cat */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          style={{ position: 'absolute', bottom: '25vh', left: '15vw', width: '60px', height: '40px', background: isNight ? '#1A1918' : '#D48A4A', borderRadius: '30px 30px 10px 10px', zIndex: 25, display: 'flex', justifyContent: 'center' }}
        >
          <div style={{ position: 'absolute', top: '-8px', left: '8px', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: `12px solid ${isNight ? '#1A1918' : '#D48A4A'}` }} />
          <div style={{ position: 'absolute', top: '-8px', right: '8px', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: `12px solid ${isNight ? '#1A1918' : '#D48A4A'}` }} />
          {isNight ? (
            <motion.div animate={{ scaleY: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%', background: '#1A1918', borderRadius: 'inherit' }}>
              <span style={{ position: 'absolute', top: '-20px', right: '-10px', fontSize: '0.8rem', color: '#555', fontFamily: 'Space Grotesk' }}>Zzz</span>
            </motion.div>
          ) : (
            <div style={{ position: 'absolute', top: '15px', display: 'flex', gap: '15px' }}>
              <div style={{ width: '6px', height: '6px', background: '#FFF', borderRadius: '50%' }}><div style={{ width: '2px', height: '4px', background: '#000', margin: '1px auto' }} /></div>
              <div style={{ width: '6px', height: '6px', background: '#FFF', borderRadius: '50%' }}><div style={{ width: '2px', height: '4px', background: '#000', margin: '1px auto' }} /></div>
            </div>
          )}
        </motion.div>

        {/* Potted Plant */}
        <div style={{ position: 'absolute', bottom: '10vh', right: '5vw', zIndex: 15, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Leaves */}
          <div style={{ position: 'relative', width: '80px', height: '100px' }}>
            <motion.div animate={{ rotate: [-2, 2, -2] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} style={{ position: 'absolute', bottom: 0, left: '20px', width: '30px', height: '60px', background: '#2E4C38', borderRadius: '50% 0 50% 0', transformOrigin: 'bottom left' }} />
            <motion.div animate={{ rotate: [2, -2, 2] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} style={{ position: 'absolute', bottom: 0, right: '20px', width: '40px', height: '80px', background: '#3A5C45', borderRadius: '0 50% 0 50%', transformOrigin: 'bottom right' }} />
            <motion.div animate={{ rotate: [-1, 1, -1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }} style={{ position: 'absolute', bottom: 0, left: '30px', width: '20px', height: '100px', background: '#446E52', borderRadius: '50%', transformOrigin: 'bottom center' }} />
          </div>
          {/* Pot */}
          <div style={{ width: '50px', height: '40px', background: '#A3603F', borderTop: '5px solid #8A5034', borderRadius: '0 0 10px 10px' }} />
        </div>

      </div>
    </div>

      {/* Dev Toggle */}
      <button
        onClick={toggleClosingTime}
        style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 100, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#F5EFE7', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Space Grotesk' }}
      >
        {isClosingTime ? 'Wake up Workshop' : 'Simulate Closing Time'}
      </button>

    </div>
  );
}
