import { useState, useEffect } from 'react';

export interface PrintedFile {
  id: string;
  name: string;
  type: 'exam' | 'resume' | 'project' | 'lab' | 'general';
  timestamp: string;
  pageCount: number;
  copies: number;
  binding: string;
  shopName: string;
  weather: string;
  isLateNight: boolean;
}

export interface MemoryState {
  visits: number;
  orders: number;
  isExamSeason: boolean;
  isFestival: boolean;
  isLateNight: boolean;
  totalPrintedPages: number;
  books: number;
  coffeeMugs: number;
  plantStage: 1 | 2 | 3;
  stickyNotes: { id: string; text: string; color: string; rotate: number }[];
  printedFiles: PrintedFile[];
}

export function useMemorySystem() {
  const [memory, setMemory] = useState<MemoryState>({
    visits: 1,
    orders: 0,
    isExamSeason: false,
    isFestival: false,
    isLateNight: false,
    totalPrintedPages: 0,
    books: 1,
    coffeeMugs: 0,
    plantStage: 1,
    stickyNotes: [],
    printedFiles: [],
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const visits = parseInt(localStorage.getItem('ezee_print_visits') || '1', 10);
    const orders = parseInt(localStorage.getItem('ezee_print_orders') || '0', 10);
    const pages = parseInt(localStorage.getItem('ezee_print_pages') || '0', 10);
    const books = parseInt(localStorage.getItem('ezee_print_books') || '1', 10);
    const mugs = parseInt(localStorage.getItem('ezee_print_mugs') || '0', 10);
    const rawPlantStage = parseInt(localStorage.getItem('ezee_print_plant') || '1', 10);
    const plantStage = (rawPlantStage > 3 ? 3 : rawPlantStage < 1 ? 1 : rawPlantStage) as 1 | 2 | 3;
    
    let stickyNotes = [];
    try {
      stickyNotes = JSON.parse(localStorage.getItem('ezee_print_notes') || '[]');
    } catch {
      stickyNotes = [];
    }

    let printedFiles = [];
    try {
      printedFiles = JSON.parse(localStorage.getItem('ezee_printed_files') || '[]');
    } catch {
      printedFiles = [];
    }

    // Increment visits
    const newVisits = visits + 1;
    localStorage.setItem('ezee_print_visits', newVisits.toString());

    // Time calculations
    const date = new Date();
    const month = date.getMonth(); // 0-11
    const hour = date.getHours();
    
    // Exam seasons: May (4) and November (10)
    const isExamSeason = month === 4 || month === 10;
    
    // Festivals: October (9), November (10), December (11)
    const isFestival = month >= 9;

    // Late night: 11 PM to 4 AM
    const isLateNight = hour >= 23 || hour <= 4;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMemory({
      visits: newVisits,
      orders,
      isExamSeason,
      isFestival,
      isLateNight,
      totalPrintedPages: pages,
      books,
      coffeeMugs: mugs,
      plantStage,
      stickyNotes,
      printedFiles,
    });
  }, []);

  // Update order count and memories when an order is completed
  const trackOrder = (
    docName: string,
    docType: 'exam' | 'resume' | 'project' | 'lab' | 'general',
    pages: number,
    copies: number,
    binding: string,
    shopName: string,
    isNightState: boolean
  ) => {
    if (typeof window === 'undefined') return;
    
    const newOrders = memory.orders + 1;
    const newPages = memory.totalPrintedPages + (pages * copies);
    
    // Memory progression logic
    const newBooks = Math.min(memory.books + (newOrders % 2 === 0 ? 1 : 0), 12); // Add a book every 2 orders
    const newMugs = Math.min(memory.coffeeMugs + (newOrders % 3 === 0 ? 1 : 0), 4); // Add a mug every 3 orders
    const newPlantStage = newPages > 100 ? 3 : newPages > 30 ? 2 : 1; // Plant grows based on pages printed
    
    const date = new Date();
    const hour = date.getHours();
    const isLateNight = hour >= 23 || hour <= 4;

    const newFile: PrintedFile = {
      id: Date.now().toString(),
      name: docName,
      type: docType,
      timestamp: date.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      pageCount: pages,
      copies,
      binding,
      shopName,
      weather: isNightState ? 'Midnight' : 'Sunny',
      isLateNight
    };

    const newPrintedFiles = [...memory.printedFiles, newFile];

    localStorage.setItem('ezee_print_orders', newOrders.toString());
    localStorage.setItem('ezee_print_pages', newPages.toString());
    localStorage.setItem('ezee_print_books', newBooks.toString());
    localStorage.setItem('ezee_print_mugs', newMugs.toString());
    localStorage.setItem('ezee_print_plant', newPlantStage.toString());
    localStorage.setItem('ezee_printed_files', JSON.stringify(newPrintedFiles));
    
    setMemory(prev => ({
      ...prev,
      orders: newOrders,
      totalPrintedPages: newPages,
      books: newBooks,
      coffeeMugs: newMugs,
      plantStage: newPlantStage as 1 | 2 | 3,
      printedFiles: newPrintedFiles,
    }));
  };

  const addStickyNote = (text: string, color: string = '#F4D03F') => {
    if (typeof window === 'undefined') return;
    const newNote = {
      id: Date.now().toString(),
      text,
      color,
      rotate: Math.floor(Math.random() * 10) - 5, // -5 to 5 degrees
    };
    const newNotes = [...memory.stickyNotes, newNote].slice(-5); // Keep max 5 notes
    localStorage.setItem('ezee_print_notes', JSON.stringify(newNotes));
    setMemory(prev => ({ ...prev, stickyNotes: newNotes }));
  };

  return { memory, trackOrder, addStickyNote };
}
