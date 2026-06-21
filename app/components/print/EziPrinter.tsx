'use client';

import React from 'react';

type EziPrinterState = 'idle' | 'waiting' | 'success' | 'error' | 'makingCoffee' | 'organizingPapers' | 'adjustingBookmarks' | 'reading';

interface EziPrinterProps {
  state: EziPrinterState;
  isNight?: boolean;
  copies?: number;
}

export default function EziPrinter({ state, isNight = false, copies = 1 }: EziPrinterProps) {
  const isStraining = copies > 50;

  return (
    <svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <filter id="eziShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#2A2928" floodOpacity="0.12" />
        </filter>
        <filter id="lampGlow">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g filter="url(#eziShadow)">
        {/* Body — coffee ink drop */}
        <path
          d="M 100 35 C 138 35, 165 82, 174 148 C 178 186, 155 228, 100 228 C 45 228, 22 186, 26 148 C 35 82, 62 35, 100 35 Z"
          fill="#2A2928"
        />

        {/* White face */}
        <ellipse cx="100" cy="115" rx="55" ry="42" fill="#FAF7F1" />

        {/* Warm Eyes */}
        {state === 'success' ? (
          <>
            <path d="M 80 110 Q 88 102 92 110" stroke="#2A2928" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M 108 110 Q 116 102 120 110" stroke="#2A2928" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </>
        ) : state === 'error' ? (
          <>
            <circle cx="86" cy="110" r="4.5" fill="#2A2928" />
            <circle cx="114" cy="110" r="4.5" fill="#2A2928" />
            <path d="M 77 100 Q 86 95 91 100" stroke="#2A2928" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 109 100 Q 114 95 123 100" stroke="#2A2928" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        ) : state === 'reading' || state === 'waiting' ? (
          <>
            <path d="M 80 113 Q 86 109 92 113" stroke="#2A2928" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 108 113 Q 114 109 120 113" stroke="#2A2928" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="86" cy="110" r="5" fill="#2A2928" />
            <circle cx="87.5" cy="108.5" r="1.8" fill="#FAF7F1" />
            <circle cx="114" cy="110" r="5" fill="#2A2928" />
            <circle cx="115.5" cy="108.5" r="1.8" fill="#FAF7F1" />
          </>
        )}

        {/* Blush cheeks */}
        <ellipse cx="66" cy="124" rx="11" ry="7" fill="#D48A70" opacity="0.55" />
        <ellipse cx="134" cy="124" rx="11" ry="7" fill="#D48A70" opacity="0.55" />

        {/* Mouth */}
        {state === 'error' ? (
          <path d="M 95 128 Q 100 124 105 128" stroke="#2A2928" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        ) : state === 'success' ? (
          <path d="M 94 127 Q 100 136 106 127" stroke="#2A2928" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M 96 127 Q 100 130 104 127" stroke="#2A2928" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}

        {/* Apron — distinctive from beret outfit */}
        {isNight ? (
          // Night: pajamas + apron
          <g>
            {/* Striped pajama top */}
            <path d="M 55 145 C 78 155, 122 155, 145 145 C 154 172, 138 212, 100 212 C 62 212, 46 172, 55 145 Z" fill="#EAE4DD" />
            <path d="M 65 150 L 72 208 M 90 154 L 90 212 M 110 154 L 110 212 M 128 150 L 122 208" stroke="#7A6D8C" strokeWidth="3.5" />
            {/* Apron over pajamas */}
            <path d="M 78 148 L 122 148 L 118 200 Q 100 208 82 200 Z" fill="rgba(212,138,112,0.3)" stroke="#D48A70" strokeWidth="1.5" />
            {/* Sleeping cap */}
            <path d="M 62 52 C 80 18, 128 18, 138 52 C 156 74, 166 112, 175 122 C 180 127, 180 136, 170 136 C 160 136, 156 122, 146 102 C 136 74, 108 46, 80 54 Z" fill="#7A6D8C" />
            <ellipse cx="100" cy="52" rx="38" ry="9" fill="#EAE4DD" />
            <circle cx="178" cy="129" r="7" fill="#EAE4DD" />
          </g>
        ) : (
          // Day: apron + tiny goggles + rolled sleeves
          <g>
            {/* Apron body */}
            <path d="M 72 145 L 128 145 L 124 210 Q 100 220 76 210 Z" fill="#EAE4DD" stroke="rgba(42,41,40,0.15)" strokeWidth="1.5" />
            {/* Apron strings */}
            <path d="M 72 145 Q 60 130 65 118" stroke="#EAE4DD" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M 128 145 Q 140 130 135 118" stroke="#EAE4DD" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* Apron pocket */}
            <rect x="88" y="168" width="24" height="18" rx="3" fill="rgba(42,41,40,0.08)" stroke="rgba(42,41,40,0.12)" strokeWidth="1" />
            {/* Pencil in pocket */}
            <rect x="98" y="165" width="4" height="22" rx="2" fill="#F4D03F" />
            <polygon points="98,165 102,165 100,159" fill="#E5E7E9" />

            {/* Tiny goggles on forehead */}
            <g transform="translate(0, -8)">
              <circle cx="87" cy="55" r="8" fill="none" stroke="#C4956A" strokeWidth="2" />
              <circle cx="113" cy="55" r="8" fill="none" stroke="#C4956A" strokeWidth="2" />
              <circle cx="87" cy="55" r="6" fill="rgba(212,138,112,0.2)" />
              <circle cx="113" cy="55" r="6" fill="rgba(212,138,112,0.2)" />
              <line x1="95" y1="55" x2="105" y2="55" stroke="#C4956A" strokeWidth="2" />
              <path d="M 79 53 Q 73 48 70 50" stroke="#C4956A" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 121 53 Q 127 48 130 50" stroke="#C4956A" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>

            {/* Pencil behind ear */}
            <g transform="translate(130, 52) rotate(40)">
              <rect x="0" y="0" width="7" height="36" fill="#F4D03F" rx="2" />
              <polygon points="0,36 7,36 3.5,44" fill="#E5E7E9" />
              <polygon points="1.5,40 5.5,40 3.5,44" fill="#2A2928" />
              <rect x="0" y="-4" width="7" height="4" fill="#E74C3C" rx="1" />
            </g>
          </g>
        )}

        {/* Arms based on state */}
        <g style={{ transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)' }}>
          {state === 'makingCoffee' && (
            // Holding coffee cup
            <g>
              <path d="M 42 160 C 36 180, 38 200, 55 210" stroke="#2A2928" strokeWidth="16" strokeLinecap="round" fill="none" />
              <path d="M 158 160 C 164 175, 160 195, 148 205" stroke="#2A2928" strokeWidth="16" strokeLinecap="round" fill="none" />
              {/* Cup */}
              <rect x="135" y="195" width="25" height="20" rx="3" fill="#FAF7F1" stroke="#2A2928" strokeWidth="2" />
              <path d="M 158 200 Q 167 200 167 210 Q 167 220 158 215" fill="none" stroke="#FAF7F1" strokeWidth="3" />
            </g>
          )}

          {state === 'organizingPapers' && (
            // Shuffling papers
            <g>
              <path d="M 42 155 C 35 170, 45 185, 65 190" stroke="#2A2928" strokeWidth="16" strokeLinecap="round" fill="none" />
              <path d="M 158 155 C 165 170, 155 185, 135 190" stroke="#2A2928" strokeWidth="16" strokeLinecap="round" fill="none" />
              {/* Paper stack in arms */}
              <rect x="62" y="185" width="36" height="28" rx="2" fill="#FAF7F1" stroke="#2A2928" strokeWidth="1.5" transform="rotate(-5 80 200)" />
              <rect x="58" y="190" width="36" height="28" rx="2" fill="#FAF7F1" stroke="#2A2928" strokeWidth="1.5" transform="rotate(3 76 206)" />
            </g>
          )}

          {state === 'adjustingBookmarks' && (
            // Holding bookmark
            <g>
              <path d="M 42 155 C 36 175, 50 195, 70 195" stroke="#2A2928" strokeWidth="16" strokeLinecap="round" fill="none" />
              <path d="M 158 155 C 164 175, 150 195, 130 195" stroke="#2A2928" strokeWidth="16" strokeLinecap="round" fill="none" />
              {/* Book with bookmark */}
              <rect x="68" y="185" width="30" height="22" rx="2" fill="#D48A70" stroke="#2A2928" strokeWidth="1.5" />
              <rect x="76" y="178" width="6" height="18" fill="#A9B59D" />
            </g>
          )}

          {state === 'reading' && (
            // Holding open book
            <g>
              <path d="M 40 155 C 34 170, 40 195, 60 200" stroke="#2A2928" strokeWidth="16" strokeLinecap="round" fill="none" />
              <path d="M 160 155 C 166 170, 160 195, 140 200" stroke="#2A2928" strokeWidth="16" strokeLinecap="round" fill="none" />
              {/* Open book */}
              <path d="M 58 200 Q 76 210 94 200 L 94 232 Q 76 242 58 232 Z" fill="#FAF7F1" stroke="#2A2928" strokeWidth="1.5" />
              <path d="M 94 200 Q 112 210 130 200 L 130 232 Q 112 242 94 232 Z" fill="#FAF7F1" stroke="#2A2928" strokeWidth="1.5" />
              {/* Book lines */}
              <line x1="62" y1="212" x2="90" y2="210" stroke="#EAE4DD" strokeWidth="1.5" />
              <line x1="62" y1="218" x2="90" y2="216" stroke="#EAE4DD" strokeWidth="1.5" />
              <line x1="98" y1="212" x2="126" y2="210" stroke="#EAE4DD" strokeWidth="1.5" />
            </g>
          )}

          {state === 'success' && (
            // Celebrating — arms raised
            <g>
              <path d="M 42 170 C 20 140, 15 110, 30 90 C 40 78, 52 95, 48 115" stroke="#2A2928" strokeWidth="16" strokeLinecap="round" fill="none" />
              <path d="M 158 170 C 180 140, 185 110, 170 90 C 160 78, 148 95, 152 115" stroke="#2A2928" strokeWidth="16" strokeLinecap="round" fill="none" />
              {/* Confetti sparks */}
              <circle cx="22" cy="80" r="4" fill="#D48A70" />
              <circle cx="40" cy="65" r="3" fill="#A9B59D" />
              <circle cx="175" cy="78" r="4" fill="#7A6D8C" />
              <circle cx="160" cy="62" r="3" fill="#D48A70" />
            </g>
          )}

          {state === 'error' && (
            // Dropping papers — arms low
            <g>
              <path d="M 42 170 C 38 195, 50 215, 65 220" stroke="#2A2928" strokeWidth="16" strokeLinecap="round" fill="none" />
              <path d="M 158 170 C 162 190, 158 210, 148 218" stroke="#2A2928" strokeWidth="16" strokeLinecap="round" fill="none" />
              {/* Falling papers */}
              <rect x="62" y="218" width="22" height="30" fill="#FAF7F1" stroke="#2A2928" strokeWidth="1.5" transform="rotate(35 73 233)" />
              <rect x="140" y="215" width="22" height="30" fill="#FAF7F1" stroke="#2A2928" strokeWidth="1.5" transform="rotate(-25 151 230)" />
            </g>
          )}

          {(state === 'idle' || state === 'waiting') && (
            // Idle: sketching quietly
            <g>
              <path d="M 42 162 C 36 180, 44 200, 66 205" stroke="#2A2928" strokeWidth="16" strokeLinecap="round" fill="none" />
              <path d="M 158 162 C 164 175, 158 198, 138 205" stroke="#2A2928" strokeWidth="16" strokeLinecap="round" fill="none" />
              {/* Pencil sketching */}
              {!isStraining && (
                <g transform="rotate(-30 138 210)">
                  <rect x="132" y="200" width="6" height="28" fill="#F4D03F" rx="2" />
                  <polygon points="132,228 138,228 135,238" fill="#E5E7E9" />
                  <polygon points="133.5,233 136.5,233 135,238" fill="#2A2928" />
                </g>
              )}
              {/* Ezi straining under big stack */}
              {isStraining && (
                <g>
                  {/* Sweat drop */}
                  <ellipse cx="148" cy="70" rx="4" ry="6" fill="#A9B59D" opacity="0.6" />
                  {/* Heavy papers leaning on Ezi */}
                  {[0,1,2,3,4].map(i => (
                    <rect
                      key={i}
                      x={56 + i * 2}
                      y={192 - i * 3}
                      width="44"
                      height="32"
                      rx="1"
                      fill="#FAF7F1"
                      stroke="rgba(42,41,40,0.1)"
                      strokeWidth="1"
                      transform={`rotate(${-2 + i * 0.8} 78 208)`}
                    />
                  ))}
                </g>
              )}
            </g>
          )}
        </g>

        {/* Night mode lamp glow */}
        {isNight && (
          <ellipse cx="100" cy="50" rx="60" ry="40" fill="#F4D03F" opacity="0.06" />
        )}
      </g>
    </svg>
  );
}
