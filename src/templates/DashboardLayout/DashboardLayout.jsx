/**
 * Template: DashboardLayout
 * =========================
 * Layout padrão das páginas internas (após login).
 */

import React from 'react';
import { Navbar } from '../../organisms/Navbar/Navbar';
import styles from './DashboardLayout.module.css';

export function DashboardLayout({ children, user, onLogout }) {
  return (
    <div className={styles.layout}>
      <Navbar user={user} onLogout={onLogout} />
      <main className={styles.main}>
        <div className={styles.container}>
          {children}
        </div>
      </main>
    </div>
  );
}
