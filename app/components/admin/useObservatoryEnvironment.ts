'use client';

import { useState, useEffect } from 'react';

export type TimeOfDay = 'morning' | 'afternoon' | 'sunset' | 'night';
export type Season = 'spring' | 'summer' | 'monsoon' | 'autumn' | 'winter';
export type Festival = 'none' | 'diwali' | 'christmas' | 'ramadan';
export type Weather = 'clear' | 'rain' | 'cloudy' | 'snow';

interface EnvironmentState {
  timeOfDay: TimeOfDay;
  season: Season;
  festival: Festival;
  weather: Weather;
  isExamSeason: boolean;
  systemHealth: 'peaceful' | 'stressed'; // Based on queue pressure (mocked for now)
}

export function useObservatoryEnvironment() {
  const [env, setEnv] = useState<EnvironmentState>({
    timeOfDay: 'afternoon',
    season: 'spring',
    festival: 'none',
    weather: 'clear',
    isExamSeason: false,
    systemHealth: 'peaceful',
  });

  useEffect(() => {
    // Calculate based on real-world time
    const calculateEnvironment = () => {
      const now = new Date();
      const month = now.getMonth(); // 0-11
      const hour = now.getHours(); // 0-23

      // Time of day
      let timeOfDay: TimeOfDay = 'afternoon';
      if (hour >= 5 && hour < 11) timeOfDay = 'morning';
      else if (hour >= 11 && hour < 17) timeOfDay = 'afternoon';
      else if (hour >= 17 && hour < 19) timeOfDay = 'sunset';
      else timeOfDay = 'night';

      // Season (Approximated for India/Northern Hemisphere)
      let season: Season = 'summer';
      if (month >= 2 && month <= 4) season = 'spring';
      else if (month >= 5 && month <= 8) season = 'monsoon'; // June-Sept
      else if (month >= 9 && month <= 10) season = 'autumn';
      else if (month === 11 || month <= 1) season = 'winter';

      // Festivals (Hardcoded rough dates for demo)
      let festival: Festival = 'none';
      if (month === 9 || month === 10) festival = 'diwali'; // Oct/Nov roughly
      if (month === 11) festival = 'christmas';
      if (month === 2 || month === 3) festival = 'ramadan'; // Moving target, rough estimate

      // Exam Season (Usually May/June and Nov/Dec)
      const isExamSeason = (month === 4 || month === 5 || month === 10 || month === 11);

      // Weather logic (influenced by season but can be overridden by system stress)
      let weather: Weather = 'clear';
      if (season === 'monsoon' && Math.random() > 0.5) weather = 'rain';
      if (season === 'winter' && timeOfDay === 'night' && festival === 'christmas') weather = 'snow';

      setEnv(prev => ({
        ...prev,
        timeOfDay,
        season,
        festival,
        weather,
        isExamSeason
      }));
    };

    calculateEnvironment();
    // Update every minute
    const interval = setInterval(calculateEnvironment, 60000);
    return () => clearInterval(interval);
  }, []);

  // Allow manual override for demo purposes
  const setSystemHealth = (health: 'peaceful' | 'stressed') => {
    setEnv(prev => ({
      ...prev,
      systemHealth: health,
      // Stress induces rain/clouds to reflect ecosystem pressure
      weather: health === 'stressed' ? 'rain' : (prev.season === 'monsoon' ? 'rain' : 'clear')
    }));
  };

  return { env, setSystemHealth };
}
