import React from 'react';
import { Metadata } from 'next';
import WorkshopRoom from '../components/vendor/WorkshopRoom';

export const metadata: Metadata = {
  title: 'The Workshop',
};

export default function VendorPage() {
  return (
    <main style={{ overflow: 'hidden', width: '100vw', height: '100vh', background: '#2A1A0B' }}>
      <WorkshopRoom />
    </main>
  );
}
