'use client';

import React from 'react';
import PrintDesk from '../print/PrintDesk';

interface PrintStudioProps {
  onClose: () => void;
  isNight?: boolean;
}

/**
 * PrintStudio — thin wrapper that mounts the full Print Studio ritual experience.
 * The actual implementation lives in app/components/print/PrintDesk.tsx.
 */
export default function PrintStudio({ onClose, isNight }: PrintStudioProps) {
  return <PrintDesk onClose={onClose} isNight={isNight} />;
}
