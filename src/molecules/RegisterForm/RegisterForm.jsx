/**
 * Molecule: RegisterForm
 * ======================
 * Formulário de registro de novo usuário.
 */

import React, { useState } from 'react';
import { Input }  from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Button';
import styles from './RegisterForm.module.css';

export function RegisterForm({ onSubmit, loading, apiError }) {
  const [fields, setFields] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!fields.name)    errs.name    = 'Nome obrigatório.';
    if (!fields.email)   errs.email   = 'E-mail obrigatório.';
    else if (!/\S+@\S+\.\S+/.test(fields.email)) errs.email = 'E-mail inválido.';
    if (!fields.password) errs.password = 'Senha obrigatória.';
    else if (fields.password.length < 6) errs.password = 'Mínimo 6 caracteres.';
    if (fields.confirm !== fields.password) errs.confirm = 'As senhas não coincidem.';
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
    const { name, email, password } = fields;
    onSubmit({ name, email, password });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Input
        label="Nome completo"
        type="text"
        placeholder="João da Silva"
        value={fields.name}
        onChange={handleChange('name')}
        error={errors.name}
        autoComplete="name"
      />

      <Input
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        value={fields.email}
        onChange={handleChange('email')}
        error={errors.email}
        autoComplete="email"
      />

      <Input
        label="Senha"
        type="password"
        placeholder="Mínimo 6 caracteres"
        value={fields.password}
        onChange={handleChange('password')}
        error={errors.password}
        autoComplete="new-password"
      />

      <Input
        label="Confirmar senha"
        type="password"
        placeholder="Repita sua senha"
        value={fields.confirm}
        onChange={handleChange('confirm')}
        error={errors.confirm}
        autoComplete="new-password"
      />

      {apiError && (
        <div className={styles.apiError} role="alert">
          {apiError}
        </div>
      )}

      <Button type="submit" loading={loading} fullWidth size="lg">
        Criar conta
      </Button>
    </form>
  );
}
