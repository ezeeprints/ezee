'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useMemorySystem } from '../print/useMemorySystem';

interface ProgressUIProps {
  onClose: () => void;
}

interface ScrapbookMemory {
  id: string;
  icon: string;
  title: string;
  caption: string;
  dateNote: string;
  rotation: number;
  bgColor: string;
  unlocked: boolean;
}

function buildMemories(memory: ReturnType<typeof useMemorySystem>['memory']): ScrapbookMemory[] {
  const hour = new Date().getHours();
  const isLate = hour >= 22 || hour <= 5;

  return [
    {
      id: 'mem-study',
      icon: '📚',
      title: 'Study Sessions',
      caption: 'The nights blur together after a while. But the stack of notes stays.',
      dateNote: `${memory.visits} visits`,
      rotation: -2,
      bgColor: '#EAE4DD',
      unlocked: memory.visits >= 2,
    },
    {
      id: 'mem-latenight',
      icon: '☕',
      title: 'Countless Late Nights',
      caption: 'Lamp on. Coffee cold. Books open. A quiet kind of alive.',
      dateNote: 'Late night sessions',
      rotation: 1.5,
      bgColor: '#FAF7F1',
      unlocked: memory.isLateNight || isLate || memory.coffeeMugs >= 1,
    },
    {
      id: 'mem-print',
      icon: '🖨️',
      title: 'Printed & Sent',
      caption: `${memory.orders > 0 ? `${memory.orders} order${memory.orders > 1 ? 's' : ''}` : 'Every page'} — each one a deadline met, a worry sent away.`,
      dateNote: `${memory.totalPrintedPages} pages total`,
      rotation: -1,
      bgColor: '#E8E0D4',
      unlocked: memory.orders >= 1,
    },
    {
      id: 'mem-exam',
      icon: '✨',
      title: 'Placement Season',
      caption: 'The desk gets messier. The focus gets sharper. Something is at stake.',
      dateNote: 'Exam season',
      rotation: 2.5,
      bgColor: '#EAE4DD',
      unlocked: memory.isExamSeason,
    },
    {
      id: 'mem-festival',
      icon: '🌧',
      title: 'Monsoon Memories',
      caption: 'The rain came and everything felt slower. In a good way. Like time agreed.',
      dateNote: 'Festival season',
      rotation: -1.5,
      bgColor: '#FAF7F1',
      unlocked: memory.isFestival,
    },
    {
      id: 'mem-plant',
      icon: '🌿',
      title: 'The Plant Grew',
      caption: 'It started small. Now it leans toward the window. It likes it here too.',
      dateNote: `Stage ${memory.plantStage} of 3`,
      rotation: 1,
      bgColor: '#E8E0D4',
      unlocked: memory.plantStage >= 2,
    },
    {
      id: 'mem-graduation',
      icon: '🎓',
      title: 'Graduation Chapter',
      caption: 'The last print order. The last late night. The beginning of a different kind of missing.',
      dateNote: 'Someday',
      rotation: -2.5,
      bgColor: '#EAE4DD',
      unlocked: memory.orders >= 10,
    },
  ];
}

