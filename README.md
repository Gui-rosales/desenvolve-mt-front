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
- Docker Compose instalado no sistema

### 🔧 Como Executar

O projeto possui dois ambientes configurados: **Desenvolvimento** e **Produção**. Cada ambiente possui sua própria configuração Docker e arquivo de variáveis de ambiente.

#### 🛠️ Ambiente de Desenvolvimento

Para executar em modo de desenvolvimento (com hot reload):

```bash
# Usando script do package.json (Recomendado)
npm run docker:dev

# Ou usando docker compose diretamente
docker compose -f docker/development/docker-compose.dev.yml up --build
```

**Acesso:** http://localhost:5173

#### 🚀 Ambiente de Produção

Para executar em modo de produção (otimizado com Nginx):

```bash
# Usando script do package.json (Recomendado)
npm run docker:prod

# Ou usando docker compose diretamente
docker compose -f docker/production/docker-compose.yml up --build
```

**Acesso:** http://localhost:80

### 🛑 Parando os Serviços

```bash
# Parar ambiente de desenvolvimento
npm run docker:dev:down

# Parar ambiente de produção
npm run docker:prod:down
```

### 🌍 Variáveis de Ambiente

**⚠️ IMPORTANTE:** Antes de executar o projeto, você deve criar os arquivos de variáveis de ambiente na raiz do repositório:

#### Para Desenvolvimento (.env.development)
```env
VITE_NODE_ENV=development
VITE_API_URL=https://api-url/v1
```

#### Para Produção (.env.production)
```env
VITE_NODE_ENV=production
VITE_API_URL=https://api-url/v1
```

**📝 Notas sobre as variáveis:**
- Substitua `https://api-url/v1` pela URL real da sua API
- Cada ambiente utiliza seu respectivo arquivo de variáveis
- Os arquivos devem estar na raiz do projeto (mesmo nível do package.json)

#### 🧪 Uso de Mock (MSW)

Para utilizar mocks das rotas da API durante o desenvolvimento, adicione a variável `NODE_ENV=test` ao seu arquivo de variáveis de ambiente:

```env
# Exemplo para .env.development com mock
VITE_NODE_ENV=test
VITE_API_URL=https://api-url/v1
```

**⚠️ Disclaimer sobre MSW:**
- Quando utilizar o MSW (Mock Service Worker), caso o mesmo não carregue corretamente, realize a limpeza dos cookies do navegador
- Existe um ticket aberto para solução do problema relacionado aos cookies, mas ainda não foi corrigido
- Esta é uma solução temporária até que o problema seja resolvido

### 📁 Estrutura Docker

```
docker/
├── development/
│   ├── docker-compose.dev.yml
│   └── Dockerfile.dev
└── production/
    ├── docker-compose.yml
    ├── Dockerfile
    └── nginx.conf
```

### 🌐 Acesso às Aplicações

- **Desenvolvimento:** http://localhost:5173 (com hot reload)
- **Produção:** http://localhost:80 (otimizado com Nginx)

---

## 📝 Notas Importantes

- **Desenvolvimento:** Ideal para desenvolvimento com hot reload e debug
- **Produção:** Otimizado para performance com Nginx e build minificado
- Certifique-se de que as portas 5173 (dev) e 80 (prod) não estejam sendo utilizadas
- Para parar qualquer ambiente, use `Ctrl+C` ou os comandos de down mencionados acima
