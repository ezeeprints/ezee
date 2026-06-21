'use client';

import React, { useState } from 'react';
import styles from '../../student/student.module.css';

interface RemindersProps {
  onClose: () => void;
}

interface Reminder {
  id: string;
  text: string;
  due: string;
  color: string; // Hex color code from design palette
  rotation: string;
  type: 'pickup' | 'academic';
}

export default function Reminders({ onClose }: RemindersProps) {
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 'rem-1', text: 'Pick up Chemistry Lab Report 4 from Ezee Prints Counter!', due: 'Today before 6 PM', color: '#D48A70', rotation: '-3deg', type: 'pickup' },
    { id: 'rem-2', text: 'Calculus assignment submission deadline', due: 'Monday morning', color: '#A9B59D', rotation: '2deg', type: 'academic' },
    { id: 'rem-3', text: 'Prepare Physics print file (chapters 4-6)', due: 'Tuesday', color: '#EAE4DD', rotation: '-1deg', type: 'academic' }
  ]);

  const [newText, setNewText] = useState('');
  const [newType, setNewType] = useState<'pickup' | 'academic'>('academic');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const colors = ['#A9B59D', '#D48A70', '#EAE4DD', '#7A6D8C'];
    const selectedColor = newType === 'pickup' ? '#D48A70' : colors[Math.floor(Math.random() * colors.length)];
    const randomRot = `${(Math.random() * 6 - 3).toFixed(1)}deg`;

    const newReminder: Reminder = {
      id: `rem-${Date.now()}`,
      text: newText,
      due: newType === 'pickup' ? 'Today' : 'Upcoming',
      color: selectedColor,
      rotation: randomRot,
      type: newType
    };

    setReminders([...reminders, newReminder]);
    setNewText('');
  };

  const handleRemove = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <div className={styles.paperModal} style={{ width: '750px', maxWidth: '95vw', padding: '3.5rem 3rem' }}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close Reminders">×</button>
      
      {/* Wooden corkboard background decoration behind the sticky notes */}
      <div style={{
        position: 'absolute',
        inset: '1.5rem',
        border: '3px solid #FAF7F1',
        borderRadius: '6px',
        backgroundColor: '#f5eede',
        backgroundImage: 'radial-gradient(rgba(0,0,0,0.05) 1px, transparent 0)',
        backgroundSize: '16px 16px',
        boxShadow: 'inset 0 0 15px rgba(0,0,0,0.08)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      {/* Main Content container layered above corkboard */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '2px solid rgba(42, 41, 40, 0.15)', paddingBottom: '0.5rem' }}>
          <h2 style={{ fontFamily: 'Instrument Sans', fontSize: '2.2rem', color: '#2A2928', margin: 0, fontWeight: 'bold' }}>
            Board Reminders
          </h2>
          <span style={{ fontSize: '2rem' }}>📌</span>
        </div>

        {/* Sticky Notes Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem', minHeight: '220px', marginBottom: '2rem' }}>
          {reminders.map((reminder) => (
            <div 
              key={reminder.id}
              style={{
                backgroundColor: reminder.color,
                transform: `rotate(${reminder.rotation})`,
                color: reminder.color === '#7A6D8C' ? '#FAF7F1' : '#2A2928',
                padding: '1.25rem',
                borderRadius: '2px',
                boxShadow: '2px 8px 15px rgba(42, 41, 40, 0.12), inset 0 0 0 1px rgba(0,0,0,0.05)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
                cursor: 'default'
              }}
              className={styles.wiggle}
            >
              {/* Pushpin pin circle at the top */}
              <div style={{
                position: 'absolute',
                top: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#D48A70',
                border: '1px solid #FAF7F1',
                boxShadow: '0 2px 3px rgba(0,0,0,0.3)'
              }} />

              {/* Delete button (only show on hover via absolute position) */}
              <button 
                onClick={() => handleRemove(reminder.id)}
                style={{
                  position: 'absolute',
                  top: '0.4rem',
                  right: '0.4rem',
                  background: 'none',
                  border: 'none',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  color: 'inherit',
                  opacity: 0.6,
                  fontWeight: 'bold'
                }}
                title="Tear off"
              >
                ×
              </button>

              <div style={{ marginTop: '0.5rem' }}>
                <p style={{
                  fontFamily: 'Instrument Sans',
                  fontSize: '1rem',
                  lineHeight: '1.4',
                  margin: 0
                }}>
                  {reminder.text}
                </p>
              </div>

              <div style={{
                marginTop: '1.5rem',
                borderTop: `1px dashed ${reminder.color === '#7A6D8C' ? 'rgba(250, 247, 241, 0.3)' : 'rgba(42, 41, 40, 0.15)'}`,
                paddingTop: '0.5rem',
                fontFamily: 'Space Grotesk',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}>
                {reminder.due}
              </div>
            </div>
          ))}
        </div>

        {/* Add new sticky note form */}
        <form onSubmit={handleAdd} style={{
          background: '#FAF7F1',
          border: '1px solid rgba(42, 41, 40, 0.15)',
          padding: '1.2rem',
          borderRadius: '6px',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <input 
            type="text" 
            placeholder="Jot down a quick task..." 
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            style={{
              flex: 1,
              padding: '0.6rem 1rem',
              border: '1px solid rgba(42, 41, 40, 0.2)',
              outline: 'none',
              background: '#fff',
              fontFamily: 'Instrument Sans',
              borderRadius: '4px'
            }}
          />
          <select 
            value={newType}
            onChange={(e) => setNewType(e.target.value as 'pickup' | 'academic')}
            style={{
              padding: '0.6rem',
              border: '1px solid rgba(42, 41, 40, 0.2)',
              background: '#fff',
              fontFamily: 'Space Grotesk',
              borderRadius: '4px'
            }}
          >
            <option value="academic">Academic Task</option>
            <option value="pickup">Print Pick-up</option>
          </select>
          <button type="submit" className={styles.tactileBtn} style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
            Pin Note
          </button>
        </form>
      </div>

    </div>
  );
}
