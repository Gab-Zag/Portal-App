/**
 * Hook: useAuth
 * =============
 * Gerencia o estado de autenticação do usuário.
 * Lê o token e o usuário do localStorage na inicialização.
 */

import { useState, useCallback } from 'react';
import { login, register, logout, tokenStorage, userStorage } from '../services/api.service';

export function useAuth() {
  const [user,    setUser]    = useState(() => userStorage.get());
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const isAuthenticated = Boolean(tokenStorage.get() && user);

  // ─── Login ────────────────────────────────────────────────────────────────

  const handleLogin = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const result = await login(credentials);
      setUser(result.user);
      return result;
    } catch (err) {
      setError(err.message || 'Falha ao realizar login.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ─── Registro ─────────────────────────────────────────────────────────────

  const handleRegister = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await register(userData);
      setUser(result.user);
      return result;
    } catch (err) {
      setError(err.message || 'Falha ao realizar cadastro.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ─── Logout ───────────────────────────────────────────────────────────────

  const handleLogout = useCallback(() => {
    logout();
    setUser(null);
    setError(null);
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login:    handleLogin,
    register: handleRegister,
    logout:   handleLogout,
    clearError: () => setError(null),
  };
}
