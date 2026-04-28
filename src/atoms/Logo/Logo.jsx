/**
 * Atom: Logo
 * ==========
 * Logotipo da aplicação.
 */

import React from 'react';
import styles from './Logo.module.css';

export function Logo({ size = 'md' }) {
  return (
    <div className={[styles.logo, styles[size]].join(' ')}>
      <div className={styles.icon}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="var(--color-primary)" />
          <path
            d="M8 16C8 11.58 11.58 8 16 8C18.76 8 21.2 9.34 22.72 11.42"
            stroke="white" strokeWidth="2.5" strokeLinecap="round"
          />
          <path
            d="M24 16C24 20.42 20.42 24 16 24C13.24 24 10.8 22.66 9.28 20.58"
            stroke="white" strokeWidth="2.5" strokeLinecap="round"
          />
          <circle cx="16" cy="16" r="3" fill="white" />
        </svg>
      </div>
      <span className={styles.text}>Portal<strong>Gov</strong></span>
    </div>
  );
}
