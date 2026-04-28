/**
 * Atom: FileInput
 * ===============
 * Campo de upload de arquivo com drag-and-drop visual.
 */

import React, { useRef, useState } from 'react';
import styles from './FileInput.module.css';

export function FileInput({ label, accept, onChange, file, error }) {
  const inputRef        = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected && onChange) onChange(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped && onChange) onChange(dropped);
  };

  const handleDragOver  = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = ()  => setIsDragging(false);

  const formatSize = (bytes) => {
    if (bytes < 1024)        return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={styles.wrapper}>
      {label && <p className={styles.label}>{label}</p>}

      <div
        className={[
          styles.dropzone,
          isDragging ? styles.dragging  : '',
          file       ? styles.hasFile   : '',
          error      ? styles.hasError  : '',
        ].filter(Boolean).join(' ')}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className={styles.hiddenInput}
          onChange={handleFileChange}
        />

        {file ? (
          <div className={styles.fileInfo}>
            <span className={styles.fileIcon}>📄</span>
            <div>
              <p className={styles.fileName}>{file.name}</p>
              <p className={styles.fileSize}>{formatSize(file.size)}</p>
            </div>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.uploadIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <polyline points="17,8 12,3 7,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            <p className={styles.placeholderText}>
              <span>Clique ou arraste</span> o arquivo aqui
            </p>
            {accept && (
              <p className={styles.acceptedTypes}>Formatos: {accept}</p>
            )}
          </div>
        )}
      </div>

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
