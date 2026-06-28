'use client';

import React from 'react';
import styles from '../student/student.module.css';
import EziCharacter from './EziCharacter';
import { MemoryState } from './print/useMemorySystem';

interface StudentRoomProps {
  isNight: boolean;
  memory?: MemoryState;
  toggleNight: () => void;
  onPrinterClick: () => void;
  onBookshelfClick: () => void;
  onMailboxClick: () => void;
  onDeskClick: () => void;
  onWalletClick: () => void;
  onDrawerClick: () => void;
  onClockClick: () => void;
  onPlantClick: () => void;
  onCatClick: () => void;
  onWindowClick: () => void;
}

const bookDefinitions = [
  // Shelf 1 (top, line y = 150)
  { x: 40, y: 50, w: 20, h: 100, fill: "#7A6D8C", rotate: 0 },
  { x: 65, y: 70, w: 25, h: 80, fill: "#D48A70", rotate: 0 },
  { x: 95, y: 40, w: 18, h: 110, fill: "#A9B59D", rotate: 0 },
  { x: 120, y: 45, w: 22, h: 105, fill: "#2A2928", rotate: 12 }, // tilted
  { x: 155, y: 60, w: 24, h: 90, fill: "#C4956A", rotate: 0 },

  // Shelf 2 (middle, line y = 300)
  { x: 40, y: 200, w: 22, h: 100, fill: "#A9B59D", rotate: 0 },
  { x: 67, y: 220, w: 28, h: 80, fill: "#7A6D8C", rotate: 0 },
  { x: 100, y: 190, w: 16, h: 110, fill: "#D48A70", rotate: -15 }, // tilted
  { x: 125, y: 210, w: 20, h: 90, fill: "#2A2928", rotate: 0 },

  // Shelf 3 (bottom, line y = 450)
  { x: 40, y: 350, w: 26, h: 100, fill: "#2A2928", rotate: 0 },
  { x: 72, y: 370, w: 22, h: 80, fill: "#C4956A", rotate: 5 },
  { x: 100, y: 340, w: 20, h: 110, fill: "#FAF7F1", rotate: 0 }
];

function DiwaliLights() {
  return (
    <svg width="400" height="40" viewBox="0 0 400 40" style={{ position: 'absolute', top: '-18vh', left: '0', width: '40vw', zIndex: 10, pointerEvents: 'none' }}>
      <path d="M 0 5 Q 100 25 200 5 Q 300 25 400 5" fill="none" stroke="rgba(42,41,40,0.3)" strokeWidth="1" />
      {[40, 100, 160, 240, 300, 360].map((x, idx) => {
        const y = 5 + Math.sin((x / 200) * Math.PI) * 12;
        return (
          <g key={idx} transform={`translate(${x}, ${y})`}>
            <line x1="0" y1="0" x2="0" y2="6" stroke="#2A2928" strokeWidth="1" />
            <path d="M -6 6 C -6 14, 6 14, 6 6 Z" fill="#D48A70" stroke="#2A2928" strokeWidth="0.8" />
            <circle cx="0" cy="2" r="2.5" fill="#F4D03F" style={{ animation: 'pulse 1.5s infinite alternate' }} />
          </g>
        );
      })}
    </svg>
  );
}

function ChristmasLights() {
  const colors = ['#EA4335', '#34A853', '#F4D03F', '#4285F4'];
  return (
    <svg width="400" height="40" viewBox="0 0 400 40" style={{ position: 'absolute', top: '-18vh', left: '0', width: '40vw', zIndex: 10, pointerEvents: 'none' }}>
      <path d="M 0 5 Q 100 20 200 5 Q 300 20 400 5" fill="none" stroke="rgba(42,41,40,0.3)" strokeWidth="1" />
      {Array.from({ length: 12 }).map((_, idx) => {
        const x = (idx / 11) * 400;
        const y = 5 + Math.sin((x / 200) * Math.PI) * 11;
        const color = colors[idx % colors.length];
        return (
          <circle 
            key={idx} 
            cx={x} 
            cy={y + 4} 
            r="3.5" 
            fill={color} 
            style={{ 
              animation: 'twinkle 1.5s infinite', 
              animationDelay: `${idx * 0.15}s`,
              filter: `drop-shadow(0 0 4px ${color})`
            }} 
          />
        );
      })}
    </svg>
  );
}

