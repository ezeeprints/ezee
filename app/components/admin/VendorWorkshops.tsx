'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useObservatoryEnvironment } from './useObservatoryEnvironment';

export default function VendorWorkshops() {
  const { env } = useObservatoryEnvironment();
  const isNight = env.timeOfDay === 'night' || env.timeOfDay === 'sunset';

  const vendors = [
    { 
      id: 'v1', name: 'Ollivander\'s Prints', status: 'Healthy', machines: 4, load: 'High', 
      style: 'classic', owner: 'Mr. Ollivander', mood: 'Focused', hasPlants: true
    },
    { 
      id: 'v2', name: 'The Paper Mill', status: 'Maintenance', machines: 2, load: 'Low', 
      style: 'industrial', owner: 'Sarah J.', mood: 'Stressed', hasPlants: false
    },
    { 
      id: 'v3', name: 'Night Owl Copies', status: 'Healthy', machines: 3, load: 'Medium', 
      style: 'cozy', owner: 'Dave', mood: 'Relaxed', hasPlants: true
    }
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3rem' }}>
      
      {vendors.map((vendor, index) => (
        <motion.div
          key={vendor.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.3, duration: 1 }}
          style={{
            width: '280px',
            height: '380px',
            background: isNight ? 'rgba(30, 29, 28, 0.8)' : 'rgba(42, 41, 40, 0.4)',
            borderRadius: '4px',
            border: `2px solid ${vendor.style === 'industrial' ? 'rgba(150,150,150,0.2)' : 'rgba(245, 239, 231, 0.1)'}`,
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Ambient Workshop Lights based on Style & Status */}
          <motion.div
            animate={{ opacity: vendor.status === 'Healthy' ? [0.6, 0.8, 0.6] : [0.2, 0.3, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)',
              width: '150px', height: '150px', 
              background: `radial-gradient(circle, ${vendor.style === 'industrial' ? 'rgba(200,200,255,0.3)' : 'rgba(212,175,55,0.4)'} 0%, transparent 70%)`,
              pointerEvents: 'none'
            }}
          />

          {/* Plant silhouette if applicable */}
          {vendor.hasPlants && (
            <motion.div
              animate={{ rotateZ: [-1, 2, -1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', bottom: '10px', right: '10px',
                width: '40px', height: '60px', opacity: 0.15,
                background: 'linear-gradient(to top, #2A2928, transparent)',
                borderRadius: '20px 20px 0 0',
                pointerEvents: 'none'
              }}
            >
              <span style={{ fontSize: '2rem' }}>🌿</span>
            </motion.div>
          )}

          <div>
            <h3 style={{ fontFamily: 'Cabinet Grotesk', fontSize: '1.4rem', color: '#F5EFE7', marginBottom: '0.5rem' }}>{vendor.name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: vendor.status === 'Healthy' ? '#4CAF50' : '#FFC107',
                boxShadow: `0 0 10px ${vendor.status === 'Healthy' ? '#4CAF50' : '#FFC107'}`
              }} />
              <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.8rem', color: 'rgba(245,239,231,0.6)', textTransform: 'uppercase' }}>
                {vendor.status}
              </span>
            </div>
            <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.85rem', color: 'rgba(245,239,231,0.5)', margin: 0 }}>
              Owner: {vendor.owner}
            </p>
            <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.85rem', color: 'rgba(245,239,231,0.5)', margin: '0.2rem 0 0 0', fontStyle: 'italic' }}>
              Mood: {vendor.mood}
            </p>
          </div>

          {/* Machine representation */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', zIndex: 5 }}>
            {Array.from({ length: vendor.machines }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: vendor.status === 'Healthy' && vendor.load !== 'Low' ? [0, -2, 0] : 0
                }}
                transition={{
                  duration: 0.2, repeat: Infinity, ease: 'linear', delay: i * 0.1
                }}
                style={{
                  width: '40px', height: '60px', background: '#3D3A38',
                  borderRadius: '2px', border: '1px solid #5C3D1D',
                  position: 'relative'
                }}
              >
                {/* Printing light */}
                <div style={{
                  position: 'absolute', bottom: '10px', left: '5px', width: '30px', height: '2px',
                  background: vendor.status === 'Healthy' ? '#00FF00' : 'transparent', opacity: 0.5
                }} />
              </motion.div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(245,239,231,0.1)', paddingTop: '1rem', marginTop: '1.5rem', zIndex: 5 }}>
            <span style={{ fontFamily: 'Instrument Sans', fontStyle: 'italic', color: 'rgba(245,239,231,0.5)', fontSize: '0.9rem' }}>
              Queue Load: {vendor.load}
            </span>
          </div>

        </motion.div>
      ))}
    </div>
  );
}
