import { useState, useEffect } from 'react';

interface MemoryState {
  visits: number;
  orders: number;
  isExamSeason: boolean;
  isFestival: boolean;
  totalPrintedPages: number;
}

export function useMemorySystem() {
  const [memory, setMemory] = useState<MemoryState>({
    visits: 1,
    orders: 0,
    isExamSeason: false,
    isFestival: false,
    totalPrintedPages: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const visits = parseInt(localStorage.getItem('ezee_print_visits') || '0', 10);
    const orders = parseInt(localStorage.getItem('ezee_print_orders') || '0', 10);
    const pages = parseInt(localStorage.getItem('ezee_print_pages') || '0', 10);
    
    const date = new Date();
    const month = date.getMonth(); // 0-11
    
    // Exam seasons: May (4) and November (10)
    const isExamSeason = month === 4 || month === 10;
    
    // Festivals: October (9), November (10), December (11)
    const isFestival = month >= 9;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMemory({
      visits,
      orders,
      isExamSeason,
      isFestival,
      totalPrintedPages: pages,
    });
  }, []);

  // Update order count and total pages when an order is completed
  const trackOrder = (pages: number, copies: number) => {
    if (typeof window === 'undefined') return;
    
    const newOrders = memory.orders + 1;
    const newPages = memory.totalPrintedPages + (pages * copies);
    
    localStorage.setItem('ezee_print_orders', newOrders.toString());
    localStorage.setItem('ezee_print_pages', newPages.toString());
    
    setMemory(prev => ({
      ...prev,
      orders: newOrders,
      totalPrintedPages: newPages,
    }));
  };

  return { memory, trackOrder };
}
