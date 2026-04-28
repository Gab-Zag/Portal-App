/**
 * Template: AuthLayout
 * ====================
 * Layout para as páginas de autenticação (Login e Registro).
 * Divide a tela em painel visual + painel de formulário.
 */

import React from 'react';
import { Logo } from '../../atoms/Logo/Logo';
import styles from './AuthLayout.module.css';

export function AuthLayout({ children, title, subtitle }) {
  return (
    <div className={styles.layout}>

      {/* ─── Painel Visual ─────────────────────────── */}
      <aside className={styles.visual}>
        <div className={styles.visualContent}>
          <Logo size="lg" />
          <h1 className={styles.tagline}>
            Gestão de registros <br />
            <span>simples e eficiente.</span>
          </h1>
          <p className={styles.visualDesc}>
            Acesse, acompanhe e envie documentos para todos os seus processos em um só lugar.
          </p>
          <div className={styles.decorDots} />
        </div>
        <div className={styles.wave} aria-hidden="true" />
      </aside>

      {/* ─── Painel de Formulário ───────────────────── */}
      <main className={styles.formPanel}>
        <div className={styles.formWrapper}>
          <div className={styles.mobileLogoWrapper}>
            <Logo size="md" />
          </div>

          <hgroup className={styles.hgroup}>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </hgroup>

          {children}
        </div>
      </main>

    </div>
  );
}
