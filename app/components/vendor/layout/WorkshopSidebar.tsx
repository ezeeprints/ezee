'use client';

import React from 'react';
import Image from 'next/image';
import { useWorkshop } from './WorkshopContext';
import { Ic } from './WorkshopIcons';

const navItems: [string, string, string][] = [
  ['box', 'Print Queue', 'queue'],
  ['bench', 'Station Management', 'stations'],
  ['stock', 'Stock & Supply', 'stock'],
];

function eziSVG(mood: 'calm' | 'focused' | 'happy' | 'sleepy') {
  const eyes: Record<string, string> = {
    calm: '<circle cx="84" cy="104" r="5" fill="#2A2928"/><circle cx="116" cy="104" r="5" fill="#2A2928"/>',
    focused: '<circle cx="84" cy="104" r="14" fill="none" stroke="#2A2928" stroke-width="3"/><circle cx="116" cy="104" r="14" fill="none" stroke="#2A2928" stroke-width="3"/><circle cx="84" cy="104" r="4" fill="#2A2928"/><circle cx="116" cy="104" r="4" fill="#2A2928"/>',
    happy: '<path d="M74 105 Q84 95 90 105" stroke="#2A2928" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M110 105 Q116 95 126 105" stroke="#2A2928" stroke-width="4" fill="none" stroke-linecap="round"/>',
    sleepy: '<path d="M76 105 Q84 109 92 105" stroke="#2A2928" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M108 105 Q116 109 124 105" stroke="#2A2928" stroke-width="3.5" fill="none" stroke-linecap="round"/>',
  };
  const mouth = mood === 'happy'
    ? '<path d="M94 123 Q100 133 106 123" stroke="#2A2928" stroke-width="3" fill="none" stroke-linecap="round"/>'
    : mood === 'sleepy'
    ? '<ellipse cx="100" cy="125" rx="4" ry="5" fill="#2A2928" opacity=".7"/>'
    : '<path d="M96 124 Q100 127 104 124" stroke="#2A2928" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
  const zzz = mood === 'sleepy'
    ? '<text x="150" y="40" font-family="Space Grotesk" font-size="16" fill="#9A9183">z</text><text x="162" y="26" font-family="Space Grotesk" font-size="20" fill="#9A9183">z</text>'
    : '';
  return `<svg viewBox="0 0 200 250" width="74" height="90">
    <defs><filter id="ss2" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#2A2928" flood-opacity=".15"/></filter></defs>
    ${zzz}
    <g filter="url(#ss2)">
      <path d="M100 30 C140 30 170 80 180 150 C185 190 160 230 100 230 C40 230 15 190 20 150 C30 80 60 30 100 30 Z" fill="#2A2928"/>
      <ellipse cx="100" cy="108" rx="58" ry="44" fill="#FAF7F1"/>
      ${eyes[mood] || eyes.calm}
      <ellipse cx="66" cy="120" rx="11" ry="7" fill="#D48A70" opacity=".55"/>
      <ellipse cx="134" cy="120" rx="11" ry="7" fill="#D48A70" opacity=".55"/>
      ${mouth}
      <path d="M72 150 L128 150 L138 205 L62 205 Z" fill="#5C3D1D"/>
      <path d="M72 150 L58 124 M128 150 L142 124" stroke="#36220E" stroke-width="5" fill="none" stroke-linecap="round"/>
      <rect x="90" y="168" width="20" height="16" rx="2" fill="#36220E"/>
      <line x1="96" y1="160" x2="96" y2="172" stroke="#D4AF37" stroke-width="3" stroke-linecap="round"/>
      <g transform="translate(12,-8) rotate(-10 100 40)"><ellipse cx="100" cy="40" rx="34" ry="14" fill="#A9B59D"/><path d="M100 26 L102 19 L98 19 Z" fill="#A9B59D"/></g>
    </g>
  </svg>`;
}

export function WorkshopSidebar() {
  const { section, setSection, counts, shopOpen, toggleOpen } = useWorkshop();

  // Simple reactive mood logic
  let eziMoodState: 'calm' | 'focused' | 'happy' | 'sleepy' = 'calm';
  let eziSayText = "Just another quiet day...";
  if (!shopOpen) { eziMoodState = 'sleepy'; eziSayText = "Zzz... shop's closed."; }
  else if (counts.new > 0) { eziMoodState = 'focused'; eziSayText = "New prints dropping in!"; }
  else if (counts.printing > 0) { eziMoodState = 'calm'; eziSayText = "Machines are humming."; }
  else if (counts.ready > 0) { eziMoodState = 'happy'; eziSayText = "Lots of pickups waiting!"; }

  return (
    <aside className="ws-rail">
      <div className="ws-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Image src="/logo.png" alt="Ezee Logo" width={100} height={34} style={{ height: 34, width: 'auto', objectFit: 'contain', borderRadius: '22%' }} />
        <div><small>Workshop</small></div>
      </div>

      <div className="ws-ezi-card">
        <div className="ws-ezi-glow" />
        <div className="ws-ezi-breathe" dangerouslySetInnerHTML={{ __html: eziSVG(eziMoodState) }} />
        <div className="ws-ezi-say">{eziSayText}</div>
      </div>

      <nav className="ws-nav">
        {navItems.map(([ic, label, key]) => (
          <button key={key} className={section === key ? 'on' : ''} onClick={() => setSection(key)}>
            <span className="ic"><Ic name={ic} size={17} /></span>
            <span>{label}</span>
            {key === 'queue' && <span className="ws-count">{counts.new}</span>}
          </button>
        ))}
        <button onClick={() => {
          document.cookie = "ezee_vendor_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.href = '/workshop/login';
        }} style={{ marginTop: '2rem', opacity: 0.6 }}>
          <span className="ic"><Ic name="x" size={17} /></span>
          <span>Sign out</span>
        </button>
      </nav>

      <div style={{ flex: 1 }} />
      <div className="ws-rail-foot">
        <div className="ws-toggle">
          <span>{shopOpen ? 'Shop open' : 'Shop closed'}</span>
          <button className={`ws-sw${shopOpen ? ' on' : ''}`} onClick={toggleOpen} aria-label="Toggle shop open status" />
        </div>
        <div className="ws-toggle">
          <span>Ambient sound</span>
          <button className="ws-sw brass" onClick={e => (e.currentTarget as HTMLButtonElement).classList.toggle('on')} aria-label="Toggle ambient sound" />
        </div>
      </div>
    </aside>
  );
}
