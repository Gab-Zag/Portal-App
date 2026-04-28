/**
 * Page: LoginPage
 * ===============
 * Página de autenticação — login de usuário existente.
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout }  from '../../templates/AuthLayout/AuthLayout';
import { LoginForm }   from '../../molecules/LoginForm/LoginForm';
import { useAuth }     from '../../hooks/useAuth';

export function LoginPage() {
  const navigate               = useNavigate();
  const { login, loading, error, clearError } = useAuth();

  const handleSubmit = async (credentials) => {
    try {
      await login(credentials);
      navigate('/dashboard');
    } catch {
      // O erro já é gerenciado pelo hook; não precisamos fazer nada aqui
    }
  };

  return (
    <AuthLayout
      title="Bem-vindo de volta"
      subtitle="Acesse sua conta para continuar."
    >
      <LoginForm
        onSubmit={handleSubmit}
        loading={loading}
        apiError={error}
      />

      <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
        Não tem uma conta?{' '}
        <Link to="/register" onClick={clearError}>
          Criar conta
        </Link>
      </p>
    </AuthLayout>
  );
}
