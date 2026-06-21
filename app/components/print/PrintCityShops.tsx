'use client';

import React from 'react';
import styles from './print.module.css';

export interface Shop {
  id: string;
  name: string;
  personality: string;
  tagline: string;
  etaMin: number;
  etaMax: number;
  accent: string;
  bgTint: string;
}

export const SHOPS: Shop[] = [
  {
    id: 'cozy',
    name: 'Cozy Prints',
    personality: 'Warm • Quality • Plants',
    tagline: 'Like printing at a friend\'s.',
    etaMin: 20,
    etaMax: 35,
    accent: '#A9B59D',
    bgTint: 'rgba(169,181,157,0.08)',
  },
  {
    id: 'speedy',
    name: 'Speedy Press',
    personality: 'Fast • Chaotic • Rush',
    tagline: 'Blink and it\'s done.',
    etaMin: 5,
    etaMax: 12,
    accent: '#D48A70',
    bgTint: 'rgba(212,138,112,0.08)',
  },
  {
    id: 'student',
    name: 'Student Hub',
    personality: 'Busy • Affordable • Friendly',
    tagline: 'Students helping students.',
    etaMin: 15,
    etaMax: 25,
    accent: '#7A6D8C',
    bgTint: 'rgba(122,109,140,0.08)',
  },
  {
    id: 'prestige',
    name: 'Prestige Bindery',
    personality: 'Elegant • Premium • Slow',
    tagline: 'Worth every minute.',
    etaMin: 40,
    etaMax: 60,
    accent: '#C4956A',
    bgTint: 'rgba(196,149,106,0.08)',
  },
];

interface PrintCityShopsProps {
  selected: string;
  onSelect: (id: string) => void;
}

// Illustrated storefronts — each unique personality
function CozyPrintsStorefront() {
  return (
    <svg width="100%" height="70" viewBox="0 0 120 70" style={{ display: 'block' }}>
      {/* Building */}
      <rect x="10" y="20" width="100" height="50" rx="4" fill="#EAE4DD" stroke="rgba(42,41,40,0.15)" strokeWidth="1.5" />
      {/* Roof */}
      <path d="M 5 22 L 60 4 L 115 22 Z" fill="#A9B59D" stroke="rgba(42,41,40,0.15)" strokeWidth="1" />
      {/* Door */}
      <rect x="48" y="42" width="24" height="28" rx="12" fill="#C4956A" stroke="rgba(42,41,40,0.2)" strokeWidth="1" />
      <circle cx="70" cy="56" r="2" fill="#FAF7F1" />
      {/* Window */}
      <rect x="14" y="28" width="26" height="22" rx="2" fill="rgba(169,200,220,0.35)" stroke="rgba(42,41,40,0.15)" strokeWidth="1" />
      <rect x="88" y="28" width="22" height="22" rx="2" fill="rgba(169,200,220,0.35)" stroke="rgba(42,41,40,0.15)" strokeWidth="1" />
      {/* Plants in window */}
      <path d="M 19 38 Q 16 30 22 26" stroke="#A9B59D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="22" cy="26" r="5" fill="#A9B59D" opacity="0.8" />
      {/* Sign */}
      <rect x="35" y="18" width="50" height="8" rx="2" fill="#FAF7F1" stroke="rgba(42,41,40,0.15)" strokeWidth="0.5" />
      <text x="60" y="24.5" textAnchor="middle" fontFamily="Space Grotesk" fontSize="4.5" fill="#2A2928" fontWeight="700">COZY PRINTS</text>
    </svg>
  );
}

function SpeedyPressStorefront() {
  return (
    <svg width="100%" height="70" viewBox="0 0 120 70" style={{ display: 'block' }}>
      <rect x="8" y="18" width="104" height="52" rx="2" fill="#EAE4DD" stroke="rgba(42,41,40,0.15)" strokeWidth="1.5" />
      {/* Flat industrial roof */}
      <rect x="4" y="14" width="112" height="6" rx="1" fill="#D48A70" stroke="rgba(42,41,40,0.15)" strokeWidth="1" />
      {/* Busy window — chaotic papers */}
      <rect x="12" y="26" width="40" height="28" rx="2" fill="rgba(240,220,200,0.5)" stroke="rgba(42,41,40,0.15)" strokeWidth="1" />
      {[0,1,2].map(i => (
        <rect key={i} x={16 + i * 10} y={30 + i * 4} width="20" height="14" rx="1" fill="#FAF7F1" stroke="rgba(42,41,40,0.1)" strokeWidth="0.5" transform={`rotate(${-5+i*6} ${26 + i*10} ${37 + i*4})`} />
      ))}
      {/* Speed lines */}
      <line x1="58" y1="28" x2="74" y2="28" stroke="#D48A70" strokeWidth="2" strokeLinecap="round" />
      <line x1="62" y1="34" x2="74" y2="34" stroke="#D48A70" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="56" y1="40" x2="74" y2="40" stroke="#D48A70" strokeWidth="1" strokeLinecap="round" />
      {/* Clock */}
      <circle cx="96" cy="38" r="16" fill="#FAF7F1" stroke="rgba(42,41,40,0.2)" strokeWidth="1" />
      <line x1="96" y1="38" x2="96" y2="26" stroke="#2A2928" strokeWidth="2" strokeLinecap="round" />
      <line x1="96" y1="38" x2="104" y2="38" stroke="#D48A70" strokeWidth="2" strokeLinecap="round" />
      <text x="60" y="62" textAnchor="middle" fontFamily="Space Grotesk" fontSize="4.5" fill="#2A2928" fontWeight="700">SPEEDY PRESS</text>
    </svg>
  );
}

