/**
 * Page: DashboardPage
 * ===================
 * Página principal pós-login com tabela de registros.
 */

import React, { useState } from 'react';
import { useNavigate }         from 'react-router-dom';
import { DashboardLayout }     from '../../templates/DashboardLayout/DashboardLayout';
import { RecordsTable }        from '../../organisms/RecordsTable/RecordsTable';
import { DetailModal }         from '../../organisms/DetailModal/DetailModal';
import { useAuth }             from '../../hooks/useAuth';
import { MOCK_RECORDS }        from '../../mocks/records.mock';
import styles from './DashboardPage.module.css';

export function DashboardPage() {
  const navigate             = useNavigate();
  const { user, logout }     = useAuth();
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = {
    total:       MOCK_RECORDS.length,
    emAnalise:   MOCK_RECORDS.filter((r) => r.status === 'Em Análise').length,
    aprovados:   MOCK_RECORDS.filter((r) => r.status === 'Aprovado').length,
    pendentes:   MOCK_RECORDS.filter((r) => r.status === 'Pendente').length,
  };

  return (
    <DashboardLayout user={user} onLogout={handleLogout}>

      {/* ─── Page Header ──────────────────────────── */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Registros</h1>
          <p className={styles.pageSubtitle}>
            Acompanhe e gerencie todos os seus processos.
          </p>
        </div>
      </div>

      {/* ─── Stats ────────────────────────────────── */}
      <div className={styles.statsGrid}>
        <StatCard label="Total" value={stats.total}     color="var(--color-primary)" />
        <StatCard label="Em Análise" value={stats.emAnalise} color="#1c8bd9"         />
        <StatCard label="Aprovados"  value={stats.aprovados} color="var(--color-success)" />
        <StatCard label="Pendentes"  value={stats.pendentes} color="var(--color-warning)"  />
      </div>

      {/* ─── Table ────────────────────────────────── */}
      <RecordsTable
        records={MOCK_RECORDS}
        onViewDetails={setSelectedRecord}
      />

      {/* ─── Detail Modal ─────────────────────────── */}
      {selectedRecord && (
        <DetailModal
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}

    </DashboardLayout>
  );
}

// ─── Subcomponent: StatCard ─────────────────────────────────────────────────

function StatCard({ label, value, color }) {
  return (
    <div className={styles.statCard} style={{ '--stat-color': color }}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
      <div className={styles.statBar} />
    </div>
  );
}
