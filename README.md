# Desenvolve MT - Projeto

## 📋 Informações do Projeto

### 👤 Minhas Informações de Cadastro

- **Nome:** Guilherme Rosales Alexandre
- **Telefone:** (65) 99813-6086
- **Email:** guilhermelexandre456@gmail.com

---

## 🚀 Requisitos e Instruções para Execução

### 📋 Pré-requisitos
- Docker instalado no sistema

### 🔧 Como Executar

#### Opção 1: Build da Imagem Docker
```bash
docker build -t desenvolve-mt .
docker run -p 80:80 desenvolve-mt
```

#### Opção 2: Docker Compose (Recomendado)
```bash
docker compose up --build
```

### 🌍 Variáveis de Ambiente

Antes de executar o projeto, você deve criar um arquivo `.env` na raiz do repositório com as seguintes variáveis:

```env
VITE_API_URL=https://api-url/v1
```

**⚠️ Importante:** 
- O arquivo `.env` deve estar na raiz do projeto
- Substitua `https://api-url/v1` pela URL real da sua API

### 🌐 Acesso à Aplicação
Após o build do container, a aplicação estará disponível em:
**http://localhost:80**

---

## 📝 Notas
- Certifique-se de que a porta 80 não esteja sendo utilizada por outros serviços
- Para parar a aplicação, use `Ctrl+C` ou `docker compose down`
