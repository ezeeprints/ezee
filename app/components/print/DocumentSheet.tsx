'use client';

import React from 'react';
import styles from './print.module.css';

export type DocumentType = 'exam' | 'resume' | 'project' | 'lab' | 'general';

interface DocumentSheetProps {
  name: string;
  pageCount: number;
  docType: DocumentType;
  copies: number;
}

function detectDocType(name: string): DocumentType {
  const lower = name.toLowerCase();
  if (lower.includes('resume') || lower.includes('cv')) return 'resume';
  if (lower.includes('lab') || lower.includes('record') || lower.includes('experiment')) return 'lab';
  if (lower.includes('project') || lower.includes('report') || lower.includes('thesis')) return 'project';
  if (lower.includes('exam') || lower.includes('notes') || lower.includes('assignment') || lower.includes('study')) return 'exam';
  return 'general';
}

export { detectDocType };

export default function DocumentSheet({ name, pageCount, docType, copies }: DocumentSheetProps) {
  const stackDepth = Math.min(copies, 8);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
      {/* Paper stack layers behind (copies visual thickness) */}
      {Array.from({ length: Math.min(stackDepth - 1, 5) }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${(i + 1) * 3}px`,
            left: `${(i + 1) * -2}px`,
            right: `${(i + 1) * 2}px`,
            background: i % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
            height: '100%',
            boxShadow: `0 ${2 + i}px ${6 + i * 2}px rgba(42,41,40,${0.03 + i * 0.01})`,
            zIndex: i,
          }}
        />
      ))}

      {/* Main paper sheet */}
      <div className={styles.documentSheet} style={{ position: 'relative', zIndex: stackDepth }}>
        {/* Bookmark ribbon */}
        <div className={styles.bookmarkRibbon} />

        {/* Paper clip SVG */}
        <svg
          style={{ position: 'absolute', top: '-18px', left: '20px', width: '24px', height: '50px', transform: 'rotate(8deg)' }}
          viewBox="0 0 24 50"
        >
          <path
            d="M 12 42 L 12 12 Q 12 4 20 4 Q 28 4 28 20 L 28 46 Q 28 58 12 58 Q -4 58 -4 38 L -4 16"
            fill="none" stroke="#7A6D8C" strokeWidth="3" strokeLinecap="round"
          />
        </svg>

        {/* Handwritten sticky note label */}
        <div style={{
          position: 'absolute',
          top: '-12px',
          right: '50px',
          background: '#F4E04D',
          padding: '4px 10px',
          fontFamily: 'Instrument Sans, sans-serif',
          fontSize: '0.72rem',
          color: '#2A2928',
          transform: 'rotate(3deg)',
          boxShadow: '1px 2px 4px rgba(0,0,0,0.1)',
          zIndex: 20,
        }}>
          {docType === 'exam' ? 'Study hard! 📚' :
           docType === 'resume' ? 'Looking good ✨' :
           docType === 'lab' ? 'Science! 🧪' :
           docType === 'project' ? 'Ship it 🚀' : 'Ready to print'}
        </div>

        {/* Document name */}
        <h3 className={styles.docName}>{name}</h3>
        <p className={styles.docMeta}>{pageCount} pages • {copies > 1 ? `${copies} copies` : '1 copy'}</p>

        {/* Lined paper body */}
        <div className={styles.paperLines}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={styles.paperLine} />
          ))}
        </div>

        {/* Tiny page count dots on edge */}
        <div style={{
          position: 'absolute',
          right: '-8px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
        }}>
          {Array.from({ length: Math.min(Math.floor(pageCount / 10), 6) }).map((_, i) => (
            <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: i === 0 ? '#D48A70' : '#EAE4DD' }} />
          ))}
        </div>

        {/* Curled corner */}
        <div className={styles.curlCorner} />
      </div>

      {/* Desk context objects based on document type */}
      {docType === 'exam' && (
        <>
          {/* Highlighter */}
          <div style={{ position: 'absolute', bottom: '-20px', left: '-30px', width: '12px', height: '60px', borderRadius: '6px 6px 3px 3px', background: '#FFF176', border: '1px solid rgba(0,0,0,0.1)', transform: 'rotate(20deg)' }} />
          <div style={{ position: 'absolute', bottom: '-25px', left: '-10px', width: '12px', height: '55px', borderRadius: '6px 6px 3px 3px', background: '#B2EBF2', border: '1px solid rgba(0,0,0,0.1)', transform: 'rotate(10deg)' }} />
          {/* Calculator */}
          <div style={{ position: 'absolute', bottom: '-30px', right: '-40px', width: '40px', height: '55px', background: '#EAE4DD', border: '1.5px solid rgba(42,41,40,0.15)', borderRadius: '4px', transform: 'rotate(-8deg)', overflow: 'hidden' }}>
            <div style={{ background: '#2A2928', height: '14px', margin: '4px 4px 3px 4px', borderRadius: '2px' }} />
            {[0,1,2].map(row => (
              <div key={row} style={{ display: 'flex', gap: '2px', padding: '0 4px', marginBottom: '2px' }}>
                {[0,1,2].map(col => (
                  <div key={col} style={{ flex: 1, height: '7px', background: 'rgba(42,41,40,0.12)', borderRadius: '1px' }} />
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {docType === 'lab' && (
        <>
          {/* Ruler */}
          <div className={styles.deskRuler}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ width: '1px', height: i % 2 === 0 ? '10px' : '6px', background: 'rgba(42,41,40,0.3)' }} />
            ))}
          </div>
          {/* Notebook */}
          <div style={{ position: 'absolute', bottom: '-15px', left: '-50px', width: '50px', height: '65px', background: '#7A6D8C', borderRadius: '3px 0 0 3px', transform: 'rotate(-12deg)', boxShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ position: 'absolute', right: '0', top: '0', bottom: '0', width: '12px', background: '#FAF7F1', borderLeft: '1px solid rgba(42,41,40,0.1)' }} />
          </div>
        </>
      )}

      {docType === 'project' && (
        // Binding sample
        <div style={{ position: 'absolute', bottom: '-20px', right: '-50px', width: '45px', height: '60px', background: '#2A2928', borderRadius: '3px', transform: 'rotate(5deg)', boxShadow: '2px 4px 8px rgba(0,0,0,0.15)' }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{ position: 'absolute', left: '-8px', top: `${8 + i * 10}px`, width: '8px', height: '8px', borderRadius: '50%', background: '#A9B59D', border: '1.5px solid #2A2928' }} />
          ))}
          <div style={{ position: 'absolute', inset: '0 0 0 4px', background: '#FAF7F1', borderRadius: '0 2px 2px 0' }} />
        </div>
      )}

      {/* Cat sits on small stacks */}
      {copies <= 10 && copies > 1 && (
        <div style={{ position: 'absolute', bottom: `${stackDepth * 3 + 10}px`, right: '-15px', zIndex: 25 }}>
          <svg width="40" height="28" viewBox="0 0 60 40">
            <ellipse cx="30" cy="25" rx="18" ry="11" fill="#2A2928" />
            <circle cx="16" cy="25" r="9" fill="#2A2928" />
            <polygon points="8,17 16,17 12,8" fill="#2A2928" />
            <polygon points="16,17 24,17 20,8" fill="#2A2928" />
            <path d="M 44 26 Q 58 26 54 21" fill="none" stroke="#2A2928" strokeWidth="5" strokeLinecap="round" />
            {/* Closed sleeping eyes */}
            <path d="M 12 24 Q 14 22 16 24" stroke="#FAF7F1" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 17 24 Q 19 22 21 24" stroke="#FAF7F1" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </div>
  );
}
