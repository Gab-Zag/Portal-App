/**
 * Hook: useUpload
 * ===============
 * Gerencia o estado do envio de dois arquivos vinculados a um registro.
 */

import { useState, useCallback } from 'react';
import { uploadFiles } from '../services/api.service';

export function useUpload() {
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);
  const [success,  setSuccess]  = useState(false);

  const upload = useCallback(async ({ recordId, file1, file2, note }) => {
    if (!file1 || !file2) {
      setError('Selecione os dois arquivos antes de enviar.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await uploadFiles({ recordId, file1, file2, note });
      setSuccess(true);
      return result;
    } catch (err) {
      setError(err.message || 'Falha ao enviar os arquivos.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  }, []);

  return { loading, error, success, upload, reset };
}