function RamadanLanternsDecoration() {
  return (
    <svg width="400" height="60" viewBox="0 0 400 60" style={{ position: 'absolute', top: '-18vh', left: '0', width: '40vw', zIndex: 10, pointerEvents: 'none' }}>
      <path d="M 0 5 Q 100 18 200 5 Q 300 18 400 5" fill="none" stroke="rgba(42,41,40,0.3)" strokeWidth="1" />
      {[50, 130, 210, 290, 370].map((x, idx) => {
        const y = 5 + Math.sin((x / 200) * Math.PI) * 9;
        return (
          <g key={idx} transform={`translate(${x}, ${y})`}>
            <line x1="0" y1="0" x2="0" y2="8" stroke="#2A2928" strokeWidth="1" />
            <polygon points="-5,8 5,8 3,14 -3,14" fill="#FAF7F1" stroke="#2A2928" strokeWidth="0.8" />
            <rect x="-4" y="14" width="8" height="10" rx="1" fill="#7A6D8C" stroke="#2A2928" strokeWidth="0.8" />
            <polygon points="-3,24 3,24 5,28 -5,28" fill="#FAF7F1" stroke="#2A2928" strokeWidth="0.8" />
            <circle cx="0" cy="19" r="2.5" fill="#F4D03F" style={{ animation: 'pulse 2s infinite alternate' }} />
          </g>
        );
      })}
    </svg>
  );
}

