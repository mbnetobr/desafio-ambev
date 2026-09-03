# cypress/e2e/features/performance/carrinho_performance.feature
Feature: Validação de Performance - Tela de Carrinho
  Background:
    Given que eu esteja autenticado no sistema via API
    
  Scenario: Validar tempo de carregamento do carrinho com rede rapida
    Given que configuro a rede para o perfil "FAST_WIFI"
    When eu acesso a pagina de carrinho
    Then o tempo de carregamento total da pagina deve ser inferior a 2500 milissegundos