'use client';

import React, { useState } from 'react';
import styles from '../../student/student.module.css';

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

  return (
    <div className={styles.paperModal} style={{ width: '600px', maxWidth: '95vw', padding: '3.5rem 3rem' }}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close Settings">×</button>
      
      {/* Tape decoration */}
      <div style={{ position: 'absolute', top: '-15px', right: '10%', transform: 'rotate(5deg)', width: '80px', height: '26px', background: 'rgba(169, 181, 157, 0.4)', border: '1px solid rgba(0,0,0,0.03)' }} />

      <h2 className={styles.modalHeader}>Drawer Organizer</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Profile details / Student ID card card mock */}
        <div style={{
          background: '#FAF7F1',
          border: '2px solid #2A2928',
          borderRadius: '8px',
          padding: '1.5rem',
          position: 'relative',
          boxShadow: '4px 4px 0 #2A2928',
          transform: 'rotate(-1deg)'
        }}>
          <span style={{
            position: 'absolute',
            top: '0.8rem',
            right: '1rem',
            fontFamily: 'Space Grotesk',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: '#D48A70',
            border: '1px solid #D48A70',
            padding: '0.15rem 0.4rem',
            borderRadius: '4px'
          }}>
            STUDENT CARD
          </span>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {/* Draw a physical outline silhouette for photo */}
            <div style={{
              width: '75px',
              height: '90px',
              border: '2px dashed rgba(42, 41, 40, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(42, 41, 40, 0.02)',
              fontSize: '2rem',
              color: 'rgba(42, 41, 40, 0.2)'
            }}>
              👩‍💻
            </div>

            <div style={{ flex: 1, fontFamily: 'Instrument Sans' }}>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.8rem', color: '#7A6D8C', textTransform: 'uppercase' }}>Student Name</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2A2928', marginBottom: '0.5rem' }}>{studentInfo.name}</div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <div>
                  <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.75rem', color: '#7A6D8C', textTransform: 'uppercase' }}>USN Number</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#2A2928', fontFamily: 'Space Grotesk' }}>{studentInfo.usn}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.75rem', color: '#7A6D8C', textTransform: 'uppercase' }}>Department</div>
                  <div style={{ fontSize: '0.95rem', color: '#2A2928' }}>{studentInfo.branch}</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1rem', borderTop: '1px dotted rgba(42,41,40,0.15)', paddingTop: '0.8rem', fontSize: '0.9rem', color: '#7A6D8C', fontFamily: 'Instrument Sans' }}>
            🏫 {studentInfo.college}
          </div>
        </div>

        {/* Profile Settings form */}
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'Space Grotesk', fontSize: '0.85rem', color: '#7A6D8C', marginBottom: '0.3rem' }}>STUDENT NAME</label>
                <input 
                  type="text" 
                  value={studentInfo.name} 
                  onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', border: '1px solid #2A2928', background: '#fff', outline: 'none', borderRadius: '4px', fontFamily: 'Instrument Sans' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'Space Grotesk', fontSize: '0.85rem', color: '#7A6D8C', marginBottom: '0.3rem' }}>USN NUMBER</label>
                <input 
                  type="text" 
                  value={studentInfo.usn} 
                  onChange={(e) => setStudentInfo({ ...studentInfo, usn: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', border: '1px solid #2A2928', background: '#fff', outline: 'none', borderRadius: '4px', fontFamily: 'Space Grotesk' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className={styles.tactileBtn} style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem' }}>Save Details</button>
                <button type="button" onClick={() => setIsEditing(false)} style={{ background: 'none', border: 'none', color: '#7A6D8C', cursor: 'pointer', fontFamily: 'Space Grotesk' }}>Cancel</button>
              </div>
            </div>
          ) : (
            <button 
              type="button" 
              onClick={() => setIsEditing(true)}
              style={{
                background: 'none',
                border: '1px dashed #7A6D8C',
                padding: '0.6rem 1rem',
                color: '#7A6D8C',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'Space Grotesk',
                fontSize: '0.9rem',
                width: 'fit-content'
              }}
            >
              📝 Edit Student Details / USN
            </button>
          )}
        </form>

        {/* Ambient Settings */}
        <div style={{ borderTop: '2px dashed rgba(42, 41, 40, 0.2)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '1rem', color: '#2A2928', margin: '0 0 0.2rem 0' }}>Ambient Sounds</h4>
            <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.85rem', color: '#7A6D8C', margin: 0 }}>Play natural background rainfall & feedback sounds</p>
          </div>
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            style={{
              padding: '0.5rem 1.2rem',
              background: soundEnabled ? '#A9B59D' : '#7A6D8C',
              color: '#FAF7F1',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'Space Grotesk',
              fontWeight: 'bold',
              transition: 'background-color 0.2s ease'
            }}
          >
            {soundEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

      </div>
    </div>
  );
}
