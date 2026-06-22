'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../admin/observatory.module.css';

import WorldBoard from './WorldBoard';
import OrderDesk from './OrderDesk';
import VendorWorkshops from './VendorWorkshops';
import WiseOwl from './WiseOwl';
import SupportBoard from './SupportBoard';
import { useObservatoryEnvironment } from './useObservatoryEnvironment';

type Zone = 'desk' | 'map' | 'bookshelf';

export default function ObservatoryRoom() {
  const [activeZone, setActiveZone] = useState<Zone>('map');
  const [mounted, setMounted] = useState(false);
  const { env, setSystemHealth } = useObservatoryEnvironment();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isNight = env.timeOfDay === 'night' || env.timeOfDay === 'sunset';
  const hasRain = env.weather === 'rain';

  // Ambient Particles
  const dustParticles = mounted ? Array.from({ length: 40 }).map((_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 3 + 1, duration: Math.random() * 10 + 10, delay: Math.random() * 5,
  })) : [];

  // Ambient Rain
  const rainDrops = mounted && hasRain ? Array.from({ length: 150 }).map((_, i) => ({
    id: `rain-${i}`, x: Math.random() * 100, delay: Math.random() * 2, duration: Math.random() * 0.5 + 0.5,
  })) : [];

  // Birds (only during the day)
  const birds = mounted && !isNight && env.weather !== 'rain' ? Array.from({ length: 5 }).map((_, i) => ({
    id: `bird-${i}`, startY: Math.random() * 30 + 10, delay: Math.random() * 20
  })) : [];

  const getZoneTransform = () => {
    switch (activeZone) {
      case 'desk': return 'translateX(0)';
      case 'map': return 'translateX(-100vw)';
      case 'bookshelf': return 'translateX(-200vw)';
      default: return 'translateX(-100vw)';
    }
  };

  if (!mounted) return null;

  return (
    <div className={styles.observatoryContainer} style={{ background: isNight ? '#1A1918' : '#2A2928', transition: 'background 4s ease' }}>
      
      {/* Night Sky / Stars */}
      <AnimatePresence>
        {isNight && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 4 }} style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div key={i} animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: Math.random() * 4 + 2, repeat: Infinity }} style={{ position: 'absolute', left: `${Math.random() * 100}vw`, top: `${Math.random() * 50}vh`, width: '2px', height: '2px', background: '#FFF', borderRadius: '50%' }} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Effects */}
      {dustParticles.map(p => (
        <motion.div key={p.id} className={styles.dustParticle} style={{ width: p.size, height: p.size, left: `${p.x}vw`, top: `${p.y}vh` }} animate={{ y: [0, -50, 0], x: [0, Math.random() * 20 - 10, 0], opacity: [0, 0.5, 0] }} transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }} />
      ))}

      {rainDrops.map(r => (
        <motion.div key={r.id} className={styles.rainDrop} style={{ left: `${r.x}vw`, top: -50 }} animate={{ y: [0, 1200] }} transition={{ duration: r.duration, delay: r.delay, repeat: Infinity, ease: "linear" }} />
      ))}

      {birds.map(b => (
        <motion.div key={b.id} style={{ position: 'absolute', top: `${b.startY}vh`, left: '-5vw', fontSize: '0.8rem', zIndex: 5 }} animate={{ x: ['-5vw', '105vw'], y: [0, Math.random() * -50 + 20, 0] }} transition={{ duration: 15, delay: b.delay, repeat: Infinity, ease: "linear" }}>
          v
        </motion.div>
      ))}

      {/* Curtains */}
      <div className={`${styles.curtain} ${styles.curtainLeft}`} />
      <div className={`${styles.curtain} ${styles.curtainRight}`} />

      {/* Desk Lamp Glow (Ambient) */}
      <motion.div
        animate={{ opacity: isNight ? [0.4, 0.6, 0.4] : 0 }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', bottom: 0, left: '20vw', width: '60vw', height: '50vh', background: 'radial-gradient(ellipse at bottom, rgba(212,175,55,0.15) 0%, transparent 70%)', zIndex: 2, pointerEvents: 'none' }}
      />

      {/* Panning Container */}
      <div className={styles.zoneContainer} style={{ transform: getZoneTransform() }}>
        
        {/* Zone 1: The Desk (Orders & Support) */}
        <div className={styles.zone} style={{ position: 'relative' }}>
          <OrderDesk />
          <div style={{ position: 'absolute', top: '15vh', right: '5vw' }}>
            <SupportBoard />
          </div>
          
          {/* Coffee Mug & Steam */}
          <div style={{ position: 'absolute', bottom: '25vh', left: '15vw', width: '40px', height: '50px', background: '#3D3A38', borderRadius: '4px', border: '2px solid #2A2928', zIndex: 25 }}>
            <motion.div animate={{ y: [-10, -40], opacity: [0, 0.5, 0], x: [0, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ position: 'absolute', top: '-10px', left: '10px', width: '20px', height: '20px', background: 'rgba(255,255,255,0.2)', filter: 'blur(5px)', borderRadius: '50%' }} />
          </div>

          {/* Desk Lamp */}
          <div style={{ position: 'absolute', bottom: '30vh', left: '8vw', width: '80px', height: '20px', background: '#D4AF37', borderRadius: '40px 40px 0 0', zIndex: 25, boxShadow: isNight ? '0 -10px 40px rgba(212,175,55,0.6)' : 'none' }}>
            <div style={{ position: 'absolute', bottom: '-40px', left: '35px', width: '10px', height: '40px', background: '#5C3D1D' }} />
          </div>
        </div>

        {/* Zone 2: The Map / Workshops (World Board) */}
        <div className={styles.zone} style={{ flexDirection: 'column', gap: '2rem' }}>
          {/* Large Window Frame wrapping the World Board conceptually */}
          <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '10px solid #36220E', boxShadow: 'inset 0 20px 50px rgba(0,0,0,0.8)' }}>
            <WorldBoard />
          </div>
          <div style={{ transform: 'scale(0.8)', marginTop: '-15vh', zIndex: 10 }}>
            <VendorWorkshops />
          </div>
        </div>

        {/* Zone 3: The Bookshelf (AI / Archives) & Cat & Filing Cabinet */}
        <div className={styles.zone} style={{ position: 'relative' }}>
          
          {/* Filing Cabinet */}
          <div style={{ position: 'absolute', bottom: '10vh', right: '15vw', width: '120px', height: '180px', background: '#3D3A38', border: '2px solid #2A2928', borderRadius: '4px', zIndex: 5, display: 'flex', flexDirection: 'column', gap: '5px', padding: '10px' }}>
            <div style={{ width: '100%', height: '50px', background: '#2A2928', borderRadius: '2px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', width: '30px', height: '10px', background: '#D4AF37', borderRadius: '2px' }} />
            </div>
            <div style={{ width: '100%', height: '50px', background: '#2A2928', borderRadius: '2px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', width: '30px', height: '10px', background: '#D4AF37', borderRadius: '2px' }} />
            </div>
            <div style={{ width: '100%', height: '50px', background: '#2A2928', borderRadius: '2px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', width: '30px', height: '10px', background: '#D4AF37', borderRadius: '2px' }} />
            </div>
            <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', background: '#F5EFE7', padding: '2px 8px', fontSize: '0.6rem', fontFamily: 'Space Grotesk', borderRadius: '2px 2px 0 0', color: '#2A2928' }}>
              PAST YEARS
            </div>
          </div>

          <WiseOwl />
          
          {/* The Cat */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            style={{ position: 'absolute', bottom: '10vh', left: '20vw', width: '80px', height: '50px', background: isNight ? '#2A2928' : '#D48A4A', borderRadius: '40px 40px 10px 10px', zIndex: 30, display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
          >
            {/* Ears */}
            <div style={{ position: 'absolute', top: '-10px', left: '10px', borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: `15px solid ${isNight ? '#2A2928' : '#D48A4A'}` }} />
            <div style={{ position: 'absolute', top: '-10px', right: '10px', borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: `15px solid ${isNight ? '#2A2928' : '#D48A4A'}` }} />
            
            {/* Breathing Animation for Sleeping Cat */}
            {isNight && (
              <motion.div animate={{ scaleY: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ position: 'absolute', bottom: '0', width: '100%', height: '100%', background: '#2A2928', borderRadius: 'inherit' }}>
                <span style={{ position: 'absolute', top: '-20px', right: '-10px', fontSize: '0.8rem', color: '#555', fontFamily: 'Space Grotesk' }}>Zzz</span>
              </motion.div>
            )}
            {!isNight && (
              <div style={{ position: 'absolute', top: '15px', display: 'flex', gap: '20px' }}>
                <div style={{ width: '8px', height: '8px', background: '#FFF', borderRadius: '50%' }}><div style={{ width: '2px', height: '6px', background: '#000', margin: '1px auto' }} /></div>
                <div style={{ width: '8px', height: '8px', background: '#FFF', borderRadius: '50%' }}><div style={{ width: '2px', height: '6px', background: '#000', margin: '1px auto' }} /></div>
              </div>
            )}
          </motion.div>
        </div>

      </div>

      {/* Navigation UI */}
      <div className={styles.roomNav}>
        <button className={`${styles.navButton} ${activeZone === 'desk' ? styles.active : ''}`} onClick={() => setActiveZone('desk')}>
          The Desk
        </button>
        <button className={`${styles.navButton} ${activeZone === 'map' ? styles.active : ''}`} onClick={() => setActiveZone('map')}>
          World Board
        </button>
        <button className={`${styles.navButton} ${activeZone === 'bookshelf' ? styles.active : ''}`} onClick={() => setActiveZone('bookshelf')}>
          Archives
        </button>
      </div>

      {/* Environment Dev Toggle */}
      <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 100, display: 'flex', gap: '1rem' }}>
        <button onClick={() => setSystemHealth(env.systemHealth === 'peaceful' ? 'stressed' : 'peaceful')} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Space Grotesk' }}>
          Toggle Stress: {env.systemHealth}
        </button>
        <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', padding: '0.5rem 1rem', borderRadius: '4px', fontFamily: 'Space Grotesk', fontSize: '0.8rem' }}>
          Time: {env.timeOfDay} | Season: {env.season}
        </div>
      </div>

      {/* Wall Clock */}
      <div className={styles.wallClock}>
        <div className={styles.clockFace}>
          <motion.div className={`${styles.clockHand} ${styles.hourHand}`} animate={{ rotate: 360 }} transition={{ duration: 43200, repeat: Infinity, ease: 'linear' }} />
          <motion.div className={`${styles.clockHand} ${styles.minuteHand}`} animate={{ rotate: 360 }} transition={{ duration: 3600, repeat: Infinity, ease: 'linear' }} />
          <motion.div className={`${styles.clockHand} ${styles.secondHand}`} animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} />
        </div>
      </div>

    </div>
  );
}
