import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('que estou na página do carrinho de compras', () => {
  cy.visit('/minhalistaDeProdutos');
});

When('o Percy captura a tela do carrinho', () => {
  cy.percySnapshot('Tela de Carrinho');
});

Then('o layout visual de carrinho deve ser validado com sucesso', () => {
  cy.get('body').should('be.visible');
});