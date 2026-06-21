'use client';

import React from 'react';
import styles from '../../student/student.module.css';
import { audio } from '../AudioEngine';

interface WeatherUIProps {
  onClose: () => void;
  isNight: boolean;
  setRoomWeather: (preset: 'sunny' | 'rainy' | 'sunset' | 'midnight') => void;
}

export default function WeatherUI({ onClose, isNight, setRoomWeather }: WeatherUIProps) {
  
  const handleSelectPreset = (preset: 'sunny' | 'rainy' | 'sunset' | 'midnight') => {
    audio.playWeatherCycleSound(); // Play chime feedback
    setRoomWeather(preset);
  };

  return (
    <div className={styles.paperModal} style={{ width: '550px', maxWidth: '95vw', padding: '3.5rem 3rem' }}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close Weather Station">×</button>
      
      {/* Tape on top */}
      <div style={{ position: 'absolute', top: '-15px', left: '20%', transform: 'rotate(-2deg)', width: '80px', height: '26px', background: 'rgba(122, 109, 140, 0.3)', border: '1px solid rgba(0,0,0,0.03)' }} />

      <h2 className={styles.modalHeader}>Window Weather</h2>
      
      <p style={{ fontFamily: 'Instrument Sans', fontSize: '1.1rem', color: '#7A6D8C', marginBottom: '2rem' }}>
        Change the mood outside your study window. The room’s background soundscape and character will adapt.
      </p>

      {/* Preset Weather Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
        
        {/* Sunny Day Card */}
        <div 
          onClick={() => handleSelectPreset('sunny')}
          style={{
            background: '#FAF7F1',
            border: '2px solid #2A2928',
            borderRadius: '6px',
            padding: '1.2rem',
            cursor: 'pointer',
            textAlign: 'center',
            boxShadow: '2px 4px 0 #2A2928',
            transition: 'all 0.2s ease'
          }}
          className={styles.interactiveObject}
        >
          <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>☀️</span>
          <span style={{ fontFamily: 'Space Grotesk', fontWeight: 'bold', fontSize: '1rem', color: '#2A2928' }}>Sunny Morning</span>
          <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.8rem', color: '#7A6D8C', margin: '0.3rem 0 0 0' }}>Warm light, quiet breeze</p>
        </div>

        {/* Cozy Rain Card */}
        <div 
          onClick={() => handleSelectPreset('rainy')}
          style={{
            background: '#FAF7F1',
            border: '2px solid #2A2928',
            borderRadius: '6px',
            padding: '1.2rem',
            cursor: 'pointer',
            textAlign: 'center',
            boxShadow: '2px 4px 0 #2A2928',
            transition: 'all 0.2s ease'
          }}
          className={styles.interactiveObject}
        >
          <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>🌧️</span>
          <span style={{ fontFamily: 'Space Grotesk', fontWeight: 'bold', fontSize: '1rem', color: '#2A2928' }}>Cozy Rain</span>
          <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.8rem', color: '#7A6D8C', margin: '0.3rem 0 0 0' }}>Soft rain patter, study focus</p>
        </div>

        {/* Autumn Sunset Card */}
        <div 
          onClick={() => handleSelectPreset('sunset')}
          style={{
            background: '#FAF7F1',
            border: '2px solid #2A2928',
            borderRadius: '6px',
            padding: '1.2rem',
            cursor: 'pointer',
            textAlign: 'center',
            boxShadow: '2px 4px 0 #2A2928',
            transition: 'all 0.2s ease'
          }}
          className={styles.interactiveObject}
        >
          <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>🌇</span>
          <span style={{ fontFamily: 'Space Grotesk', fontWeight: 'bold', fontSize: '1rem', color: '#2A2928' }}>Autumn Sunset</span>
          <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.8rem', color: '#7A6D8C', margin: '0.3rem 0 0 0' }}>Golden shadows, warm crackle</p>
        </div>

        {/* Starry Late Night Card */}
        <div 
          onClick={() => handleSelectPreset('midnight')}
          style={{
            background: '#FAF7F1',
            border: '2px solid #2A2928',
            borderRadius: '6px',
            padding: '1.2rem',
            cursor: 'pointer',
            textAlign: 'center',
            boxShadow: '2px 4px 0 #2A2928',
            transition: 'all 0.2s ease'
          }}
          className={styles.interactiveObject}
        >
          <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>🌙</span>
          <span style={{ fontFamily: 'Space Grotesk', fontWeight: 'bold', fontSize: '1rem', color: '#2A2928' }}>Midnight Rain</span>
          <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.8rem', color: '#7A6D8C', margin: '0.3rem 0 0 0' }}>Pajamas, stars & rainstorms</p>
        </div>

      </div>

      <div style={{ textAlign: 'center', fontSize: '0.85rem', fontFamily: 'Instrument Sans', color: '#7A6D8C', borderTop: '1px dashed rgba(42,41,40,0.15)', paddingTop: '1rem' }}>
        Current state: {isNight ? '🌙 Night mode active' : '☀️ Day mode active'}
      </div>

    </div>
  );
}
