import type { Metadata } from 'next';
import LastNightRoom from './LastNightRoom';

export const metadata: Metadata = {
  title: 'The Last Night — Ezi\'s Desk',
  description: 'A quiet room. A golden evening. The end of one chapter.',
};

export default function GraduationPage() {
  return <LastNightRoom />;
}
