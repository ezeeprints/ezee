'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './graduation.module.css';

interface FinalLetterProps {
  onClose: () => void;
}

export default function FinalLetter({ onClose }: FinalLetterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        className={styles.finalLetterModal}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ type: 'spring', damping: 30, stiffness: 90 }}
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* ── Sealed envelope ── */
            <motion.div
              key="sealed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              style={{ position: 'relative', cursor: 'pointer' }}
              onClick={() => setIsOpen(true)}
            >
              {/* Envelope body */}
              <div style={{
                background: '#EAE4DD',
                borderRadius: '4px',
                padding: '0 0 2.5rem 0',
                position: 'relative',
                boxShadow: '0 30px 60px rgba(42,41,40,0.22)',
                overflow: 'hidden',
              }}>
                {/* Envelope V-flap top */}
                <svg
                  width="100%" height="100px" viewBox="0 0 440 100"
                  style={{ display: 'block', marginBottom: '-2px' }}
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D4C9BE" />
                      <stop offset="100%" stopColor="#C8BAB0" />
                    </linearGradient>
                  </defs>
                  <polygon points="0,0 440,0 220,100" fill="url(#flapGrad)" />
                  {/* Flap crease line */}
                  <line x1="0" y1="0" x2="220" y2="100" stroke="rgba(92,61,29,0.08)" strokeWidth="1" />
                  <line x1="440" y1="0" x2="220" y2="100" stroke="rgba(92,61,29,0.08)" strokeWidth="1" />
                </svg>

                {/* Wax seal */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  style={{
                    width: 56, height: 56,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 40% 40%, #E8A87C, #D48A70)',
                    border: '2px solid rgba(92,61,29,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0.5rem auto 1.5rem',
                    boxShadow: '0 4px 12px rgba(212,138,112,0.5)',
                    fontSize: '1.4rem',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  ✨
                </motion.div>

                {/* Address area */}
                <div style={{
                  padding: '0 2.5rem 1.5rem',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: 'Instrument Sans',
                    fontSize: '0.8rem',
                    color: 'rgba(92,61,29,0.5)',
                    fontStyle: 'italic',
                    marginBottom: '0.4rem',
                  }}>
                    For you.
                  </div>
                  <div style={{
                    fontFamily: 'Instrument Sans',
                    fontSize: '0.72rem',
                    color: 'rgba(42,41,40,0.28)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginTop: '1rem',
                  }}>
                    tap to open
                  </div>
                </div>

                {/* Envelope bottom V shape */}
                <svg
                  width="100%" height="60px" viewBox="0 0 440 60"
                  style={{ display: 'block', position: 'absolute', bottom: 0, left: 0 }}
                  preserveAspectRatio="none"
                >
                  <polygon points="0,0 440,0 220,60" fill="rgba(92,61,29,0.06)" />
                </svg>
              </div>
            </motion.div>
          ) : (
            /* ── Opened letter ── */
            <motion.div
              key="open"
              initial={{ opacity: 0, rotateX: -15, y: 10 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 80 }}
              style={{ perspective: '1000px' }}
            >
              {/* Open envelope shell */}
              <div style={{
                background: '#EAE4DD',
                borderRadius: '4px',
                padding: '0',
                boxShadow: '0 30px 60px rgba(42,41,40,0.22)',
                overflow: 'visible',
                position: 'relative',
              }}>
                {/* Open flap (rotated up) */}
                <motion.div
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: -175 }}
                  transition={{ delay: 0.15, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                  style={{
                    transformOrigin: 'top center',
                    transformStyle: 'preserve-3d',
                    position: 'relative',
                    zIndex: 10,
                  }}
                >
                  <svg
                    width="100%" height="100px" viewBox="0 0 440 100"
                    style={{ display: 'block' }}
                    preserveAspectRatio="none"
                  >
                    <polygon points="0,0 440,0 220,100" fill="#D4C9BE" />
                  </svg>
                </motion.div>

                {/* Letter paper emerging */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: -40, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                  style={{
                    background: '#FAF7F1',
                    margin: '0 1.5rem',
                    borderRadius: '2px',
                    padding: '3rem 2.5rem 3.5rem',
                    position: 'relative',
                    boxShadow: '0 8px 30px rgba(42,41,40,0.1)',
                    /* Ruled lines */
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 29px, rgba(42,41,40,0.06) 30px)',
                    backgroundSize: '100% 30px',
                  }}
                >
                  {/* Washi tape top */}
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '18px',
                    background: 'rgba(212,138,112,0.38)',
                    borderRadius: '2px',
                  }} />

                  {/* The message — nothing more */}
                  <div style={{ textAlign: 'center' }}>
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.7 }}
                      style={{
                        fontFamily: 'Instrument Sans',
                        fontSize: '1.5rem',
                        fontStyle: 'italic',
                        color: '#2A2928',
                        margin: '0 0 0.6rem',
                        lineHeight: 1.6,
                      }}
                    >
                      Take care.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1, duration: 0.7 }}
                      style={{
                        fontFamily: 'Instrument Sans',
                        fontSize: '1.5rem',
                        fontStyle: 'italic',
                        color: '#2A2928',
                        margin: '0 0 2rem',
                        lineHeight: 1.6,
                      }}
                    >
                      And good luck.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                      style={{ fontSize: '2rem' }}
                    >
                      ✨
                    </motion.div>
                  </div>
                </motion.div>

                {/* Envelope bottom */}
                <div style={{ height: '40px', background: '#EAE4DD', marginTop: '-40px' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Close */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close letter"
          style={{ position: 'fixed', top: '2rem', right: '2rem' }}
        >
          ×
        </button>
      </motion.div>
    </motion.div>
  );
}
