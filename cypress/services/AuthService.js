import UserService from './UserService';

class AuthService {
  obterTokenAdmin() {
    const usuarioAdmin = UserService.gerarDadosUsuario('true');

    return UserService.cadastrarUsuario(usuarioAdmin).then(() => {
      return cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/login`,
        body: {
          email: usuarioAdmin.email,
          password: usuarioAdmin.password
        }
      }).its('body.authorization');
    });
  }
}

export default new AuthService();