export default function ProgressUI({ onClose }: ProgressUIProps) {
  const { memory } = useMemorySystem();
  const memories = useMemo(() => buildMemories(memory), [memory]);
  const unlocked = memories.filter(m => m.unlocked);
  const locked = memories.filter(m => !m.unlocked);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 20 }}
      transition={{ type: 'spring', damping: 28, stiffness: 100 }}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        background: 'rgba(42, 41, 40, 0.25)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        style={{
          background: '#F5EFE7',
          borderRadius: '8px',
          width: '680px',
          maxWidth: '95vw',
          maxHeight: '85vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 30px 60px rgba(42,41,40,0.18)',
          scrollbarWidth: 'none',
        }}
      >
        {/* Scrapbook header — spiral binding */}
        <div style={{
          background: '#8B5A2B',
          height: '22px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '20px',
          gap: '28px',
          borderRadius: '8px 8px 0 0',
        }}>
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} style={{
              width: '14px', height: '14px', borderRadius: '50%',
              background: '#FAF7F1', border: '2px solid #5C3D1D',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)',
            }} />
          ))}
        </div>

        <div style={{ padding: '2.5rem 3rem' }}>
          {/* Close */}
          <button
            onClick={onClose}
            style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', fontSize: '1.5rem', color: 'rgba(42,41,40,0.3)', cursor: 'pointer', lineHeight: 1 }}
            aria-label="Close scrapbook"
          >×</button>

          {/* Title */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.72rem', color: 'rgba(42,41,40,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
              A Quiet Scrapbook
            </div>
            <h2 style={{ fontFamily: 'Instrument Sans', fontSize: '2rem', color: '#2A2928', margin: 0, fontWeight: 400 }}>
              Memories
            </h2>
            <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.9rem', color: 'rgba(42,41,40,0.5)', margin: '0.4rem 0 0 0', fontStyle: 'italic' }}>
              Not every moment is a milestone. But they add up.
            </p>
          </div>

          {/* Unlocked memories */}
          {unlocked.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}>
              {unlocked.map((mem, idx) => (
                <motion.div
                  key={mem.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  style={{
                    background: mem.bgColor,
                    borderRadius: '3px',
                    padding: '1.4rem 1.2rem',
                    transform: `rotate(${mem.rotation}deg)`,
                    boxShadow: '2px 5px 16px rgba(42,41,40,0.1)',
                    position: 'relative',
                    border: '1px solid rgba(42,41,40,0.06)',
                  }}
                >
                  {/* Tape strip on top */}
                  <div style={{
                    position: 'absolute', top: '-8px', left: '50%',
                    transform: 'translateX(-50%)',
                    width: '50px', height: '16px',
                    background: 'rgba(212,138,112,0.35)',
                    borderRadius: '2px',
                  }} />

                  <div style={{ fontSize: '1.8rem', marginBottom: '0.8rem' }}>{mem.icon}</div>
                  <div style={{ fontFamily: 'Instrument Sans', fontWeight: 'bold', fontSize: '1rem', color: '#2A2928', marginBottom: '0.5rem' }}>
                    {mem.title}
                  </div>
                  <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.85rem', color: 'rgba(42,41,40,0.65)', margin: '0 0 0.8rem 0', lineHeight: 1.5, fontStyle: 'italic' }}>
                    {mem.caption}
                  </p>
                  <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.7rem', color: 'rgba(42,41,40,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {mem.dateNote}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty state — always alive */}
          {unlocked.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              fontFamily: 'Instrument Sans',
              color: 'rgba(42,41,40,0.4)',
              fontStyle: 'italic',
              fontSize: '1rem',
              lineHeight: 1.8,
            }}>
              The scrapbook is empty for now.<br />
              The memories will come.
            </div>
          )}

          {/* Still ahead — locked memories, shown softly */}
          {locked.length > 0 && (
            <div style={{ borderTop: '1px dashed rgba(42,41,40,0.12)', paddingTop: '1.5rem' }}>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.7rem', color: 'rgba(42,41,40,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
                Still ahead
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                {locked.map(mem => (
                  <div key={mem.id} style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(42,41,40,0.04)',
                    border: '1px dashed rgba(42,41,40,0.1)',
                    borderRadius: '20px',
                    fontFamily: 'Space Grotesk',
                    fontSize: '0.8rem',
                    color: 'rgba(42,41,40,0.3)',
                  }}>
                    {mem.icon} {mem.title}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quiet link to The Last Night — always connected */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            style={{
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px dashed rgba(42,41,40,0.08)',
              textAlign: 'center',
            }}
          >
            <Link
              href="/graduation"
              style={{
                fontFamily: 'Instrument Sans',
                fontSize: '0.82rem',
                color: 'rgba(42,41,40,0.3)',
                fontStyle: 'italic',
                textDecoration: 'none',
                transition: 'color 0.3s',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(42,41,40,0.65)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(42,41,40,0.3)'; }}
            >
              Something quiet waits at the end. (Graduation Chapter)
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
