/**
 * Organism: Navbar
 * ================
 * Barra de navegação superior com logo, usuário e logout.
 */

import React from 'react';
import { Logo }   from '../../atoms/Logo/Logo';
import { Button } from '../../atoms/Button/Button';
import styles from './Navbar.module.css';

export function Navbar({ user, onLogout }) {
  const initials = user?.name
    ? user.name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()
    : '?';

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <Logo size="sm" />

        <nav className={styles.nav}>
          <span className={styles.navItem}>Registros</span>
        </nav>

        <div className={styles.userArea}>
          <div className={styles.avatar} title={user?.name}>
            {initials}
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.name || 'Usuário'}</span>
            <span className={styles.userEmail}>{user?.email || ''}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onLogout}>
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
}
