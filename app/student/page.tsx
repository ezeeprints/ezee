'use client';

import React, { useState, useEffect } from 'react';
import styles from './student.module.css';
import StudentRoom from '../components/StudentRoom';
import PrintStudio from '../components/dashboard/PrintStudio';
import OrderHistory from '../components/dashboard/OrderHistory';
import Notifications from '../components/dashboard/Notifications';
import Payments from '../components/dashboard/Payments';
import Settings from '../components/dashboard/Settings';
import Reminders from '../components/dashboard/Reminders';
import DeskUI from '../components/dashboard/DeskUI';
import { audio } from '../components/AudioEngine';

export type CameraFocus = 'desk' | 'library' | 'utilities';
export type ActiveModal = 'none' | 'printer' | 'bookshelf' | 'mailbox' | 'wallet' | 'drawer' | 'clock' | 'desk';

export default function StudentDashboard() {
  const [cameraFocus, setCameraFocus] = useState<CameraFocus>('desk');
  const [activeModal, setActiveModal] = useState<ActiveModal>('none');
  const [isNight, setIsNight] = useState(false);
  const [greetings, setGreetings] = useState('Ready for another productive day?');

  // Set greeting based on time of day / night mode
  useEffect(() => {
    if (isNight) {
      setGreetings("Still studying? I'll stay with you.");
    } else {
      setGreetings("Ready for another productive day?");
    }
  }, [isNight]);

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
        return 'translateX(0vw)'; // Viewport covers 0 to 100vw (Library is at 20vw)
      case 'desk':
        return 'translateX(-100vw)'; // Viewport covers 100vw to 200vw (Desk is at 100vw)
      case 'utilities':
        return 'translateX(-200vw)'; // Viewport covers 200vw to 300vw (Utilities is at 220vw)
      default:
        return 'translateX(-100vw)';
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
      <div 
        className={styles.roomWorld} 
        style={{ transform: getCameraTransform() }}
      >
        <div className={styles.roomFloor} />
        
        {/* Pass interactions to the SVG Room */}
        <StudentRoom 
          isNight={isNight}
          toggleNight={() => { audio.playFeedbackClick(); setIsNight(!isNight); }}
          onPrinterClick={() => handleObjectClick('utilities', 'printer')}
          onBookshelfClick={() => handleObjectClick('library', 'bookshelf')}
          onMailboxClick={() => handleObjectClick('utilities', 'mailbox')}
          onWalletClick={() => handleObjectClick('desk', 'wallet')}
          onDrawerClick={() => handleObjectClick('desk', 'drawer')}
          onClockClick={() => handleObjectClick('desk', 'clock')}
          onDeskClick={() => handleObjectClick('desk', 'desk')} 
        />
      </div>

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

      {/* Tactile Modal UIs */}
      <div className={`${styles.uiOverlay} ${activeModal !== 'none' ? styles.active : ''}`}>
        
        {/* PRINT STUDIO */}
        {activeModal === 'printer' && (
          <PrintStudio onClose={closeModal} />
        )}

        {/* ORDER HISTORY */}
        {activeModal === 'bookshelf' && <OrderHistory onClose={closeModal} />}

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

      </div>
    </div>
  );
}
