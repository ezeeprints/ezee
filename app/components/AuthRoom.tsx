'use client';

import React from 'react';
import styles from '../auth/auth.module.css';

interface AuthRoomProps {
  state: 'login' | 'signup' | 'otp' | 'forgot' | 'loading' | 'success' | 'error';
  passwordVisible?: boolean;
  weather: 'day' | 'sunset' | 'rain';
  setWeather: (w: 'day' | 'sunset' | 'rain') => void;
  leaves: { id: number; left: number; rotation: number }[];
  onPlantClick: () => void;
  steamBoost: boolean;
  onMugClick: () => void;
  isMuted: boolean;
  onRadioClick: () => void;
}

export default function AuthRoom({
  state,
  passwordVisible,
  weather,
  setWeather,
  leaves,
  onPlantClick,
  steamBoost,
  onMugClick,
  isMuted,
  onRadioClick
}: AuthRoomProps) {
  const isNight = state === 'forgot' || weather === 'rain';
  const isRain = state === 'forgot' || weather === 'rain';
  const isSunset = weather === 'sunset' && state !== 'forgot';
  const lampOn = passwordVisible || isNight;

  // Cycle weather on window click
  const handleWindowClick = () => {
    const nextWeather = weather === 'day' ? 'sunset' : weather === 'sunset' ? 'rain' : 'day';
    setWeather(nextWeather);
  };

  return (
    <>
      {/* Window */}
      <div 
        className={`${styles.window} ${styles.interactiveWindow} ${
          isSunset ? styles.windowSunset : isNight ? styles.windowRain : ''
        }`}
        onClick={handleWindowClick}
        title="Click to cycle weather (Day ☀️ -> Sunset 🌅 -> Rain 🌧️)"
      >
        {/* Curtains */}
        <div className={`${styles.curtain} ${styles.curtainLeft}`} />
        <div className={`${styles.curtain} ${styles.curtainRight}`} />
        
        {/* Weather / Outside effects */}
        {isNight && (
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
            {/* Moon */}
            <circle cx="200" cy="50" r="30" fill="#EAE4DD" opacity="0.8" />
            {/* Stars */}
            <circle cx="50" cy="80" r="1.5" fill="#fff" opacity="0.6" />
            <circle cx="120" cy="40" r="2" fill="#fff" opacity="0.8" />
            <circle cx="80" cy="150" r="1" fill="#fff" opacity="0.5" />
            <circle cx="180" cy="120" r="1.5" fill="#fff" opacity="0.7" />
            <circle cx="150" cy="200" r="2" fill="#fff" opacity="0.4" />
          </svg>
        )}
        
        {isRain && (
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
             {/* Raindrops overlay */}
             <line x1="20" y1="0" x2="10" y2="350" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="10 30" />
             <line x1="80" y1="-20" x2="60" y2="350" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="15 40" />
             <line x1="150" y1="10" x2="130" y2="350" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="5 20" />
             <line x1="220" y1="-50" x2="200" y2="350" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeDasharray="20 50" />
          </svg>
        )}

        {isSunset && (
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
            {/* Sunset Sun */}
            <circle cx="180" cy="120" r="25" fill="#FAF7F1" opacity="0.8" />
            {/* Soft pink clouds */}
            <path d="M 30 140 Q 55 125 75 140 Q 95 130 115 145" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="8" strokeLinecap="round" />
          </svg>
        )}

        {/* Clouds (Daytime) */}
        {!isNight && !isSunset && (
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, animation: 'float 20s linear infinite' }}>
            <path d="M 50 100 Q 70 80 90 100 Q 110 90 130 110 Q 120 130 90 120 Q 60 130 50 100 Z" fill="rgba(255,255,255,0.6)" />
            <path d="M 150 150 Q 165 135 180 150 Q 195 145 210 155 Q 200 170 180 165 Q 160 170 150 150 Z" fill="rgba(255,255,255,0.4)" />
          </svg>
        )}
      </div>

      {/* Desk */}
      <div className={styles.desk}>
        {/* Books */}
        <div style={{ position: 'absolute', bottom: '20px', left: '10%', width: '80px', height: '100px', zIndex: 10 }}>
          <svg width="100%" height="100%">
             <rect x="10" y="80" width="60" height="15" fill="#7A6D8C" rx="2" />
             <rect x="15" y="60" width="50" height="20" fill="#D48A70" rx="2" />
             <rect x="12" y="45" width="55" height="15" fill="#A9B59D" rx="2" />
             {/* Sticky note */}
             <rect x="30" y="40" width="15" height="20" fill="#F4D03F" transform="rotate(-5 30 40)" />
          </svg>
        </div>

        {/* Printer */}
        <div style={{ position: 'absolute', bottom: '20px', right: '10%', width: '120px', height: '80px', zIndex: 10 }}>
          <svg width="100%" height="100%">
            <rect x="10" y="30" width="100" height="50" fill="#EAE4DD" rx="5" />
            <rect x="20" y="10" width="80" height="20" fill="#FAF7F1" />
            <rect x="20" y="70" width="80" height="10" fill="#FAF7F1" />
            {/* Blinking light */}
            <circle cx="95" cy="45" r="3" fill="#A9B59D" className={state === 'loading' ? styles.blinkingLight : ''} style={{ animation: state === 'loading' ? 'blink 1s infinite' : 'none' }} />
            
            {/* Printing paper for success state */}
            {state === 'success' && (
              <g style={{ animation: 'float 3s ease-out forwards' }}>
                <rect x="30" y="80" width="60" height="40" fill="#fff" rx="1" />
                <line x1="35" y1="85" x2="85" y2="85" stroke="#2A2928" strokeWidth="2" strokeDasharray="5 2" />
                <line x1="35" y1="95" x2="75" y2="95" stroke="#2A2928" strokeWidth="2" />
                <line x1="35" y1="105" x2="80" y2="105" stroke="#2A2928" strokeWidth="2" />
              </g>
            )}
          </svg>
        </div>

        {/* Coffee Mug with steam */}
        <div 
          className={styles.mug}
          style={{ position: 'absolute', bottom: '20px', left: '20%', width: '40px', height: '50px', zIndex: 12 }}
          onClick={onMugClick}
          title="Click to sip coffee!"
        >
          <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
            <path d="M 10 20 L 10 40 Q 10 50 20 50 L 30 50 Q 40 50 40 40 L 40 20 Z" fill="#EAE4DD" />
            <path d="M 40 25 Q 50 25 50 35 Q 50 45 40 45" fill="none" stroke="#EAE4DD" strokeWidth="4" />
            <ellipse cx="25" cy="20" rx="15" ry="5" fill="#2A2928" />
            
            {/* Steam */}
            {state !== 'error' && (
              <g style={{ opacity: steamBoost ? 0.95 : 0.55, transition: 'opacity 0.3s' }}>
                <path 
                  d="M 20 15 Q 15 5 25 -5" 
                  fill="none" 
                  stroke="#FAF7F1" 
                  strokeWidth={steamBoost ? 3 : 2} 
                  strokeLinecap="round" 
                  style={{ animation: `rise ${steamBoost ? '1.5s' : '3s'} infinite ease-in` }} 
                />
                <path 
                  d="M 30 15 Q 35 5 25 -5" 
                  fill="none" 
                  stroke="#FAF7F1" 
                  strokeWidth={steamBoost ? 3 : 2} 
                  strokeLinecap="round" 
                  style={{ animation: `rise ${steamBoost ? '1.5s' : '3s'} infinite ease-in 1s` }} 
                />
              </g>
            )}
          </svg>
        </div>

        {/* Small Cat */}
        <div style={{ position: 'absolute', bottom: '15px', right: '35%', width: '60px', height: '40px', zIndex: 12 }}>
           <svg width="100%" height="100%">
             {/* Sleeping cat body */}
             <ellipse cx="30" cy="25" rx="20" ry="12" fill="#2A2928" />
             <circle cx="15" cy="25" r="10" fill="#2A2928" />
             {/* Ears */}
             <polygon points="5,15 15,15 10,5" fill="#2A2928" />
             <polygon points="15,15 25,15 20,5" fill="#2A2928" />
             {/* Tail */}
             {state === 'success' ? (
                // Tail up
                <path d="M 45 25 Q 60 25 55 5" fill="none" stroke="#2A2928" strokeWidth="6" strokeLinecap="round" />
             ) : (
                // Tail sleeping / moving
                <path d="M 45 25 Q 60 25 55 20" fill="none" stroke="#2A2928" strokeWidth="6" strokeLinecap="round" style={{ animation: 'sway 4s infinite alternate' }} />
             )}
           </svg>
        </div>

        {/* Vintage Desk Radio */}
        <div 
          className={styles.radio}
          style={{ position: 'absolute', bottom: '20px', right: '23%', width: '45px', height: '35px', zIndex: 12 }}
          onClick={onRadioClick}
          title={isMuted ? "Click to turn on cozy lofi/rain sounds!" : "Click to mute audio"}
        >
          <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
            {/* Wooden radio frame */}
            <rect x="0" y="5" width="45" height="30" fill="#D48A70" rx="3" stroke="#2A2928" strokeWidth="2" />
            {/* Fabric grille */}
            <rect x="5" y="10" width="22" height="20" fill="#EAE4DD" rx="1" stroke="#2A2928" strokeWidth="1.5" />
            <line x1="9" y1="13" x2="9" y2="27" stroke="#7A6D8C" strokeWidth="1" />
            <line x1="13" y1="13" x2="13" y2="27" stroke="#7A6D8C" strokeWidth="1" />
            <line x1="17" y1="13" x2="17" y2="27" stroke="#7A6D8C" strokeWidth="1" />
            <line x1="21" y1="13" x2="21" y2="27" stroke="#7A6D8C" strokeWidth="1" />
            
            {/* Dials */}
            <circle cx="34" cy="15" r="4" fill="#EAE4DD" stroke="#2A2928" strokeWidth="1.5" />
            <circle cx="34" cy="25" r="3" fill="#A9B59D" stroke="#2A2928" strokeWidth="1" />
            {/* Antenna */}
            <path d="M 12 5 Q 22 -3 32 5" fill="none" stroke="#2A2928" strokeWidth="2" />
            <line x1="32" y1="5" x2="38" y2="-8" stroke="#2A2928" strokeWidth="1.5" />
            <circle cx="38" cy="-8" r="1.5" fill="#2A2928" />

            {/* Status indicator LED */}
            <circle cx="41" cy="10" r="2" fill={!isMuted ? "#A9B59D" : "#EA4335"} style={{ transition: 'fill 0.3s' }} />
          </svg>

          {/* Music Notes rising when active */}
          {!isMuted && (
            <>
              <span className={styles.musicNote} style={{ top: '-10px', left: '10px', animationDelay: '0s' }}>🎵</span>
              <span className={styles.musicNote} style={{ top: '-15px', left: '25px', animationDelay: '0.8s' }}>🎶</span>
              <span className={styles.musicNote} style={{ top: '-8px', left: '5px', animationDelay: '1.6s' }}>🎵</span>
            </>
          )}
        </div>
      </div>

      {/* Lamp (can be toggled) */}
      <div className={`${styles.lamp} ${lampOn ? styles.lampOn : ''}`}>
        <svg width="100%" height="100%" viewBox="0 0 100 200" style={{ overflow: 'visible' }}>
           {/* Base */}
           <path d="M 20 190 L 80 190 L 70 180 L 30 180 Z" fill="#2A2928" />
           {/* Stand */}
           <line x1="50" y1="180" x2="50" y2="60" stroke="#2A2928" strokeWidth="6" />
           {/* Shade */}
           <path d="M 20 60 L 80 60 L 60 20 L 40 20 Z" fill="#A9B59D" />
           {/* Bulb */}
           <circle cx="50" cy="65" r="8" fill={lampOn ? "#FFF5E1" : "#EAE4DD"} style={{ transition: 'fill 0.5s' }} />
        </svg>
        <div className={styles.lampLight} />
      </div>

      {/* Plant */}
      <div className={styles.plant} onClick={onPlantClick} title="Click to rustle leaves!">
        <svg width="100%" height="100%" viewBox="0 0 100 150">
           {/* Pot */}
           <path d="M 30 150 L 70 150 L 80 100 L 20 100 Z" fill="#D48A70" />
           {/* Leaves */}
           <path d="M 50 100 Q 20 70 10 40 Q 30 40 50 90" fill="#A9B59D" />
           <path d="M 50 100 Q 80 70 90 40 Q 70 40 50 90" fill="#A9B59D" />
           <path d="M 50 100 Q 40 50 50 20 Q 60 50 50 100" fill="#A9B59D" />
        </svg>
      </div>

      {/* Falling Leaves */}
      {leaves.map(leaf => (
        <div 
          key={leaf.id}
          className={styles.fallingLeaf}
          style={{
            left: `calc(25% + ${leaf.left}px)`,
            bottom: 'calc(25vh + 80px)',
            transform: `rotate(${leaf.rotation}deg)`
          }}
        />
      ))}

      {/* Ambient particles (Dust) */}
      {!isNight && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 30 }}>
          <div style={{ position: 'absolute', top: '30%', left: '40%', width: '4px', height: '4px', background: 'rgba(250, 247, 241, 0.8)', borderRadius: '50%', animation: 'float 8s infinite alternate' }} />
          <div style={{ position: 'absolute', top: '50%', left: '60%', width: '3px', height: '3px', background: 'rgba(250, 247, 241, 0.6)', borderRadius: '50%', animation: 'float 12s infinite alternate-reverse' }} />
          <div style={{ position: 'absolute', top: '40%', left: '20%', width: '5px', height: '5px', background: 'rgba(250, 247, 241, 0.5)', borderRadius: '50%', animation: 'float 10s infinite alternate' }} />
        </div>
      )}

      {/* Transition effect (Success state) */}
      {state === 'success' && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 50, background: 'rgba(250, 247, 241, 0.2)', transition: 'background 2s ease-in-out' }} />
      )}
    </>
  );
}