function StudentHubStorefront() {
  return (
    <svg width="100%" height="70" viewBox="0 0 120 70" style={{ display: 'block' }}>
      <rect x="10" y="22" width="100" height="48" rx="3" fill="#EAE4DD" stroke="rgba(42,41,40,0.15)" strokeWidth="1.5" />
      {/* Triangular banner */}
      <path d="M 20 22 L 60 8 L 100 22 Z" fill="#7A6D8C" />
      {/* Bunting */}
      <path d="M 15 22 Q 35 16 55 22 Q 75 16 95 22 Q 105 16 115 22" fill="none" stroke="#D48A70" strokeWidth="1.5" />
      {[1,2,3,4].map(i => (
        <path key={i} d={`M ${15 + i * 20} 22 L ${25 + i * 20} 22 L ${20 + i * 20} 28 Z`} fill="#D48A70" />
      ))}
      {/* Busy crowd of tiny people silhouettes */}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <circle cx={20 + i * 18} cy={52} r={3.5} fill="rgba(42,41,40,0.3)" />
          <rect x={16.5 + i * 18} y={55} width={7} height={8} rx={1} fill="rgba(42,41,40,0.2)" />
        </g>
      ))}
      {/* Budget tag */}
      <rect x="78" y="30" width="28" height="14" rx="3" fill="#A9B59D" />
      <text x="92" y="40" textAnchor="middle" fontFamily="Space Grotesk" fontSize="5" fill="#FAF7F1" fontWeight="700">Budget</text>
      <text x="60" y="66" textAnchor="middle" fontFamily="Space Grotesk" fontSize="4.5" fill="#2A2928" fontWeight="700">STUDENT HUB</text>
    </svg>
  );
}

function PrestigeBinderyStorefront() {
  return (
    <svg width="100%" height="70" viewBox="0 0 120 70" style={{ display: 'block' }}>
      <rect x="12" y="18" width="96" height="52" rx="6" fill="#2A2928" />
      {/* Gold trim */}
      <rect x="14" y="20" width="92" height="48" rx="5" fill="none" stroke="#C4956A" strokeWidth="1.5" />
      {/* Embossed window details */}
      <rect x="20" y="26" width="30" height="28" rx="3" fill="none" stroke="#C4956A" strokeWidth="1" />
      <rect x="22" y="28" width="26" height="24" rx="2" fill="rgba(196,149,106,0.15)" />
      {/* Books visible through window */}
      {[0,1,2].map(i => (
        <rect key={i} x={24 + i * 8} y={30} width={6} height={18} rx={1} fill={['#D48A70','#7A6D8C','#A9B59D'][i]} />
      ))}
      {/* Elegant door */}
      <rect x="56" y="40" width="20" height="30" rx="2" fill="none" stroke="#C4956A" strokeWidth="1.5" />
      <circle cx="74" cy="55" r="1.5" fill="#C4956A" />
      {/* Fancy arch above door */}
      <path d="M 56 42 Q 66 32 76 42" fill="none" stroke="#C4956A" strokeWidth="1.5" />
      {/* Gold lettering */}
      <rect x="78" y="26" width="26" height="22" rx="2" fill="rgba(196,149,106,0.12)" stroke="#C4956A" strokeWidth="0.5" />
      <text x="91" y="37" textAnchor="middle" fontFamily="Instrument Sans" fontSize="4" fill="#C4956A" fontWeight="700">PRESTIGE</text>
      <text x="91" y="43" textAnchor="middle" fontFamily="Space Grotesk" fontSize="3.5" fill="#C4956A">BINDERY</text>
    </svg>
  );
}

const storefronts: Record<string, React.ReactNode> = {
  cozy: <CozyPrintsStorefront />,
  speedy: <SpeedyPressStorefront />,
  student: <StudentHubStorefront />,
  prestige: <PrestigeBinderyStorefront />,
};

export default function PrintCityShops({ selected, onSelect }: PrintCityShopsProps) {
  return (
    <div className={styles.shopsGrid}>
      {SHOPS.map(shop => (
        <div
          key={shop.id}
          className={`${styles.shopStorefront} ${selected === shop.id ? styles.selected : ''}`}
          onClick={() => onSelect(shop.id)}
          style={{
            background: selected === shop.id ? shop.bgTint : undefined,
            borderColor: selected === shop.id ? shop.accent : undefined,
          }}
        >
          {/* Illustrated storefront */}
          {storefronts[shop.id]}

          <h4 className={styles.shopName}>{shop.name}</h4>
          <p className={styles.shopPersonality}>{shop.personality}</p>
          <p className={styles.shopEta}>~{shop.etaMin}–{shop.etaMax} min</p>
        </div>
      ))}
    </div>
  );
}
