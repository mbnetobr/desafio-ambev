# cypress/e2e/features/performance/usuarios_performance.feature
Feature: Validação de Performance - Tela de Usuários
  Scenario: Validar tempo de carregamento da listagem de usuários com rede rapida
    Given que configuro a rede para o perfil "FAST_WIFI"
    When eu acesso a pagina de usuarios
    Then o tempo de carregamento total da pagina deve ser inferior a 2500 milissegundos