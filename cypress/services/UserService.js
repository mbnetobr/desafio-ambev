import { faker } from '@faker-js/faker';

class UserService {
  gerarDadosUsuario(administrador = 'true') {
    return {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 8 }),
      administrador: administrador
    };
  }

  cadastrarUsuario(usuario) {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      body: usuario,
      failOnStatusCode: false
    });
  }

  listarUsuarios() {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      failOnStatusCode: false
    });
  }

  buscarUsuarioPorId(id) {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/usuarios/${id}`,
      failOnStatusCode: false
    });
  }

  deletarUsuario(id) {
    return cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiUrl')}/usuarios/${id}`,
      failOnStatusCode: false
    });
  }

  editarUsuario(id, usuario) {
    return cy.request({
      method: 'PUT',
      url: `${Cypress.env('apiUrl')}/usuarios/${id}`,
      body: usuario,
      failOnStatusCode: false
    });
  }
}

export default new UserService();