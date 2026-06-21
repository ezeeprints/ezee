'use client';

import React, { useState } from 'react';
import styles from '../auth/auth.module.css';

interface AuthFormsProps {
  state: 'login' | 'signup' | 'otp' | 'forgot' | 'loading' | 'success' | 'error';
  setState: (state: 'login' | 'signup' | 'otp' | 'forgot' | 'loading' | 'success' | 'error') => void;
}

export default function AuthForms({ state, setState }: AuthFormsProps) {
  const [rememberMe, setRememberMe] = useState(false);
  const [signupStep, setSignupStep] = useState(0); // 0: About You, 1: College, 2: Password, 3: Finish
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    setTimeout(() => {
      // Simulate success
      setState('success');
    }, 2000);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupStep < 3) {
      setSignupStep(signupStep + 1);
    } else {
      setState('loading');
      setTimeout(() => {
        setState('otp');
      }, 2000);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className={styles.paperCard} style={{ opacity: state === 'success' ? 0 : 1, pointerEvents: state === 'success' ? 'none' : 'auto' }}>
      
      {state === 'login' && (
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h1 className={styles.heading}>Welcome back 🌙</h1>
            <p className={styles.subtitle}>Ezi kept everything just the way you left it.</p>
          </div>
          
          <input type="email" placeholder="Email" className={styles.inputField} required />
          <input type="password" placeholder="Password" className={styles.inputField} required />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
            <div 
              className={styles.bookmarkRibbon} 
              onClick={() => setRememberMe(!rememberMe)}
            >
              <div className={`${styles.bookmarkIcon} ${rememberMe ? styles.bookmarkIconActive : ''}`} />
              Remember Me
            </div>
            
            <span 
              style={{ cursor: 'pointer', color: 'var(--color-terracotta)', fontWeight: 500 }}
              onClick={() => setState('forgot')}
            >
              Forgot Password
            </span>
          </div>
          
          <button type="submit" className={styles.primaryButton}>Continue</button>
          
          <button type="button" className={styles.googleButton}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', borderTop: '1px solid rgba(42, 41, 40, 0.1)', paddingTop: '1.5rem' }}>
            <span style={{ fontSize: '0.95rem', color: 'var(--color-dusty-plum)' }}>New to Ezee?</span>
            <button type="button" className={styles.secondaryButton} onClick={() => setState('signup')}>Create an Account</button>
          </div>
        </form>
      )}

      {state === 'signup' && (
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h1 className={styles.heading}>Let's prepare your study nook ✨</h1>
            <p className={styles.subtitle}>We'll get everything ready.</p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid rgba(42,41,40,0.1)', paddingBottom: '1rem' }}>
             {['About You', 'College', 'Password', 'Finish'].map((step, idx) => (
               <div key={step} style={{ 
                 opacity: signupStep === idx ? 1 : 0.4, 
                 fontWeight: signupStep === idx ? 600 : 400,
                 position: 'relative',
                 transition: 'all 0.3s'
               }}>
                 {step}
                 {signupStep === idx && (
                   <div style={{ position: 'absolute', bottom: '-17px', left: '0', width: '100%', height: '2px', backgroundColor: 'var(--color-terracotta)' }} />
                 )}
               </div>
             ))}
          </div>

          <div style={{ minHeight: '180px', display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
            {signupStep === 0 && (
              <>
                <input type="text" placeholder="Name" className={styles.inputField} required autoFocus />
                <input type="email" placeholder="Email" className={styles.inputField} required />
                <input type="tel" placeholder="Phone" className={styles.inputField} required />
              </>
            )}
            {signupStep === 1 && (
              <>
                <input type="text" placeholder="College" className={styles.inputField} required autoFocus />
                <input type="text" placeholder="Department" className={styles.inputField} required />
                <input type="text" placeholder="USN" className={styles.inputField} required />
                <input type="text" placeholder="Year" className={styles.inputField} required />
              </>
            )}
            {signupStep === 2 && (
              <>
                <input type="password" placeholder="Password" className={styles.inputField} required autoFocus />
                <input type="password" placeholder="Confirm Password" className={styles.inputField} required />
              </>
            )}
            {signupStep === 3 && (
              <div style={{ textAlign: 'center', color: 'var(--color-dusty-plum)' }}>
                Looks perfect! Let's get started.
              </div>
            )}
          </div>

          <button type="submit" className={styles.primaryButton}>
            {signupStep < 3 ? 'Next' : 'Finish'}
          </button>
          
          <p style={{ textAlign: 'center', color: 'var(--color-dusty-plum)', marginTop: '0.5rem' }}>
            <span style={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => setState('login')}>Back to Login</span>
          </p>
        </form>
      )}

      {state === 'otp' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <h1 className={styles.heading} style={{ textAlign: 'center' }}>Almost there.</h1>
          <p className={styles.subtitle} style={{ textAlign: 'center' }}>Enter the stamp digits sent to your email.</p>
          
          <div className={styles.otpContainer}>
             {[0, 1, 2, 3].map(i => (
               <input 
                 key={i}
                 id={`otp-${i}`}
                 type="text" 
                 maxLength={1}
                 className={styles.otpStamp}
                 value={otp[i]}
                 onChange={(e) => handleOtpChange(i, e.target.value)}
               />
             ))}
          </div>

          <button 
            className={styles.primaryButton}
            onClick={() => setState('success')}
          >
            Verify
          </button>
        </div>
      )}

      {state === 'forgot' && (
        <form onSubmit={(e) => { e.preventDefault(); setState('loading'); setTimeout(() => setState('login'), 2000); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h1 className={styles.heading}>Don't worry.</h1>
            <p className={styles.subtitle}>We'll help you find your way back.</p>
          </div>
          
          <input type="email" placeholder="Recovery Email" className={styles.inputField} required autoFocus />
          
          <button type="submit" className={styles.primaryButton}>Send Reset Link</button>
          
          <p style={{ textAlign: 'center', color: 'var(--color-dusty-plum)', marginTop: '1rem' }}>
            <span style={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => setState('login')}>Return to Login</span>
          </p>
        </form>
      )}

      {state === 'loading' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid var(--color-paper-cream)', borderTopColor: 'var(--color-terracotta)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          <p className={styles.subtitle}>Just a moment...</p>
        </div>
      )}

      {state === 'error' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <h1 className={styles.heading}>Hmm…</h1>
          <p className={styles.subtitle}>Looks like something got mixed up.</p>
          <button className={styles.primaryButton} onClick={() => setState('login')}>Try Again</button>
        </div>
      )}

    </div>
  );
}
