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
}

export default new UserService();