# Portal App — React + Atomic Design

Aplicação React estruturada com **Atomic Design**, autenticação via Bearer Token e upload de arquivos.

---

## 🗂 Estrutura do Projeto

```
src/
├── atoms/               # Componentes base (indivisíveis)
│   ├── Badge/
│   ├── Button/
│   ├── FileInput/
│   ├── Input/
│   └── Logo/
│
├── molecules/           # Composições de átomos
│   ├── LoginForm/
│   ├── RegisterForm/
│   └── TableRow/
│
├── organisms/           # Seções completas da interface
│   ├── DetailModal/
│   ├── Navbar/
│   └── RecordsTable/
│
├── templates/           # Layouts de página
│   ├── AuthLayout/
│   └── DashboardLayout/
│
├── pages/               # Páginas completas (montagem final)
│   ├── LoginPage/
│   ├── RegisterPage/
│   └── DashboardPage/
│
├── routes/
│   └── AppRoutes.jsx    # Configuração de rotas + proteção
│
├── services/
│   └── api.service.js   # ÚNICO ponto de comunicação com o back-end
│
├── hooks/
│   ├── useAuth.js       # Estado de autenticação
│   └── useUpload.js     # Estado de upload de arquivos
│
├── mocks/
│   └── records.mock.js  # Dados de exemplo para a tabela
│
└── styles/
    └── global.css       # Variáveis CSS e reset global
```

---

## 🚀 Como Rodar

```bash
# Instalar dependências
npm install

# Iniciar em desenvolvimento
npm start

# Build de produção
npm run build
```

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
REACT_APP_API_URL=https://seu-backend.com
```

Se não definido, o serviço usará `https://api.exemplo.com` como base.

---

## 🔐 Autenticação

O fluxo de autenticação é gerenciado **exclusivamente** por `src/services/api.service.js`:

| Função         | Endpoint              | Descrição                          |
|----------------|-----------------------|------------------------------------|
| `login()`      | `POST /auth/login`    | Autentica e salva o token          |
| `register()`   | `POST /auth/register` | Registra e salva o token           |
| `logout()`     | —                     | Remove token e usuário do browser  |

O **Bearer Token** é armazenado em `localStorage` com a chave `bearer_token` e injetado automaticamente em todas as requisições autenticadas.

---

## 📤 Upload de Arquivos

O modal de detalhes permite enviar **dois arquivos** por registro via `POST /records/:id/upload` usando `multipart/form-data`. O hook `useUpload` gerencia o estado de loading, erro e sucesso.

---

## 🎨 Design System

| Variável CSS              | Valor       |
|---------------------------|-------------|
| `--color-primary`         | `#1c8bd9`   |
| `--color-primary-light`   | `#4eaae8`   |
| `--color-primary-lighter` | `#a8d8f5`   |
| `--color-primary-dark`    | `#1570b0`   |
| `--color-bg`              | `#f4f8fd`   |
| `--color-white`           | `#ffffff`   |
| `--font-sans`             | Plus Jakarta Sans |

---

## 📦 Dependências

| Pacote              | Versão   | Uso                          |
|---------------------|----------|------------------------------|
| react               | ^18.2.0  | Biblioteca de UI             |
| react-dom           | ^18.2.0  | Renderização no browser      |
| react-router-dom    | ^6.21.0  | Gerenciamento de rotas       |
| react-scripts       | 5.0.1    | Toolchain CRA                |
