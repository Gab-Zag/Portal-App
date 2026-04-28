/**
 * Organism: RecordsTable
 * ======================
 * Tabela completa de registros com cabeçalho e linhas.
 */

import React from 'react';
import { TableRow } from '../../molecules/TableRow/TableRow';
import styles from './RecordsTable.module.css';

const COLUMNS = [
  { key: 'protocol',  label: 'Protocolo'     },
  { key: 'requester', label: 'Requerente'    },
  { key: 'type',      label: 'Tipo'          },
  { key: 'status',    label: 'Status'        },
  { key: 'priority',  label: 'Prioridade'    },
  { key: 'updatedAt', label: 'Atualizado em' },
  { key: 'actions',   label: ''              },
];

export function RecordsTable({ records, onViewDetails }) {
  if (!records?.length) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>📭</span>
        <p>Nenhum registro encontrado.</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {COLUMNS.map((col) => (
              <th key={col.key} className={styles.th}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {records.map((record) => (
            <TableRow
              key={record.id}
              record={record}
              onViewDetails={onViewDetails}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
