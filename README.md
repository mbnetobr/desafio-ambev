# Suite de Automação de Testes E2E & API — ServeRest

Este repositório contém a solução completa de testes automatizados para a plataforma **ServeRest** (API e Frontend Web), utilizando **Cypress v13**, **Cucumber (BDD)**, **Page Object Model (POM)**, **AJV Schema Validation** e integração contínua via **GitHub Actions**.

## Demonstração em Vídeo

Assista ao vídeo explicativo detalhando a arquitetura, a suíte de testes e o funcionamento completo do projeto:

- [🔗 Acessar Vídeo de Apresentação no Google Drive](https://drive.google.com/file/d/18SWPBW9BiKrv1DRe-YqpZx8XNHaQ1U4y/view?usp=sharing)

---

## Arquitetura e Padrões de Projeto

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
│   │       └── Performance/         # BDDs de Testes de Performance 
│   │           ├── cadastro.feature
│   │           ├── produtos.feature
│   │           └── carrinho.feature
│   │       └── Visual/              # BDDs de Testes Visuais
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
│       │   ├── performance/
│       │   └── visuais/
│       ├── commands.js              # Comandos Customizados Cypress
│       └── e2e.js                   # Setup Global de Suporte
├── .cypress-cucumber-preprocessorrc.json
├── .eslintrc.json
├── cypress.config.js                # Configuração Principal do Cypress
└── package.json                     # Scripts e Dependências Node
```
## Tecnologias Utilizadas

- Cypress v13: Framework principal de automação.
- @badeball/cypress-cucumber-preprocessor: Suporte ao BDD / Gherkin.
- @bahmutov/cypress-esbuild-preprocessor: Compilação ultra-rápida das features.
- AJV: Validador de JSON Schema para testes de contrato.
- @faker-js/faker: Geração dinâmica de massa de dados.
- Mochawesome Reporter: Relatórios HTML interativos e consolidados.
- GitHub Actions: Execução automatizada e publicação dos artefatos de teste em CI/CD.

## Como Executar o Projeto Localmente

- Clonar o repositório e instalar as dependências
- git clone [https://github.com/mbnetobr/desafio-ambev.git](https://github.com/mbnetobr/desafio-ambev.git)
- cd desafio-ambev
- npm install

## Comandos:

- npm run cypress:open -- abre o Cypress Runner no modo interativo (UI).
- npm run test:api -- executa apenas os testes de API (Headless).
- npm run test:frontend -- executa apenas os testes Frontend E2E (Headless).
- npm run test:all -- executa toda a suíte de testes (API + Frontend) e gera relatórios.
- npm run lint -- Executa a análise estática do código com o ESLint.

## Esteira de CI/CD (GitHub Actions)

<img width="1048" height="165" alt="Captura de Tela 2026-09-07 às 00 19 52" src="https://github.com/user-attachments/assets/4d839187-b1ea-4e27-bd32-0b97255e78d8" />


- A cada push ou pull_request enviado para as branches main ou master, o GitHub Actions dispara automaticamente o pipeline (e2e-pipeline.yml), realizando:
- Instalação limpa do ambiente e dependências (npm ci).
- Validação do código estático (npm run lint).
- Execução de Testes de API como pré condição para demais testes.
- Execução de Testes de Frontend, Matriz de Browsers: Chrome, Electron e Edge.
- Execução de Testes de Performance com plugin Cypress Perfromance.
- Execução de Testes Visuais com Percy.
- Publicação dos relatórios do Mochawesome como Artefatos da Action.
- Envio de resultados dos testes para o dashboard no Grafana

## Grafana - Gráficos com Resultados dos Testes

<img width="1458" height="592" alt="Captura de Tela 2026-09-07 às 00 23 02" src="https://github.com/user-attachments/assets/5952953b-ee01-4dd4-84ec-e5251d611d76" />

Link do Dashboard: https://petiterisotto2669.grafana.net/public-dashboards/503bc628017645d5828d98aca5cd8bfd?from=now-3h&to=now&timezone=browser 
