// cypress/support/step_definitions/performance_steps.js
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import 'cypress-performance';


Given('que configuro a rede para o perfil {string}', (perfil) => {
  cy.setNetworkConditions(perfil);
});

When('eu acesso a pagina de usuarios', () => {
  cy.visit('/cadastrarusuarios');
});

When('eu acesso a pagina de carrinho', () => {
  cy.visit('/minhaListaDeProdutos');
});

When('eu acesso a pagina de produtos', () => {
  cy.visit('/admin/listarprodutos');
});

Then('o tempo de carregamento total da pagina deve ser inferior a {int} milissegundos', (limite) => {
  cy.performance({ timeout: 10000 }).then((results) => {
    expect(results.pageloadTiming).to.be.lessThan(limite);
  });
});