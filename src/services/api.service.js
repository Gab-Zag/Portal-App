/**
 * API Service
 * ============
 * Único ponto de comunicação com o back-end externo.
 * Centraliza todos os endpoints e faz o mapeamento das respostas.
 */

// ─── Configuração Base ──────────────────────────────────────────────────────

const BASE_URL = process.env.REACT_APP_API_URL || 'https://api.exemplo.com';

const TOKEN_KEY = 'bearer_token';
const USER_KEY  = 'auth_user';

// ─── Gerenciamento de Token ─────────────────────────────────────────────────

export const tokenStorage = {
  get:    ()          => localStorage.getItem(TOKEN_KEY),
  set:    (token)     => localStorage.setItem(TOKEN_KEY, token),
  remove: ()          => localStorage.removeItem(TOKEN_KEY),
};

export const userStorage = {
  get:    ()          => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  set:    (user)      => localStorage.setItem(USER_KEY, JSON.stringify(user)),
  remove: ()          => localStorage.removeItem(USER_KEY),
};

// ─── Fetch Centralizado ─────────────────────────────────────────────────────

/**
 * Realiza uma requisição HTTP com tratamento de erros padronizado.
 * Injeta automaticamente o Bearer Token quando disponível.
 *
 * @param {string} endpoint  - Caminho relativo da rota, ex: "/auth/login"
 * @param {object} options   - Opções do fetch (method, body, etc.)
 * @returns {Promise<any>}   - Dados da resposta parseados em JSON
 */
async function request(endpoint, options = {}) {
  const token = tokenStorage.get();

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw {
      status:  response.status,
      message: errorBody.message || 'Erro inesperado na requisição.',
      data:    errorBody,
    };
  }

  return response.json();
}

// ─── Mapeadores de Resposta ─────────────────────────────────────────────────

/**
 * Normaliza a resposta de autenticação para um formato padronizado.
 */
function mapAuthResponse(raw) {
  return {
    token: raw.token || raw.access_token || raw.bearerToken,
    user: {
      id:    raw.user?.id    || raw.id,
      name:  raw.user?.name  || raw.name,
      email: raw.user?.email || raw.email,
    },
  };
}

// ─── Endpoints: Autenticação ────────────────────────────────────────────────

/**
 * Realiza login do usuário.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ token: string, user: object }>}
 */
export async function login({ email, password }) {
  const raw = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  const mapped = mapAuthResponse(raw);
  tokenStorage.set(mapped.token);
  userStorage.set(mapped.user);
  return mapped;
}

/**
 * Registra um novo usuário.
 *
 * @param {{ name: string, email: string, password: string }} userData
 * @returns {Promise<{ token: string, user: object }>}
 */
export async function register({ name, email, password }) {
  const raw = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });

  const mapped = mapAuthResponse(raw);
  tokenStorage.set(mapped.token);
  userStorage.set(mapped.user);
  return mapped;
}

/**
 * Realiza logout limpando os dados do browser.
 */
export function logout() {
  tokenStorage.remove();
  userStorage.remove();
}

// ─── Endpoints: Registros (Tabela) ──────────────────────────────────────────

/**
 * Busca a lista de registros paginada.
 *
 * @param {{ page?: number, limit?: number }} params
 * @returns {Promise<{ data: array, total: number }>}
 */
export async function fetchRecords({ page = 1, limit = 10 } = {}) {
  return request(`/records?page=${page}&limit=${limit}`);
}

/**
 * Busca os detalhes de um registro específico.
 *
 * @param {string|number} id - ID do registro
 * @returns {Promise<object>}
 */
export async function fetchRecordById(id) {
  return request(`/records/${id}`);
}

// ─── Endpoints: Upload de Arquivos ──────────────────────────────────────────

/**
 * Envia dois arquivos vinculados a um registro.
 * Usa FormData para multipart/form-data.
 *
 * @param {string|number} recordId  - ID do registro associado
 * @param {File}          file1     - Primeiro arquivo
 * @param {File}          file2     - Segundo arquivo
 * @param {string}        note      - Observação opcional
 * @returns {Promise<object>}
 */
export async function uploadFiles({ recordId, file1, file2, note }) {
  const token  = tokenStorage.get();
  const form   = new FormData();

  form.append('recordId', recordId);
  form.append('file1',    file1);
  form.append('file2',    file2);
  if (note) form.append('note', note);

  const response = await fetch(`${BASE_URL}/records/${recordId}/upload`, {
    method:  'POST',
    headers: { ...(token && { Authorization: `Bearer ${token}` }) },
    body:    form,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw { status: response.status, message: err.message || 'Falha no upload.' };
  }

  return response.json();
}
