/**
 * Atom: Button
 * ============
 * Botão reutilizável com variantes e estados.
 */

import React from 'react';
import styles from './Button.module.css';

/**
 * @param {'primary'|'secondary'|'outline'|'ghost'|'danger'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {boolean} loading
 * @param {boolean} fullWidth
 */
export function Button({
  children,
  variant   = 'primary',
  size      = 'md',
  loading   = false,
  fullWidth  = false,
  disabled,
  className = '',
  ...props
}) {
  const classes = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    loading   ? styles.loading   : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <span className={loading ? styles.textHidden : ''}>{children}</span>
    </button>
  );
}
