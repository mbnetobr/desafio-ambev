Feature: Validação de Performance - Tela de Produtos
  Background:
    Given que eu esteja autenticado no sistema via API

  Scenario: Validar o tempo de carregamento da listagem de produtos com rede rapida
    Given que configuro a rede para o perfil "FAST_WIFI"
    When eu acesso a pagina de produtos
    Then o tempo de carregamento total da pagina deve ser inferior a 2500 milissegundos