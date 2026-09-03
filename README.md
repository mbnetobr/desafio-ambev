# 🚀 Suite de Automação de Testes E2E & API — ServeRest

Este repositório contém a solução completa de testes automatizados para a plataforma **ServeRest** (API e Frontend Web), utilizando **Cypress v13**, **Cucumber (BDD)**, **Page Object Model (POM)**, **AJV Schema Validation** e integração contínua via **GitHub Actions**.

---

## 🏗️ Arquitetura e Padrões de Projeto

A arquitetura do projeto foi desenvolvida focando em manutenibilidade, alta performance e reuso de código:

- **BDD (Behavior Driven Development):** Cenários descritos em Gherkin em português (`.feature`).
- **Page Object Model (POM):** Mapeamento e encapsulamento dos elementos e ações das telas da interface (`cypress/pages`).
- **Service Layer Pattern:** Camada isolada para requisições HTTP de API (`cypress/services`).
- **Programmatic Authentication:** Autenticação via API com injeção de token no `localStorage` antes da renderização da UI, evitando o anti-pattern de testes manuais de login em suítes E2E.
- **Contract Testing (AJV):** Validação rigorosa dos schemas JSON das respostas de API em relação aos modelos esperados.

---

## 📁 Estrutura do Projeto

```text
ambev/
├── .github/
│   └── workflows/
│       └── e2e-pipeline.yml         # Esteira de CI/CD do GitHub Actions
├── cypress/
│   ├── e2e/
│   │   └── features/
│   │       ├── api/                 # BDDs de Testes de API
│   │       │   ├── usuarios.feature
│   │       │   ├── produtos.feature
│   │       │   └── carrinhos.feature
│   │       └── frontend/            # BDDs de Testes E2E Web (UI)
│   │           ├── cadastro.feature
│   │           ├── produtos.feature
│   │           └── carrinho.feature
│   ├── fixtures/
│   │   └── schemas/                 # Contratos JSON Schema para AJV
│   │       ├── usuario-schema.json
│   │       ├── produto-schema.json
│   │       └── carrinho-schema.json
│   ├── pages/                       # Page Object Model (POM)
│   │   ├── CadastroPage.js
│   │   ├── ProdutosPage.js
│   │   └── CarrinhoPage.js
│   ├── services/                    # Service Layer (Requisições HTTP)
│   │   ├── UserService.js
│   │   ├── AuthService.js
│   │   ├── ProductService.js
│   │   └── CartService.js
│   └── support/
│       ├── step_definitions/        # Implementação dos Passos BDD
│       │   ├── api/
│       │   └── frontend/
│       ├── commands.js              # Comandos Customizados Cypress
│       └── e2e.js                   # Setup Global de Suporte
├── .cypress-cucumber-preprocessorrc.json
├── .eslintrc.json
├── cypress.config.js                # Configuração Principal do Cypress
└── package.json                     # Scripts e Dependências Node

🛠️ Tecnologias Utilizadas
Cypress v13: Framework principal de automação.

@badeball/cypress-cucumber-preprocessor: Suporte ao BDD / Gherkin.

@bahmutov/cypress-esbuild-preprocessor: Compilação ultra-rápida das features.

AJV: Validador de JSON Schema para testes de contrato.

@faker-js/faker: Geração dinâmica de massa de dados.

Mochawesome Reporter: Relatórios HTML interativos e consolidados.

GitHub Actions: Execução automatizada e publicação dos artefatos de teste em CI/CD.

⚡ Como Executar o Projeto Localmente
1. Clonar o repositório e instalar as dependências
Bash
git clone [https://github.com/mbnetobr/desafio-ambev.git](https://github.com/mbnetobr/desafio-ambev.git)
cd desafio-ambev
npm install

Comandos:
npm run cypress:open,Abre o Cypress Runner no modo interativo (UI).
npm run test:api,Executa apenas os testes de API (Headless).
npm run test:frontend,Executa apenas os testes Frontend E2E (Headless).
npm run test:all,Executa toda a suíte de testes (API + Frontend) e gera relatórios.
npm run lint,Executa a análise estática do código com o ESLint.

🔄 Esteira de CI/CD (GitHub Actions)
A cada push ou pull_request enviado para as branches main ou master, o GitHub Actions dispara automaticamente o pipeline (e2e-pipeline.yml), realizando:

Instalação limpa do ambiente e dependências (npm ci).

Validação do código estático (npm run lint).

Execução completa da suíte de testes (npm run test:all).

Publicação dos relatórios do Mochawesome como Artefatos da Action.
