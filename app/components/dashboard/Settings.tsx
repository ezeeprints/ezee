'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../student/student.module.css';
import { audio } from '../AudioEngine';

interface SettingsProps {
  onClose: () => void;
}

export default function Settings({ onClose }: SettingsProps) {
  const [studentInfo, setStudentInfo] = useState({
    name: 'Javeria Taj',
    usn: '1EZ23CS045',
    college: 'Ezee Institute of Technology',
    branch: 'Computer Science & Engineering',
    email: 'javeria.cs23@ezee.edu'
  });

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const drawerVariants = {
    initial: { opacity: 0, y: 100, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: 'spring' as const, bounce: 0.2 } },
    exit: { opacity: 0, y: 100, scale: 0.95, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      variants={drawerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={styles.paperModal} 
      style={{ 
        width: '650px', 
        maxWidth: '95vw', 
        padding: '3.5rem 3rem',
        background: '#D2BBA0', // Wood color
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        boxShadow: '0 30px 60px rgba(42, 41, 40, 0.3), inset 0 10px 20px rgba(255,255,255,0.2), inset 0 -10px 20px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        border: '4px solid #C4A786'
      }}
    >
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close Settings" style={{ background: 'transparent', border: 'none', fontSize: '2rem', color: '#2A2928', cursor: 'pointer', zIndex: 10 }}>×</button>
      
      <h2 style={{ fontFamily: 'Instrument Sans', fontSize: '2rem', color: '#2A2928', margin: '0 0 2rem 0', textShadow: '1px 1px 0 rgba(255,255,255,0.3)' }}>Top Drawer</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Physical ID Card Mockup */}
        <motion.div 
          whileHover={{ scale: 1.02, rotateZ: 1 }}
          style={{
            background: '#FAF7F1',
            borderRadius: '12px',
            padding: '2rem',
            position: 'relative',
            boxShadow: '2px 4px 15px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.5)',
            transform: 'rotate(-1deg)'
          }}
        >
          {/* Lanyard clip hole */}
          <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', width: '40px', height: '10px', background: '#D2BBA0', borderRadius: '5px', boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.3)' }} />

          <div className="mobile-col-1" style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginTop: '1rem' }}>
            {/* Photo Silhouette */}
            <div style={{
              width: '90px',
              height: '110px',
              border: '2px dashed rgba(42, 41, 40, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(42, 41, 40, 0.05)',
              fontSize: '2.5rem',
              color: 'rgba(42, 41, 40, 0.3)',
              borderRadius: '4px',
              flexShrink: 0
            }}>
              👩‍💻
            </div>

            <div style={{ flex: 1, fontFamily: 'Instrument Sans' }}>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.8rem', color: '#7A6D8C', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Student Name</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#2A2928', marginBottom: '0.8rem' }}>{studentInfo.name}</div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.75rem', color: '#7A6D8C', textTransform: 'uppercase' }}>USN Number</div>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#2A2928', fontFamily: 'Space Grotesk' }}>{studentInfo.usn}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.75rem', color: '#7A6D8C', textTransform: 'uppercase' }}>Department</div>
                  <div style={{ fontSize: '1rem', color: '#2A2928' }}>{studentInfo.branch}</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(42,41,40,0.1)', paddingTop: '1rem', fontSize: '0.95rem', color: '#7A6D8C', fontFamily: 'Instrument Sans', display: 'flex', justifyContent: 'space-between' }}>
            <span>🏫 {studentInfo.college}</span>
            <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.8rem', border: '1px solid #D48A70', color: '#D48A70', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>VALID 2026</span>
          </div>
        </motion.div>

        {/* Profile Settings Note */}
        <div style={{ background: '#FAF7F1', padding: '1.5rem', borderRadius: '4px', boxShadow: '1px 2px 5px rgba(0,0,0,0.1)', transform: 'rotate(1deg)' }}>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div key="edit" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Space Grotesk', fontSize: '0.85rem', color: '#7A6D8C', marginBottom: '0.3rem' }}>Update Name on ID</label>
                    <input 
                      type="text" 
                      value={studentInfo.name} 
                      onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                      style={{ width: '100%', padding: '0.8rem', border: 'none', borderBottom: '2px solid rgba(42,41,40,0.1)', background: 'transparent', outline: 'none', fontFamily: 'Instrument Sans', fontSize: '1.1rem' }}
                      autoFocus
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Space Grotesk', fontSize: '0.85rem', color: '#7A6D8C', marginBottom: '0.3rem' }}>Update USN</label>
                    <input 
                      type="text" 
                      value={studentInfo.usn} 
                      onChange={(e) => setStudentInfo({ ...studentInfo, usn: e.target.value })}
                      style={{ width: '100%', padding: '0.8rem', border: 'none', borderBottom: '2px solid rgba(42,41,40,0.1)', background: 'transparent', outline: 'none', fontFamily: 'Space Grotesk', fontSize: '1.1rem' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <button type="submit" style={{ padding: '0.8rem 1.5rem', background: '#2A2928', color: '#FAF7F1', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Instrument Sans' }}>Save Ink</button>
                    <button type="button" onClick={() => setIsEditing(false)} style={{ background: 'none', border: 'none', color: '#7A6D8C', cursor: 'pointer', fontFamily: 'Space Grotesk' }}>Cancel</button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <button 
                    type="button" 
                    onClick={() => setIsEditing(true)}
                    style={{
                      background: 'none',
                      border: '1px dashed #7A6D8C',
                      padding: '0.8rem 1.5rem',
                      color: '#7A6D8C',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontFamily: 'Space Grotesk',
                      fontSize: '0.9rem',
                      width: '100%',
                      textAlign: 'center',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(122,109,140,0.05)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'none'}
                  >
                    ✏️ Request ID Card Replacement
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Radio Switch (Ambient Settings) */}
        <div style={{ background: '#FAF7F1', padding: '1.5rem', borderRadius: '4px', boxShadow: '1px 2px 5px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '1rem', color: '#2A2928', margin: '0 0 0.2rem 0' }}>Room Radio Toggle</h4>
              <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.9rem', color: '#7A6D8C', margin: 0 }}>Lofi beats & rainfall</p>
            </div>
            
            {/* Tactile Switch */}
            <div 
              onClick={() => {
                const nextSound = !soundEnabled;
                setSoundEnabled(nextSound);
                audio.toggle(nextSound);
              }}
              style={{
                width: '60px',
                height: '32px',
                background: soundEnabled ? '#A9B59D' : '#EAE4DD',
                borderRadius: '16px',
                position: 'relative',
                cursor: 'pointer',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                transition: 'background 0.3s'
              }}
            >
              <motion.div 
                animate={{ x: soundEnabled ? 28 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{
                  width: '28px',
                  height: '28px',
                  background: '#FAF7F1',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
