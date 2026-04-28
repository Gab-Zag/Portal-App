/**
 * Molecule: LoginForm
 * ===================
 * Formulário de login com validação simples.
 */

import React, { useState } from 'react';
import { Input }  from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Button';
import styles from './LoginForm.module.css';

const ICON_EMAIL = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const ICON_LOCK = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export function LoginForm({ onSubmit, loading, apiError }) {
  const [fields, setFields] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!fields.email)    errs.email    = 'E-mail obrigatório.';
    else if (!/\S+@\S+\.\S+/.test(fields.email)) errs.email = 'E-mail inválido.';
    if (!fields.password) errs.password = 'Senha obrigatória.';
    return errs;
  };

  const handleChange = (field) => (e) => {
    setFields((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit(fields);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Input
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        value={fields.email}
        onChange={handleChange('email')}
        error={errors.email}
        icon={ICON_EMAIL}
        autoComplete="email"
      />

      <Input
        label="Senha"
        type="password"
        placeholder="••••••••"
        value={fields.password}
        onChange={handleChange('password')}
        error={errors.password}
        icon={ICON_LOCK}
        autoComplete="current-password"
      />

      {apiError && (
        <div className={styles.apiError} role="alert">
          {apiError}
        </div>
      )}

      <Button type="submit" loading={loading} fullWidth size="lg">
        Entrar
      </Button>
    </form>
  );
}
