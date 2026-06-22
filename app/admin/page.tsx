import React from 'react';
import { Metadata } from 'next';
import ObservatoryRoom from '@/app/components/admin/ObservatoryRoom';

export const metadata: Metadata = {
  title: 'The Observatory',
  description: 'A quiet place to watch over Print City.',
};

export default function AdminPage() {
  return (
    <main>
      <ObservatoryRoom />
    </main>
  );
}
