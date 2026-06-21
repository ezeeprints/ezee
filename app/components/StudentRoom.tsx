'use client';

import React from 'react';
import styles from '../student/student.module.css';
import EziCharacter from './EziCharacter';

interface StudentRoomProps {
  isNight: boolean;
  toggleNight: () => void;
  onPrinterClick: () => void;
  onBookshelfClick: () => void;
  onMailboxClick: () => void;
  onDeskClick: () => void;
}

export default function StudentRoom({
  isNight,
  toggleNight,
  onPrinterClick,
  onBookshelfClick,
  onMailboxClick,
  onDeskClick
}: StudentRoomProps) {



  return (
    <>
      {/* 1. LIBRARY AREA (Left) */}
      <div className={styles.areaLibrary}>
        {/* Bookshelf */}
        <div 
          className={styles.interactiveObject} 
          style={{ width: '100%', height: '100%' }}
          onClick={onBookshelfClick}
          title="Order History"
        >
          <svg width="100%" height="100%" viewBox="0 0 300 600" preserveAspectRatio="none">
            {/* Shelf Frame */}
            <rect x="20" y="20" width="260" height="580" fill="#EAE4DD" stroke="#2A2928" strokeWidth="4" />
            {/* Shelves */}
            <line x1="20" y1="150" x2="280" y2="150" stroke="#2A2928" strokeWidth="4" />
            <line x1="20" y1="300" x2="280" y2="300" stroke="#2A2928" strokeWidth="4" />
            <line x1="20" y1="450" x2="280" y2="450" stroke="#2A2928" strokeWidth="4" />
            
            {/* Books (Order History representation) */}
            <rect x="40" y="50" width="20" height="100" fill="#7A6D8C" />
            <rect x="65" y="70" width="30" height="80" fill="#D48A70" />
            <rect x="100" y="40" width="15" height="110" fill="#A9B59D" />
            
            {/* Tilted book */}
            <g transform="translate(130, 40) rotate(15)">
              <rect x="0" y="0" width="25" height="100" fill="#2A2928" />
              <rect x="5" y="10" width="15" height="80" fill="#FAF7F1" />
            </g>

            {/* Middle shelf */}
            <rect x="50" y="220" width="80" height="80" fill="#FAF7F1" stroke="#2A2928" strokeWidth="2" />
            <circle cx="90" cy="260" r="20" fill="#A9B59D" />
          </svg>
        </div>
      </div>

      {/* 2. DESK AREA (Center) */}
      <div className={styles.areaDesk}>
        
        {/* Large Window */}
        <div 
          style={{ position: 'absolute', top: '-10vh', width: '40vw', height: '40vh', zIndex: 1 }}
        >
          <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="none">
            {/* Window frame */}
            <rect x="0" y="0" width="400" height="300" fill="none" stroke="#2A2928" strokeWidth="8" />
            <line x1="200" y1="0" x2="200" y2="300" stroke="#2A2928" strokeWidth="6" />
            <line x1="0" y1="150" x2="400" y2="150" stroke="#2A2928" strokeWidth="6" />
            
            {/* Sky */}
            <rect x="4" y="4" width="392" height="292" fill={isNight ? "#1A1918" : "#A9B59D"} opacity="0.3" style={{ transition: 'fill 2s' }} />
            
            {/* Curtains */}
            <path d="M 0 0 Q 50 150 20 300 L 0 300 Z" fill="#EAE4DD" opacity="0.9" />
            <path d="M 400 0 Q 350 150 380 300 L 400 300 Z" fill="#EAE4DD" opacity="0.9" />
          </svg>
        </div>

        {/* Desk Surface */}
        <div style={{ position: 'absolute', bottom: 0, width: '80vw', height: '20px', background: '#D48A70', border: '2px solid #2A2928', borderRadius: '10px', zIndex: 5 }} />
        <div style={{ position: 'absolute', bottom: '-40vh', width: '70vw', height: '40vh', background: '#A0644D', border: '2px solid #2A2928', zIndex: 4 }} /> {/* Desk front */}

        {/* Ezi */}
        <div style={{ position: 'absolute', bottom: '20px', left: '40%', width: '180px', height: '220px', zIndex: 10 }}>
          <EziCharacter state="dashboard" />
        </div>

        {/* Lamp (Night Mode Toggle) */}
        <div 
          className={styles.interactiveObject}
          style={{ bottom: '20px', right: '10vw', width: '80px', height: '160px', zIndex: 15 }}
          onClick={toggleNight}
          title="Toggle Night Mode"
        >
          <svg width="100%" height="100%" viewBox="0 0 100 200" style={{ overflow: 'visible' }}>
             <path d="M 20 190 L 80 190 L 70 180 L 30 180 Z" fill="#2A2928" />
             <line x1="50" y1="180" x2="50" y2="60" stroke="#2A2928" strokeWidth="6" />
             <path d="M 20 60 L 80 60 L 60 20 L 40 20 Z" fill="#7A6D8C" />
             <circle cx="50" cy="65" r="8" fill={isNight ? "#FFF5E1" : "#EAE4DD"} style={{ transition: 'fill 0.5s' }} />
             
             {/* Glow */}
             {isNight && (
               <circle cx="50" cy="65" r="40" fill="#F4D03F" opacity="0.15" style={{ animation: 'pulse 2s infinite alternate' }} />
             )}
          </svg>
        </div>

      </div>

      {/* 3. UTILITIES AREA (Right) */}
      <div className={styles.areaUtilities}>
        
        {/* Mailbox (Notifications) */}
        <div 
          className={styles.interactiveObject}
          style={{ position: 'absolute', bottom: '20vh', left: '10vw', width: '80px', height: '120px' }}
          onClick={onMailboxClick}
          title="Notifications"
        >
          <svg width="100%" height="100%" viewBox="0 0 100 150">
             {/* Post */}
             <rect x="40" y="60" width="20" height="90" fill="#2A2928" />
             {/* Box */}
             <rect x="10" y="20" width="80" height="50" fill="#D48A70" rx="20" />
             {/* Door */}
             <rect x="20" y="25" width="60" height="40" fill="#FAF7F1" rx="15" stroke="#2A2928" strokeWidth="2" />
             {/* Flag up (new mail!) */}
             <line x1="90" y1="45" x2="110" y2="10" stroke="#EA4335" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>

        {/* Printer (Print Studio) */}
        <div 
          className={styles.interactiveObject}
          style={{ position: 'absolute', bottom: 0, right: '10vw', width: '200px', height: '120px' }}
          onClick={onPrinterClick}
          title="Print Studio"
        >
          <svg width="100%" height="100%" viewBox="0 0 200 120" style={{ overflow: 'visible' }}>
             {/* Printer Body */}
             <path d="M 20 40 L 180 40 Q 190 40 190 50 L 190 100 Q 190 110 180 110 L 20 110 Q 10 110 10 100 L 10 50 Q 10 40 20 40 Z" fill="#EAE4DD" stroke="#2A2928" strokeWidth="4" />
             <path d="M 30 10 L 170 10 Q 180 10 180 20 L 180 40 L 20 40 L 20 20 Q 20 10 30 10 Z" fill="#FAF7F1" stroke="#2A2928" strokeWidth="4" />
             
             {/* Paper Stack sticking out top */}
             <rect x="50" y="-10" width="100" height="20" fill="#fff" stroke="#2A2928" strokeWidth="2" transform="skewX(10)" />
             <rect x="50" y="-5" width="100" height="15" fill="#fff" stroke="#2A2928" strokeWidth="2" />
             
             {/* Output tray */}
             <rect x="40" y="110" width="120" height="10" fill="#FAF7F1" stroke="#2A2928" strokeWidth="2" />
             
             {/* Buttons and lights */}
             <rect x="30" y="50" width="30" height="10" fill="#2A2928" rx="2" />
             <circle cx="160" cy="55" r="5" fill="#A9B59D" style={{ animation: 'blink 2s infinite' }} />
          </svg>
        </div>

      </div>

      {/* Ambient Dust Particles */}
      <div className={styles.dustParticle} style={{ left: '50vw', top: '30vh', width: '4px', height: '4px', animation: 'float 8s infinite alternate' }} />
      <div className={styles.dustParticle} style={{ left: '150vw', top: '40vh', width: '5px', height: '5px', animation: 'float 12s infinite alternate-reverse' }} />
      <div className={styles.dustParticle} style={{ left: '250vw', top: '50vh', width: '3px', height: '3px', animation: 'float 10s infinite alternate' }} />
    </>
  );
}
