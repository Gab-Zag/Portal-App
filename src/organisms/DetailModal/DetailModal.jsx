/**
 * Organism: DetailModal
 * =====================
 * Modal de detalhes de um registro com formulário de upload de dois arquivos.
 */

import React, { useState, useEffect } from 'react';
import { Badge }     from '../../atoms/Badge/Badge';
import { Button }    from '../../atoms/Button/Button';
import { Input }     from '../../atoms/Input/Input';
import { FileInput } from '../../atoms/FileInput/FileInput';
import { useUpload } from '../../hooks/useUpload';
import { STATUS_CONFIG, PRIORITY_CONFIG } from '../../mocks/records.mock';
import styles from './DetailModal.module.css';

export function DetailModal({ record, onClose }) {
  const { loading, error, success, upload, reset } = useUpload();
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [note,  setNote]  = useState('');

  const statusCfg   = STATUS_CONFIG[record?.status]    || {};
  const priorityCfg = PRIORITY_CONFIG[record?.priority] || {};

  // Fecha com ESC
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Bloqueia scroll do body
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await upload({ recordId: record.id, file1, file2, note });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Detalhes do registro">

        {/* ─── Header ─────────────────────────────────── */}
        <div className={styles.header}>
          <div>
            <p className={styles.protocol}>{record.protocol}</p>
            <h2 className={styles.title}>{record.type}</h2>
          </div>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Fechar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <line x1="18" y1="6"  x2="6"  y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="6"  y1="6"  x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.body}>
          {/* ─── Info Grid ────────────────────────────── */}
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Requerente</span>
              <span className={styles.infoValue}>{record.requester}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Status</span>
              <Badge color={statusCfg.color} bg={statusCfg.bg}>{record.status}</Badge>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Prioridade</span>
              <Badge color={priorityCfg.color} bg={priorityCfg.bg}>{record.priority}</Badge>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Criado em</span>
              <span className={styles.infoValue}>{formatDate(record.createdAt)}</span>
            </div>
          </div>

          <div className={styles.description}>
            <p className={styles.infoLabel}>Descrição</p>
            <p className={styles.descText}>{record.description}</p>
          </div>

          <div className={styles.divider} />

          {/* ─── Upload Form ──────────────────────────── */}
          <div className={styles.uploadSection}>
            <h3 className={styles.uploadTitle}>Enviar documentos</h3>
            <p className={styles.uploadSubtitle}>
              Selecione os dois arquivos obrigatórios para este registro.
            </p>

            {success ? (
              <div className={styles.successMsg}>
                <span>✅</span>
                <div>
                  <p className={styles.successTitle}>Arquivos enviados com sucesso!</p>
                  <p className={styles.successSub}>Os documentos foram anexados ao registro.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.uploadForm}>
                <div className={styles.filesRow}>
                  <FileInput
                    label="Arquivo 1"
                    accept=".pdf,.doc,.docx"
                    file={file1}
                    onChange={setFile1}
                  />
                  <FileInput
                    label="Arquivo 2"
                    accept=".pdf,.doc,.docx,.png,.jpg"
                    file={file2}
                    onChange={setFile2}
                  />
                </div>

                <Input
                  label="Observação (opcional)"
                  type="text"
                  placeholder="Descreva brevemente o conteúdo dos arquivos..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />

                {error && (
                  <div className={styles.uploadError}>{error}</div>
                )}

                <div className={styles.formActions}>
                  <Button variant="ghost" type="button" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    loading={loading}
                    disabled={!file1 || !file2}
                  >
                    Enviar arquivos
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('pt-BR');
}
