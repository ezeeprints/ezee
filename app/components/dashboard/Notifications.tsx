'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../student/student.module.css';

interface NotificationsProps {
  onClose: () => void;
}

interface Letter {
  id: string;
  sender: string;
  date: string;
  subject: string;
  body: string;
  isRead: boolean;
  type: 'postcard' | 'letter';
  stampEmoji: string;
}

export default function Notifications({ onClose }: NotificationsProps) {
  const [activeLetterId, setActiveLetterId] = useState<string>('mail-1');

  const letters: Letter[] = [
    {
      id: 'mail-1',
      sender: 'Ezi Study Companion',
      date: '21 Jun 2026',
      subject: 'Welcome to your digital study room! ☕',
      body: 'Hello study companion! I am Ezi, your little ink spirit. I live here in this desk nook, and I will be helping you manage all your notes and prints. Try printing a PDF using the printer to see me work!',
      isRead: false,
      type: 'postcard',
      stampEmoji: '☕'
    },
    {
      id: 'mail-2',
      sender: 'Ezee Prints Office',
      date: '20 Jun 2026',
      subject: 'Your notes are ready for pickup! 📚',
      body: 'Chemistry Lab Report 4 is ready. Ezi carefully prepared it, and it is resting at the counter, waiting for you. Head over when you have a moment.',
      isRead: true,
      type: 'letter',
      stampEmoji: '📮'
    },
    {
      id: 'mail-3',
      sender: 'Study Club Rewards',
      date: '18 Jun 2026',
      subject: 'Special offer: 15% off exam notes 🎟️',
      body: 'Get ready for finals! Use code STUDYROOM15 to get 15% off your next printing job. Ezi has also hidden a sticker reward somewhere in the room—can you find it?',
      isRead: true,
      type: 'postcard',
      stampEmoji: '⭐'
    }
  ];

  const activeLetter = letters.find(l => l.id === activeLetterId) || letters[0];

  const variants = {
    initial: { opacity: 0, y: 30, rotateX: 10, scale: 0.95 },
    animate: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { duration: 0.6, type: 'spring' as const, bounce: 0.3 } },
    exit: { opacity: 0, y: 30, rotateX: -10, scale: 0.95, transition: { duration: 0.4 } }
  };

  const letterVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={styles.paperModal} 
      style={{ 
        width: '850px', 
        maxWidth: '95vw', 
        padding: '3rem',
        background: '#EAE4DD', // Mailbox color
        boxShadow: '0 25px 50px rgba(42, 41, 40, 0.15), inset 0 0 0 1px rgba(255,255,255,0.3)',
        borderRadius: '12px'
      }}
    >
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close Mailbox" style={{ background: 'transparent', border: 'none', fontSize: '2rem', color: '#7A6D8C', cursor: 'pointer' }}>×</button>
      
      {/* Tape on top */}
      <div style={{ position: 'absolute', top: '-15px', left: '15%', transform: 'rotate(-3deg)', width: '90px', height: '28px', background: 'rgba(212, 138, 112, 0.25)', border: '1px solid rgba(0,0,0,0.03)' }} />

      <h2 className={styles.modalHeader} style={{ marginBottom: '1.5rem', fontFamily: 'Instrument Sans', fontSize: '2rem', color: '#2A2928' }}>Mailbox</h2>

      <div style={{ display: 'flex', gap: '2rem', height: '400px' }}>
        
        {/* Left column: Envelope pile list */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '0.8rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
          <p style={{ fontFamily: 'Space Grotesk', fontSize: '0.85rem', color: '#7A6D8C', textTransform: 'uppercase', margin: '0 0 0.5rem 0' }}>
            Incoming ({letters.filter(l => !l.isRead).length} new)
          </p>
          {letters.map((letter, idx) => {
            const isActive = letter.id === activeLetterId;
            return (
              <motion.div 
                key={letter.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setActiveLetterId(letter.id)}
                whileHover={{ scale: 1.02 }}
                style={{
                  background: isActive ? '#fff' : '#FAF7F1',
                  border: isActive ? '2px solid #2A2928' : '1px solid rgba(42, 41, 40, 0.15)',
                  borderRadius: '6px',
                  padding: '1rem',
                  cursor: 'pointer',
                  position: 'relative',
                  transform: isActive ? 'scale(1.02) rotate(-1deg)' : 'rotate(0deg)',
                  boxShadow: isActive ? '4px 6px 12px rgba(42,41,40,0.08)' : 'none',
                  zIndex: isActive ? 10 : 1
                }}
              >
                {!letter.isRead && (
                  <span style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#D48A70' }} />
                )}
                <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.8rem', color: '#7A6D8C', marginBottom: '0.3rem' }}>{letter.date}</div>
                <h4 style={{ fontFamily: 'Instrument Sans', fontSize: '1rem', color: '#2A2928', margin: '0 0 0.2rem 0', fontWeight: 'bold' }}>{letter.sender}</h4>
                <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.9rem', color: '#7A6D8C', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {letter.subject}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Right column: Opened postcard or letter view */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeLetter.id}
            variants={letterVariants}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, x: 20 }}
            style={{ 
              flex: '1.4', 
              background: '#FAF7F1', // Postcard color
              border: '1px solid rgba(42, 41, 40, 0.1)', 
              borderRadius: '8px',
              padding: '2rem', 
              position: 'relative', 
              overflowY: 'auto', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between', 
              boxShadow: '2px 4px 15px rgba(0,0,0,0.05)',
              backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(42,41,40,0.02) 2px, transparent 2.5px)',
              backgroundSize: '40px 40px'
            }}
          >
            
            {/* Postcard postmark & stamp section (Top Right) */}
            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {/* Postmark circles */}
              <div style={{
                width: '40px',
                height: '40px',
                border: '1px dashed rgba(122, 109, 140, 0.4)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.6rem',
                color: 'rgba(122, 109, 140, 0.6)',
                fontFamily: 'Space Grotesk',
                transform: 'rotate(-15deg)',
                pointerEvents: 'none'
              }}>
                EZI
              </div>
              {/* Stamp block */}
              <div style={{
                width: '44px',
                height: '52px',
                border: '2px dashed #D48A70',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                borderRadius: '2px',
                transform: 'rotate(5deg)',
                boxShadow: '1px 1px 3px rgba(0,0,0,0.05)'
              }}>
                {activeLetter.stampEmoji}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.85rem', color: '#7A6D8C', marginBottom: '1.5rem' }}>
                From: <span style={{ color: '#2A2928', fontWeight: 'bold' }}>{activeLetter.sender}</span>
              </div>
              
              <h3 style={{ fontFamily: 'Instrument Sans', fontSize: '1.4rem', margin: '0 0 1.5rem 0', color: '#2A2928', borderBottom: '1px solid rgba(42, 41, 40, 0.08)', paddingBottom: '0.5rem' }}>
                {activeLetter.subject}
              </h3>

              <p style={{
                fontFamily: 'Instrument Sans',
                fontSize: '1.05rem',
                lineHeight: '1.6',
                color: '#2A2928',
                margin: 0,
                whiteSpace: 'pre-wrap'
              }}>
                {activeLetter.body}
              </p>
            </div>

            <div style={{ marginTop: '2rem', borderTop: '1px dashed rgba(42,41,40,0.1)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.8rem', color: '#7A6D8C' }}>Received: {activeLetter.date}</span>
              <span style={{ fontFamily: 'Instrument Sans', fontSize: '0.9rem', fontStyle: 'italic', color: '#D48A70' }}>Warmly, Ezee Team</span>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
