'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './student.module.css';
import StudentRoom from '@/app/components/StudentRoom';
import PrintStudio from '@/app/components/dashboard/PrintStudio';
import MemoryLibrary from '@/app/components/dashboard/MemoryLibrary';
import Notifications from '@/app/components/dashboard/Notifications';
import Payments from '@/app/components/dashboard/Payments';
import Settings from '@/app/components/dashboard/Settings';
import Reminders from '@/app/components/dashboard/Reminders';
import DeskUI from '@/app/components/dashboard/DeskUI';
import ProgressUI from '@/app/components/dashboard/ProgressUI';
import EasterEggUI from '@/app/components/dashboard/EasterEggUI';
import WeatherUI from '@/app/components/dashboard/WeatherUI';
import { audio } from '@/app/components/AudioEngine';
import { useMemorySystem } from '@/app/components/print/useMemorySystem';

export type CameraFocus = 'desk' | 'library' | 'utilities';
export type ActiveModal = 'none' | 'printer' | 'bookshelf' | 'mailbox' | 'wallet' | 'drawer' | 'clock' | 'desk' | 'plant' | 'cat' | 'window';

export default function StudentDashboard() {
  const { memory } = useMemorySystem();
  const [cameraFocus, setCameraFocus] = useState<CameraFocus>('desk');
  const [activeModal, setActiveModal] = useState<ActiveModal>('none');
  const [isNight, setIsNight] = useState(false);
  const [weather, setWeather] = useState<'sunny' | 'rainy' | 'sunset' | 'midnight'>('sunny');

  // Context-aware quiet companionship quotes
  const getQuietQuote = (() => {
    const hour = new Date().getHours();
    const isLate = hour >= 22 || hour <= 5;
    const isMorning = hour >= 6 && hour <= 10;
    const isGolden = hour >= 17 && hour <= 20;

    if (weather === 'midnight') return "Moon\'s out. Cat is somewhere around.";
    if (weather === 'rainy') return "Rain sounds nice today.";
    if (weather === 'sunset') return "Looks peaceful tonight.";
    if (isLate) return "Still here? I\'ll stay.";
    if (isMorning) return "Morning. Coffee\'s still warm.";
    if (isGolden) return "Golden hour. Take your time.";
    if (memory.isExamSeason) return "Busy season. I\'m here.";
    if (isNight) return "Good night.";
    return "Quiet day.";
  })();

  // Ambient sound (resume from auth if enabled)
  useEffect(() => {
    // If we transition and want audio to persist, we could check global state.
    // For now, we'll ensure weather state matches.
    audio.setWeatherState(isNight ? 'rain' : 'day');
  }, [isNight]);

  // Calculate Camera Pan Transform
  const getCameraTransform = () => {
    switch (cameraFocus) {
      case 'library':
        return '0vw'; 
      case 'desk':
        return '-100vw'; 
      case 'utilities':
        return '-200vw'; 
      default:
        return '-100vw';
    }
  };

  const handleObjectClick = (targetFocus: CameraFocus, targetModal: ActiveModal) => {
    audio.playFeedbackClick();
    setCameraFocus(targetFocus);
    // Add a tiny delay before showing the UI to let the camera pan start
    setTimeout(() => {
      setActiveModal(targetModal);
    }, 600);
  };

  const closeModal = () => {
    audio.playFeedbackClick();
    setActiveModal('none');
    // Return camera to desk when closing things, or keep it there?
    // "Everything exists inside one persistent room" - let's keep the camera where it is, 
    // unless explicitly navigating to the desk.
  };

  const containerClass = `${styles.dashboardContainer} ${isNight ? styles.nightMode : ''}`;

  return (
    <div className={containerClass}>
      
      {/* The 300vw expansive room layer */}
      <motion.div 
        className={styles.roomWorld} 
        initial={false}
        animate={{ x: getCameraTransform() }}
        transition={{ type: 'spring', damping: 25, stiffness: 120, mass: 1.2 }}
        style={{ display: 'flex', width: '300vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}
      >
        <div className={styles.roomFloor} />
        
        {/* Pass interactions to the SVG Room */}
        <StudentRoom 
          isNight={isNight}
          memory={memory}
          toggleNight={() => { audio.playFeedbackClick(); setIsNight(!isNight); }}
          onPrinterClick={() => handleObjectClick('utilities', 'printer')}
          onBookshelfClick={() => handleObjectClick('library', 'bookshelf')}
          onMailboxClick={() => handleObjectClick('utilities', 'mailbox')}
          onWalletClick={() => handleObjectClick('desk', 'wallet')}
          onDrawerClick={() => handleObjectClick('desk', 'drawer')}
          onClockClick={() => handleObjectClick('desk', 'clock')}
          onDeskClick={() => handleObjectClick('desk', 'desk')} 
          onPlantClick={() => handleObjectClick('desk', 'plant')}
          onCatClick={() => handleObjectClick('desk', 'cat')}
          onWindowClick={() => handleObjectClick('desk', 'window')}
        />
      </motion.div>

      {/* Quiet desk note — Ezi's little paper message */}
      {cameraFocus === 'desk' && activeModal === 'none' && (
        <motion.div
          initial={{ opacity: 0, y: 8, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: -1 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          style={{
            position: 'absolute', top: '14vh', left: '50%', transform: 'translateX(-50%) rotate(-1deg)',
            background: '#FAF7F1',
            padding: '0.9rem 2rem',
            boxShadow: '1px 4px 14px rgba(42,41,40,0.1)',
            border: '1px solid rgba(42,41,40,0.08)',
            borderRadius: '2px',
            zIndex: 100, textAlign: 'center',
            // Folded corner effect
          }}
        >
          {/* Washi tape */}
          <div style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)', width: '55px', height: '18px', background: 'rgba(212,138,112,0.38)', borderRadius: '2px' }} />
          <p style={{ fontFamily: 'Instrument Sans', fontSize: '1.1rem', color: 'rgba(42,41,40,0.65)', margin: 0, fontStyle: 'italic', whiteSpace: 'nowrap' }}>
            {getQuietQuote}
          </p>
        </motion.div>
      )}

      {cameraFocus !== 'desk' && activeModal === 'none' && (
        <button 
          onClick={() => handleObjectClick('desk', 'none')}
          style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 50, padding: '1rem 2rem', background: '#2A2928', color: '#FAF7F1', border: 'none', borderRadius: '30px', cursor: 'pointer', fontFamily: 'Space Grotesk', fontSize: '1rem', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
        >
          Return to Desk
        </button>
      )}

      {/* Cozy room navigation tags */}
      {activeModal === 'none' && (
        <>
          {(cameraFocus === 'desk' || cameraFocus === 'utilities') && (
            <button 
              className={styles.navTagLeft}
              onClick={() => {
                audio.playFeedbackClick();
                setCameraFocus(cameraFocus === 'desk' ? 'library' : 'desk');
              }}
            >
              <span>←</span>
              <span>{cameraFocus === 'desk' ? 'Bookshelf' : 'Study Desk'}</span>
            </button>
          )}

          {(cameraFocus === 'desk' || cameraFocus === 'library') && (
            <button 
              className={styles.navTagRight}
              onClick={() => {
                audio.playFeedbackClick();
                setCameraFocus(cameraFocus === 'desk' ? 'utilities' : 'desk');
              }}
            >
              <span>{cameraFocus === 'desk' ? 'Printer & Mailbox' : 'Study Desk'}</span>
              <span>→</span>
            </button>
          )}
        </>
      )}


      {/* Tactile Modal UIs */}
      <div className={`${styles.uiOverlay} ${activeModal !== 'none' ? styles.active : ''}`}>
        
        {/* PRINT STUDIO */}
        {activeModal === 'printer' && (
          <PrintStudio onClose={closeModal} />
        )}

        {/* MEMORY LIBRARY */}
        {activeModal === 'bookshelf' && <MemoryLibrary onClose={closeModal} isNight={isNight} weather={weather} />}

        {/* NOTIFICATIONS */}
        {activeModal === 'mailbox' && <Notifications onClose={closeModal} />}

        {/* PAYMENTS */}
        {activeModal === 'wallet' && <Payments onClose={closeModal} />}

        {/* SETTINGS */}
        {activeModal === 'drawer' && <Settings onClose={closeModal} />}

        {/* REMINDERS */}
        {activeModal === 'clock' && <Reminders onClose={closeModal} />}

        {/* DESK / EZI UI */}
        {activeModal === 'desk' && <DeskUI onClose={closeModal} />}

        {/* PLANT PROGRESS */}
        {activeModal === 'plant' && <ProgressUI onClose={closeModal} />}

        {/* CAT EASTER EGG */}
        {activeModal === 'cat' && <EasterEggUI onClose={closeModal} />}

        {/* WEATHER WINDOW */}
        {activeModal === 'window' && (
          <WeatherUI 
            onClose={closeModal} 
            isNight={isNight} 
            setRoomWeather={(preset: 'sunny' | 'rainy' | 'sunset' | 'midnight') => {
              audio.playFeedbackClick();
              if (preset === 'sunny') {
                setIsNight(false);
                setWeather('sunny');
                audio.setWeatherState('day');
              } else if (preset === 'rainy') {
                setIsNight(false);
                setWeather('rainy');
                audio.setWeatherState('rain');
              } else if (preset === 'sunset') {
                setIsNight(true);
                setWeather('sunset');
                audio.setWeatherState('sunset');
              } else if (preset === 'midnight') {
                setIsNight(true);
                setWeather('midnight');
                audio.setWeatherState('rain');
              }
            }}
          />
        )}

      </div>
    </div>
  );
}
