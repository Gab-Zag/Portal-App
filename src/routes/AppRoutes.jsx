/**
 * Routes
 * ======
 * Configuração de rotas da aplicação com proteção de rota privada.
 *
 * Rotas públicas:  /login, /register
 * Rotas privadas:  /dashboard (exige Bearer Token válido)
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { tokenStorage } from '../services/api.service';
import { LoginPage }    from '../pages/LoginPage/LoginPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import { DashboardPage } from '../pages/DashboardPage/DashboardPage';

// ─── Componente de Rota Privada ─────────────────────────────────────────────

/**
 * Verifica se o usuário possui um Bearer Token válido no browser.
 * Caso contrário, redireciona para /login.
 */
function PrivateRoute({ children }) {
  const hasToken = Boolean(tokenStorage.get());
  return hasToken ? children : <Navigate to="/login" replace />;
}

// ─── Componente de Rota Pública ─────────────────────────────────────────────

/**
 * Se o usuário já estiver autenticado, redireciona para /dashboard.
 */
function PublicRoute({ children }) {
  const hasToken = Boolean(tokenStorage.get());
  return hasToken ? <Navigate to="/dashboard" replace /> : children;
}

// ─── AppRoutes ──────────────────────────────────────────────────────────────

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota raiz: redireciona conforme estado de autenticação */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rotas Públicas */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {/* Rotas Privadas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* Rota 404: redireciona para login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
