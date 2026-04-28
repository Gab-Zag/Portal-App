/**
 * Molecule: TableRow
 * ==================
 * Linha da tabela de registros com badge de status/prioridade.
 */

import React from 'react';
import { Badge }  from '../../atoms/Badge/Badge';
import { Button } from '../../atoms/Button/Button';
import { STATUS_CONFIG, PRIORITY_CONFIG } from '../../mocks/records.mock';
import styles from './TableRow.module.css';

export function TableRow({ record, onViewDetails }) {
  const statusCfg   = STATUS_CONFIG[record.status]   || {};
  const priorityCfg = PRIORITY_CONFIG[record.priority] || {};

  return (
    <tr className={styles.row}>
      <td className={styles.cell}>
        <span className={styles.protocol}>{record.protocol}</span>
      </td>
      <td className={styles.cell}>{record.requester}</td>
      <td className={styles.cell}>{record.type}</td>
      <td className={styles.cell}>
        <Badge color={statusCfg.color} bg={statusCfg.bg}>
          {record.status}
        </Badge>
      </td>
      <td className={styles.cell}>
        <Badge color={priorityCfg.color} bg={priorityCfg.bg}>
          {record.priority}
        </Badge>
      </td>
      <td className={styles.cell}>
        <span className={styles.date}>{formatDate(record.updatedAt)}</span>
      </td>
      <td className={styles.cell}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(record)}
        >
          Ver detalhes
        </Button>
      </td>
    </tr>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('pt-BR');
}
