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

  // Derive greeting based on time of day, weather, and night mode
  const greetings = (() => {
    if (weather === 'rainy' || weather === 'midnight') {
      return "Perfect weather for printing notes ☔";
    }
    if (isNight) {
      return "Still studying? I'll stay with you.";
    }
    return "Ready for another productive day?";
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

      {/* Greetings / Ezi Desk Overlay */}
      {cameraFocus === 'desk' && activeModal === 'none' && (
        <div style={{
          position: 'absolute', top: '15vh', left: '50%', transform: 'translateX(-50%)',
          background: '#FAF7F1', padding: '1.5rem 3rem', borderRadius: '50px',
          boxShadow: '0 10px 30px rgba(42, 41, 40, 0.05)', border: '2px solid rgba(42, 41, 40, 0.1)',
          animation: 'rise 0.5s ease-out forwards', zIndex: 100, textAlign: 'center'
        }}>
          <p style={{ fontFamily: 'Instrument Sans', fontSize: '1.4rem', color: '#7A6D8C', margin: 0 }}>
            {greetings}
          </p>
        </div>
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
