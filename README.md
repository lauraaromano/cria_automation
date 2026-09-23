# cria_automation

Suíte de testes end-to-end (E2E) com [Playwright](https://playwright.dev/) para a plataforma **CRIA** (web.cria.net.br), cobrindo os fluxos de login e de preparação/escrita de redações.

## Sobre o projeto

Este projeto automatiza a validação dos principais fluxos de uso da plataforma, como:

- Autenticação (login/logout)
- Preparação de uma redação: seleção de vestibular, área, tema (por filtro, busca por palavra-chave, tema da semana ou outros temas) e tipo/gênero textual
- Escrita e salvamento de redações

### Particularidades tratadas pela automação

A aplicação sob teste apresenta dois comportamentos que exigiram tratamento especial nos testes:

1. **Banner de cookies recorrente**: o banner de aceite de cookies pode reaparecer em momentos aleatórios do fluxo (inclusive durante esperas, não só em cliques), forçando o front-end a recarregar e perder o estado preenchido no formulário.
2. **Reload inesperado da aplicação**: em certos pontos do fluxo, a página pode recarregar sozinha, reiniciando etapas já concluídas.

Para lidar com isso, o projeto conta com:

- **`popupHandler`** (`tests/support/fixtures/popupHandler.fixture.ts`): fixture automática (`auto: true`) que fecha o banner de cookies sempre que ele aparecer — tanto durante ações do Playwright (clique, preenchimento, asserções) quanto em segundo plano, via um watcher que checa a tela periodicamente mesmo durante esperas (`waitForTimeout`).
- **`retryOnReload`** (`tests/support/fixtures/retryOnReload.ts`): utilitário que reexecuta o corpo de um teste automaticamente caso a página recarregue no meio da execução, evitando falsos negativos causados por esse comportamento da aplicação.
- **`testWithRetry`** (`tests/support/fixtures/testWithRetry.fixture.ts`): combina as duas proteções acima em um `test` customizado, usado por todos os specs — nenhum teste precisa chamar esses mecanismos manualmente.

## Estrutura do projeto

```
cria_automation/
├── tests/
│   ├── e2e/
│   │   ├── authentication/       # testes de login/logout
│   │   └── essays/                # testes de preparação e escrita de redação
│   └── support/
│       ├── actions/                # Page Objects (ações na aplicação)
│       │   ├── Login.ts
│       │   └── essays/
│       │       ├── EssaysPreparation.ts
│       │       └── EssaysWriting.ts
│       ├── fixtures/                # fixtures do Playwright e dados de teste
│       │   ├── data/
│       │   │   ├── essays.json
│       │   │   └── users.ts
│       │   ├── popupHandler.fixture.ts
│       │   ├── retryOnReload.ts
│       │   ├── testWithRetry.fixture.ts
│       │   ├── alertHandler.fixture.ts
│       │   └── errorHandler.fixture.ts
│       └── index.ts                 # ponto único de import para os specs
├── playwright.config.ts
├── .env.example
└── package.json
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (recomendado LTS)
- npm (já vem junto com o Node.js)

## Como rodar o projeto

### 1. Instalar as dependências

```bash
npm install
```

### 2. Instalar os navegadores do Playwright

Na primeira vez que for rodar os testes, é necessário instalar os binários dos navegadores usados pelo Playwright:

```bash
npx playwright install
```

### 3. Configurar as variáveis de ambiente

Copie o arquivo de exemplo e preencha com os valores necessários (URL da aplicação, credenciais de teste, etc.):

```bash
cp .env.example .env
```

Depois, edite o `.env` com os valores corretos para o seu ambiente.

### 4. Rodar os testes

Rodar toda a suíte:

```bash
npx playwright test
```

Rodar um arquivo específico:

```bash
npx playwright test essayPreparation.spec.ts
```

Rodar em modo visual (com o navegador aberto):

```bash
npx playwright test --headed
```

Rodar em modo interativo (UI Mode), útil para depuração:

```bash
npx playwright test --ui
```

Rodar um teste específico pelo nome:

```bash
npx playwright test -g "nome do teste"
```

> **Recomendação para máquinas mais limitadas:** o Playwright roda os testes em paralelo por padrão, abrindo múltiplas instâncias do navegador simultaneamente. Em computadores com menos recursos, isso pode causar lentidão e falsos negativos. Se notar instabilidade, rode com apenas um worker:
> ```bash
> npx playwright test --workers=1
> ```

### 5. Ver o relatório de execução

Após rodar os testes, um relatório HTML é gerado automaticamente. Para abri-lo:

```bash
npx playwright show-report
```

## Escrevendo novos testes

Todos os specs devem importar o `test` a partir de `tests/support`, e não diretamente do `@playwright/test`, para garantir que as proteções de cookie e retry sejam aplicadas automaticamente:

```typescript
import { test, users, Login, expect } from '../../support';
```

Ao criar um novo método de ação (Page Object) que dependa de etapas anteriores do fluxo já estarem concluídas, verifique se ele precisa ser "idempotente" — ou seja, capaz de reconhecer que a etapa já foi feita e pular a repetição, evitando quebras quando o `retryOnReload` reexecutar o teste.

## Dados de teste

Os dados usados nos testes (vestibulares, áreas, temas, tipos de texto, gêneros textuais e redações de exemplo) ficam centralizados em `tests/support/fixtures/data/essays.json`, e os usuários de teste em `tests/support/fixtures/data/users.ts`.