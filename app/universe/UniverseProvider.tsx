'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type TimeOfDay = 'morning' | 'goldenHour' | 'night';
type Weather = 'clear' | 'rain';
type Season = 'normal' | 'examWeek' | 'placementSeason';

interface UniverseState {
  timeOfDay: TimeOfDay;
  weather: Weather;
  season: Season;
  ageInMinutes: number; // For the Twelfth Law: Everything ages
  setUniverseState: (updates: Partial<UniverseState>) => void;
}

const UniverseContext = createContext<UniverseState | undefined>(undefined);

export function UniverseProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Omit<UniverseState, 'setUniverseState'>>({
    timeOfDay: 'goldenHour', // Defaulting to Golden Hour
    weather: 'clear',
    season: 'placementSeason',
    ageInMinutes: 0,
  });

  // Track aging (Twelfth Law)
  useEffect(() => {
    const timer = setInterval(() => {
      setState(prev => ({ ...prev, ageInMinutes: prev.ageInMinutes + 1 }));
    }, 60000); // age 1 minute every 60s
    return () => clearInterval(timer);
  }, []);

  const setUniverseState = React.useCallback((updates: Partial<UniverseState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  return (
    <UniverseContext.Provider value={{ ...state, setUniverseState }}>
      <div className="universe-texture-overlay" />
      {/* Dynamic Background Application based on time and weather */}
      <div 
        style={{ 
          position: 'fixed', 
          inset: 0, 
          zIndex: -1, 
          pointerEvents: 'none',
          background: state.timeOfDay === 'morning' ? 'var(--light-morning)' : 
                      state.timeOfDay === 'goldenHour' ? 'var(--light-golden)' : 
                      state.weather === 'rain' ? 'var(--light-rain)' : 'var(--light-moon)',
          transition: 'background var(--spring-breathe)'
        }} 
      />
      {children}
    </UniverseContext.Provider>
  );
}

export function useUniverse() {
  const context = useContext(UniverseContext);
  if (!context) {
    throw new Error('useUniverse must be used within a UniverseProvider');
  }
  return context;
}
