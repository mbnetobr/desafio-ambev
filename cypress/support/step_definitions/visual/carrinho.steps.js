import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('que estou na vitrine de produtos', () => {
  cy.visit('/admin/home');
});

When('o Percy captura a tela de produtos', () => {
  cy.percySnapshot('Tela de Produtos');
});

Then('o layout visual de produtos deve ser validado com sucesso', () => {
  cy.get('body').should('be.visible');
});