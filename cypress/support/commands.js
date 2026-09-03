import AuthService from '../services/AuthService';

Cypress.Commands.add('loginProgramatico', () => {
  return AuthService.obterTokenAdmin().then((token) => {
    // Visita a aplicação primeiro para definir a origem antes de injetar no localStorage
    cy.visit('/login');
    cy.window().then((win) => {
      win.localStorage.setItem('serverest/userToken', token);
    });
  });
});