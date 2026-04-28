/**
 * Atom: Input
 * ===========
 * Campo de texto reutilizável com suporte a label, erro e ícone.
 */

import React, { forwardRef } from 'react';
import styles from './Input.module.css';

export const Input = forwardRef(function Input({
  label,
  error,
  helperText,
  icon,
  id,
  className = '',
  ...props
}, ref) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.inputWrapper}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          ref={ref}
          id={inputId}
          className={[
            styles.input,
            icon     ? styles.withIcon : '',
            error    ? styles.hasError : '',
          ].filter(Boolean).join(' ')}
          {...props}
        />
      </div>

      {error && (
        <span className={styles.error} role="alert">{error}</span>
      )}
      {!error && helperText && (
        <span className={styles.helper}>{helperText}</span>
      )}
    </div>
  );
});
