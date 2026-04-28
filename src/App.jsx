/**
 * App.jsx
 * =======
 * Ponto de entrada do React.
 * Importa os estilos globais e inicializa o sistema de rotas.
 */

import React from 'react';
import { AppRoutes } from './routes/AppRoutes';
import './styles/global.css';

export default function App() {
  return <AppRoutes />;
}
