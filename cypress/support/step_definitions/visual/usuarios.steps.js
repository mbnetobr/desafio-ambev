import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('que estou na página de usuários', () => {
  cy.visit('/cadastrar-usuarios');
});

When('o Percy captura a tela de usuários', () => {
  cy.percySnapshot('Tela de Usuarios');
});

Then('o layout visual de usuários deve ser validado com sucesso', () => {
  cy.get('body').should('be.visible');
});