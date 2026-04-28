/**
 * Page: RegisterPage
 * ==================
 * Página de criação de nova conta.
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout }    from '../../templates/AuthLayout/AuthLayout';
import { RegisterForm }  from '../../molecules/RegisterForm/RegisterForm';
import { useAuth }       from '../../hooks/useAuth';

export function RegisterPage() {
  const navigate                      = useNavigate();
  const { register, loading, error, clearError } = useAuth();

  const handleSubmit = async (userData) => {
    try {
      await register(userData);
      navigate('/dashboard');
    } catch {
      // O erro já é gerenciado pelo hook
    }
  };

  return (
    <AuthLayout
      title="Criar sua conta"
      subtitle="Preencha os dados abaixo para começar."
    >
      <RegisterForm
        onSubmit={handleSubmit}
        loading={loading}
        apiError={error}
      />

      <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
        Já tem uma conta?{' '}
        <Link to="/login" onClick={clearError}>
          Entrar
        </Link>
      </p>
    </AuthLayout>
  );
}
