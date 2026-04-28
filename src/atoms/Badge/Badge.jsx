/**
 * Atom: Badge
 * ===========
 * Etiqueta de status/categoria com cor customizável.
 */

import React from 'react';
import styles from './Badge.module.css';

export function Badge({ children, color, bg, className = '' }) {
  const inlineStyle = color ? { color, backgroundColor: bg || color + '20' } : {};

  return (
    <span
      className={[styles.badge, className].filter(Boolean).join(' ')}
      style={inlineStyle}
    >
      {children}
    </span>
  );
}