export default function StudentRoom({
  isNight,
  memory,
  toggleNight,
  onPrinterClick,
  onBookshelfClick,
  onMailboxClick,
  onDeskClick,
  onWalletClick,
  onDrawerClick,
  onClockClick,
  onPlantClick,
  onCatClick,
  onWindowClick
}: StudentRoomProps) {

  const date = new Date();
  const month = date.getMonth();
  const day = date.getDate();
  
  let currentSeason: 'diwali' | 'christmas' | 'ramadan' | 'normal' = 'normal';
  if (month === 2) currentSeason = 'ramadan';
  else if (month === 9 || (month === 10 && day <= 15)) currentSeason = 'diwali';
  else if (month === 11) currentSeason = 'christmas';

  const notes = memory?.stickyNotes || [];
  const mugsCount = memory?.coffeeMugs ?? 0;

  return (
    <>
      {/* Ambient Outer Life */}
      {isNight ? (
        <>
          <div className={styles.shootingStar} style={{ top: '10vh', left: '10vw' }} />
          <div className={styles.shootingStar} style={{ top: '30vh', left: '150vw', animationDelay: '3s' }} />
        </>
      ) : (
        <>
          <div className={styles.bird} style={{ top: '15vh', animationDelay: '0s' }} />
          <div className={styles.bird} style={{ top: '20vh', animationDelay: '5s' }} />
          <div className={styles.paperAirplane} style={{ top: '30vh', animationDelay: '2s' }}>
             <svg width="30" height="20" viewBox="0 0 30 20">
                <polygon points="0,10 30,0 20,20 15,10" fill="#FAF7F1" stroke="#2A2928" strokeWidth="1" />
                <line x1="0" y1="10" x2="30" y2="0" stroke="#2A2928" strokeWidth="1" />
             </svg>
          </div>
        </>
      )}
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
            
            {/* Dynamic Books based on print history */}
            {bookDefinitions.slice(0, memory?.books ?? 1).map((b, idx) => (
              <g key={idx} transform={b.rotate ? `translate(${b.x}, ${b.y}) rotate(${b.rotate})` : undefined}>
                <rect 
                  x={b.rotate ? 0 : b.x} 
                  y={b.rotate ? 0 : b.y} 
                  width={b.w} 
                  height={b.h} 
                  fill={b.fill} 
                  stroke="#2A2928"
                  strokeWidth="2"
                  rx="1"
                />
              </g>
            ))}

            {/* Decorative items on middle shelf */}
            <rect x="180" y="210" width="80" height="80" fill="#FAF7F1" stroke="#2A2928" strokeWidth="2" />
            <circle cx="220" cy="250" r="20" fill="#A9B59D" />
          </svg>
        </div>
      </div>

      {/* 2. DESK AREA (Center) */}
      <div className={styles.areaDesk}>
        
        {/* Clock */}
        <div 
          className={styles.interactiveObject}
          style={{ position: 'absolute', top: '-25vh', left: '10vw', width: '60px', height: '60px', zIndex: 2 }}
          onClick={onClockClick}
          title="Pickup Reminders"
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="#FAF7F1" stroke="#2A2928" strokeWidth="4" />
            <circle cx="50" cy="50" r="3" fill="#2A2928" />
            {/* Clock Hands */}
            <line x1="50" y1="50" x2="50" y2="20" stroke="#D48A70" strokeWidth="4" strokeLinecap="round" className={styles.clockTick} />
            <line x1="50" y1="50" x2="70" y2="50" stroke="#2A2928" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>

        {/* Dynamic Sticky Notes on Wall */}
        <div style={{ position: 'absolute', top: '10vh', right: '5vw', display: 'flex', gap: '15px', zIndex: 2 }}>
           {notes.length === 0 ? (
             <>
               <div className={styles.wiggle} style={{ width: '40px', height: '40px', background: '#F4D03F', transform: 'rotate(5deg)', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }} />
               <div className={styles.wiggle} style={{ width: '40px', height: '40px', background: '#A9B59D', transform: 'rotate(-10deg)', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }} />
             </>
           ) : (
             notes.map((note) => (
               <div 
                 key={note.id}
                 className={styles.wiggle} 
                 style={{ 
                   width: '45px', 
                   height: '45px', 
                   background: note.color || '#F4D03F', 
                   transform: `rotate(${note.rotate}deg)`, 
                   boxShadow: '2px 2px 6px rgba(0,0,0,0.15)',
                   padding: '4px',
                   display: 'flex',
                   flexDirection: 'column',
                   justifyContent: 'center',
                   alignItems: 'center',
                   overflow: 'hidden'
                 }}
                 title={note.text}
               >
                 <span style={{ fontSize: '5px', fontFamily: 'Space Grotesk', color: '#2A2928', textAlign: 'center', lineHeight: 1.1, whiteSpace: 'normal', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', wordBreak: 'break-all' }}>
                   {note.text}
                 </span>
               </div>
             ))
           )}
        </div>

        {/* Seasonal Decorations hung across top wall of window */}
        {currentSeason === 'diwali' && <DiwaliLights />}
        {currentSeason === 'christmas' && <ChristmasLights />}
        {currentSeason === 'ramadan' && <RamadanLanternsDecoration />}

        {/* Large Window */}
        <div 
          className={styles.interactiveObject}
          style={{ position: 'absolute', top: '-10vh', width: '40vw', height: '40vh', zIndex: 1 }}
          onClick={onWindowClick}
          title="Weather"
        >
          <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="none" style={{ overflow: 'hidden' }}>
            {/* Window frame */}
            <rect x="0" y="0" width="400" height="300" fill="none" stroke="#2A2928" strokeWidth="8" />
            <line x1="200" y1="0" x2="200" y2="300" stroke="#2A2928" strokeWidth="6" />
            <line x1="0" y1="150" x2="400" y2="150" stroke="#2A2928" strokeWidth="6" />
            
            {/* Sky */}
            <rect x="4" y="4" width="392" height="292" fill={isNight ? "#1A1918" : "#A9B59D"} opacity="0.3" style={{ transition: 'fill 2s' }} />
            
            {/* Glass Glare Reflections */}
            <path d="M 0 0 L 150 0 L 0 200 Z" fill="#fff" opacity="0.08" pointerEvents="none" />
            <path d="M 220 0 L 370 0 L 148 300 L -2 300 Z" fill="#fff" opacity="0.08" pointerEvents="none" />
            
            {/* Curtains (swaying gently) */}
            <g style={{ transformOrigin: 'top left', animation: 'sway 6s infinite alternate ease-in-out' }}>
              <path d="M 0 0 Q 50 150 20 300 L 0 300 Z" fill="#EAE4DD" opacity="0.9" />
            </g>
            <g style={{ transformOrigin: 'top right', animation: 'sway 8s infinite alternate-reverse ease-in-out' }}>
              <path d="M 400 0 Q 350 150 380 300 L 400 300 Z" fill="#EAE4DD" opacity="0.9" />
            </g>

            {/* Snow flurries (Christmas only) */}
            {currentSeason === 'christmas' && [
              {cx: 60, cy: 60}, {cx: 150, cy: 30}, {cx: 280, cy: 80}, {cx: 340, cy: 45},
              {cx: 100, cy: 140}, {cx: 230, cy: 110}, {cx: 370, cy: 130}, {cx: 50, cy: 200},
              {cx: 180, cy: 220}, {cx: 310, cy: 190},
            ].map((s, i) => (
              <circle key={i} cx={s.cx} cy={s.cy} r="3.5" fill="#FFFFFF" opacity="0.7"
                style={{ animation: `float ${4 + i * 0.5}s infinite alternate ease-in-out`, animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </svg>
        </div>

        {/* Desk Surface */}
        <div style={{ position: 'absolute', bottom: 0, width: '80vw', height: '20px', background: '#D48A70', border: '2px solid #2A2928', borderRadius: '10px', zIndex: 5 }} />
        
        {/* Desk front with Drawer */}
        <div style={{ position: 'absolute', bottom: '-40vh', width: '70vw', height: '40vh', background: '#A0644D', border: '2px solid #2A2928', zIndex: 4 }}>
          <div 
            className={styles.interactiveObject}
            style={{ position: 'absolute', top: '10%', left: '50%', marginLeft: '-15vw', width: '30vw', height: '10vh', background: '#D48A70', border: '2px solid #2A2928', borderRadius: '5px' }}
            onClick={onDrawerClick}
            title="Settings"
          >
            <div style={{ position: 'absolute', top: '50%', left: '50%', marginLeft: '-20px', marginTop: '-5px', width: '40px', height: '10px', background: '#2A2928', borderRadius: '5px' }} />
          </div>
        </div>

        {/* Ezi */}
        <div style={{ position: 'absolute', bottom: '20px', left: '40%', width: '180px', height: '220px', zIndex: 10 }} onClick={onDeskClick} title="Ezi's Desk" className={styles.interactiveObject}>
          <EziCharacter state="dashboard" isNight={isNight} />
        </div>

        {/* Plant */}
        <div 
          className={styles.interactiveObject} 
          style={{ position: 'absolute', bottom: '20px', left: '10vw', width: '60px', height: '100px', zIndex: 12 }}
          onClick={onPlantClick}
          title="The Desk Plant"
        >
          <svg width="100%" height="100%" viewBox="0 0 100 150">
             <path d="M 30 150 L 70 150 L 80 100 L 20 100 Z" fill="#D48A70" stroke="#2A2928" strokeWidth="4" />
             {(memory?.plantStage === 1) && (
               <path d="M 50 100 Q 30 80 30 65 Q 40 65 50 90" fill="#A9B59D" stroke="#2A2928" strokeWidth="2" style={{ animation: 'sway 3s infinite alternate' }} />
             )}
             {(memory?.plantStage === 2 || !memory?.plantStage) && (
               <>
                 <path d="M 50 100 Q 20 70 10 40 Q 30 40 50 90" fill="#A9B59D" stroke="#2A2928" strokeWidth="2" style={{ animation: 'sway 3s infinite alternate' }} />
                 <path d="M 50 100 Q 80 70 90 40 Q 70 40 50 90" fill="#A9B59D" stroke="#2A2928" strokeWidth="2" style={{ animation: 'sway 4s infinite alternate-reverse' }} />
               </>
             )}
             {(memory?.plantStage === 3) && (
               <>
                 <path d="M 50 100 Q 20 70 10 40 Q 30 40 50 90" fill="#A9B59D" stroke="#2A2928" strokeWidth="2" style={{ animation: 'sway 3s infinite alternate' }} />
                 <path d="M 50 100 Q 80 70 90 40 Q 70 40 50 90" fill="#A9B59D" stroke="#2A2928" strokeWidth="2" style={{ animation: 'sway 4s infinite alternate-reverse' }} />
                 <path d="M 50 100 Q 50 60 50 30 Q 60 30 50 90" fill="#8BA382" stroke="#2A2928" strokeWidth="2" style={{ animation: 'sway 5s infinite alternate' }} />
                 <path d="M 50 100 Q 35 60 20 50 Q 35 45 50 90" fill="#8BA382" stroke="#2A2928" strokeWidth="2" style={{ animation: 'sway 4.5s infinite alternate' }} />
                 <path d="M 50 100 Q 65 60 80 50 Q 65 45 50 90" fill="#A9B59D" stroke="#2A2928" strokeWidth="2" style={{ animation: 'sway 3.5s infinite alternate-reverse' }} />
                 <circle cx="20" cy="45" r="4" fill="#D48A70" stroke="#2A2928" strokeWidth="1" />
                 <circle cx="80" cy="45" r="4" fill="#D48A70" stroke="#2A2928" strokeWidth="1" />
                 <circle cx="50" cy="25" r="4" fill="#D48A70" stroke="#2A2928" strokeWidth="1" />
               </>
             )}
          </svg>
        </div>

        {/* Wallet Pouch */}
        <div className={styles.interactiveObject} style={{ position: 'absolute', bottom: '20px', right: '30vw', width: '50px', height: '40px', zIndex: 12 }} onClick={onWalletClick} title="Payments">
          <svg width="100%" height="100%" viewBox="0 0 100 80">
            <rect x="10" y="20" width="80" height="50" fill="#7A6D8C" rx="5" />
            <path d="M 10 35 L 50 50 L 90 35 L 90 25 L 10 25 Z" fill="#D48A70" />
            <circle cx="50" cy="50" r="5" fill="#EAE4DD" />
          </svg>
        </div>

        {/* Pencil Holder cup */}
        <div style={{ position: 'absolute', bottom: '20px', right: '24vw', width: '32px', height: '44px', zIndex: 11 }}>
          <svg width="100%" height="100%" viewBox="0 0 40 55" style={{ overflow: 'visible' }}>
            {/* Cup */}
            <path d="M 5 18 L 7 50 L 33 50 L 35 18 Z" fill="#EAE4DD" stroke="#2A2928" strokeWidth="2" />
            {/* Cup rim */}
            <rect x="3" y="14" width="34" height="6" fill="#D48A70" stroke="#2A2928" strokeWidth="1.5" rx="1" />
            {/* Pencils */}
            <line x1="12" y1="2" x2="12" y2="18" stroke="#F4D03F" strokeWidth="4" strokeLinecap="round" />
            <polygon points="10,2 14,2 12,-4" fill="#FAF7F1" stroke="#2A2928" strokeWidth="0.8" />
            <line x1="20" y1="0" x2="20" y2="18" stroke="#A9B59D" strokeWidth="4" strokeLinecap="round" />
            <polygon points="18,0 22,0 20,-6" fill="#FAF7F1" stroke="#2A2928" strokeWidth="0.8" />
            <line x1="28" y1="5" x2="28" y2="18" stroke="#D48A70" strokeWidth="4" strokeLinecap="round" />
            <polygon points="26,5 30,5 28,-1" fill="#FAF7F1" stroke="#2A2928" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Dynamic Coffee Mugs (based on print history / visits) */}
        {Array.from({ length: Math.max(1, mugsCount) }).map((_, idx) => {
          const rotate = idx * 8 - 4;
          return (
            <div 
              key={idx} 
              className={styles.interactiveObject} 
              style={{ 
                position: 'absolute', 
                bottom: '20px', 
                left: `${28 + (idx * 2)}vw`, 
                width: '30px', 
                height: '40px', 
                zIndex: 12 + idx,
                transform: `rotate(${rotate}deg) translateY(${idx * 1.5}px)`
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 50 50" style={{ overflow: 'visible' }}>
                 <path d="M 10 20 L 10 50 L 30 50 L 30 20 Z" fill={idx % 2 === 0 ? "#FAF7F1" : "#EAE4DD"} stroke="#2A2928" strokeWidth="2" />
                 <path d="M 30 25 Q 40 25 40 35 Q 40 45 30 45" fill="none" stroke={idx % 2 === 0 ? "#FAF7F1" : "#EAE4DD"} strokeWidth="3" />
                 {idx === Math.max(1, mugsCount) - 1 && (
                   <path d="M 15 10 Q 10 0 20 -10" fill="none" stroke="#FAF7F1" strokeWidth="2" style={{ animation: 'rise 2s infinite ease-in' }} />
                 )}
              </svg>
            </div>
          );
        })}

        {/* Exam Season Clutter on Desk Surface */}
        {memory?.isExamSeason && (
          <>
            {/* Textbook stack on desk */}
            <div style={{ position: 'absolute', bottom: '20px', left: '6vw', width: '80px', height: '40px', zIndex: 6 }}>
              <svg width="100%" height="100%" viewBox="0 0 80 40">
                <rect x="0" y="24" width="55" height="10" fill="#7A6D8C" rx="2" stroke="#2A2928" strokeWidth="1.5" />
                <rect x="5" y="15" width="52" height="9" fill="#A9B59D" rx="2" stroke="#2A2928" strokeWidth="1.5" />
                <rect x="2" y="8" width="48" height="8" fill="#FAF7F1" rx="1" stroke="#2A2928" strokeWidth="1.5" />
              </svg>
            </div>
            {/* Scattered worksheets */}
            <div style={{ position: 'absolute', bottom: '20px', right: '15vw', zIndex: 6, transform: 'rotate(-8deg)' }}>
              <svg width="45" height="30" viewBox="0 0 45 30">
                <rect x="2" y="2" width="40" height="26" fill="#FAF7F1" stroke="#2A2928" strokeWidth="1.5" rx="1" />
                <line x1="8" y1="8" x2="32" y2="8" stroke="rgba(42,41,40,0.3)" strokeWidth="1" />
                <line x1="8" y1="14" x2="35" y2="14" stroke="rgba(42,41,40,0.3)" strokeWidth="1" />
                <line x1="8" y1="20" x2="28" y2="20" stroke="rgba(42,41,40,0.3)" strokeWidth="1" />
              </svg>
            </div>
          </>
        )}

        {/* Tiny Cat */}
        <div 
          style={{ position: 'absolute', bottom: '20px', right: '40vw', width: '50px', height: '30px', zIndex: 12 }} 
          className={styles.interactiveObject} 
          title="Tiny Cat"
          onClick={onCatClick}
        >
           <svg width="100%" height="100%" viewBox="0 0 60 40">
             <ellipse cx="30" cy="25" rx="20" ry="12" fill="#2A2928" />
             <circle cx="15" cy="25" r="10" fill="#2A2928" />
             <polygon points="5,15 15,15 10,5" fill="#2A2928" />
             <polygon points="15,15 25,15 20,5" fill="#2A2928" />
             <path d="M 45 25 Q 60 25 55 20" fill="none" stroke="#2A2928" strokeWidth="6" strokeLinecap="round" style={{ animation: 'sway 4s infinite alternate' }} />
           </svg>
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
        
        {/* Mailbox label */}
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(20vh + 128px)',
            left: '10vw',
            width: '110px',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 20,
          }}
        >
          <span style={{
            display: 'inline-block',
            fontFamily: 'Instrument Sans, sans-serif',
            fontSize: '0.62rem',
            color: 'rgba(42,41,40,0.55)',
            background: 'rgba(250,247,241,0.85)',
            border: '1px dashed rgba(42,41,40,0.18)',
            borderRadius: '20px',
            padding: '2px 10px',
            letterSpacing: '0.04em',
            backdropFilter: 'blur(2px)',
          }}>
            📬 Notification Mailbox
          </span>
          <div style={{ fontSize: '0.7rem', color: 'rgba(42,41,40,0.35)', marginTop: '2px' }}>↓</div>
        </div>

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

        {/* Printer label */}
        <div
          style={{
            position: 'absolute',
            bottom: '125px',
            right: '10vw',
            width: '200px',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 20,
          }}
        >
          <span style={{
            display: 'inline-block',
            fontFamily: 'Instrument Sans, sans-serif',
            fontSize: '0.65rem',
            color: 'rgba(42,41,40,0.6)',
            background: 'rgba(250,247,241,0.9)',
            border: '1px dashed rgba(42,41,40,0.2)',
            borderRadius: '20px',
            padding: '3px 12px',
            letterSpacing: '0.05em',
            backdropFilter: 'blur(2px)',
            boxShadow: '0 2px 8px rgba(42,41,40,0.06)',
          }}>
            🖨️ Start Printing Here
          </span>
          <div style={{ fontSize: '0.75rem', color: 'rgba(42,41,40,0.35)', marginTop: '2px' }}>↓</div>
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
