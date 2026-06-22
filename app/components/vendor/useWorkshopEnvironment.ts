'use client';

import { useState, useEffect } from 'react';

export type TimeOfDay = 'morning' | 'afternoon' | 'sunset' | 'night';
export type Weather = 'clear' | 'rain';

interface EnvironmentState {
  timeOfDay: TimeOfDay;
  weather: Weather;
  isClosingTime: boolean;
}

export function useWorkshopEnvironment() {
  const [env, setEnv] = useState<EnvironmentState>({
    timeOfDay: 'afternoon',
    weather: 'clear',
    isClosingTime: false,
  });

  useEffect(() => {
    const calculateEnvironment = () => {
      const now = new Date();
      const hour = now.getHours();

      let timeOfDay: TimeOfDay = 'afternoon';
      if (hour >= 5 && hour < 11) timeOfDay = 'morning';
      else if (hour >= 11 && hour < 17) timeOfDay = 'afternoon';
      else if (hour >= 17 && hour < 19) timeOfDay = 'sunset';
      else timeOfDay = 'night';

      // Closing time is late night or very early morning
      const isClosingTime = hour >= 22 || hour < 6;
      
      // Random subtle weather changes
      const weather: Weather = Math.random() > 0.8 ? 'rain' : 'clear';

      setEnv({ timeOfDay, weather, isClosingTime });
    };

    calculateEnvironment();
    const interval = setInterval(calculateEnvironment, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleClosingTime = () => {
    setEnv(prev => ({
      ...prev,
      isClosingTime: !prev.isClosingTime,
      timeOfDay: !prev.isClosingTime ? 'night' : 'afternoon'
    }));
  };

  return { env, toggleClosingTime };
}
