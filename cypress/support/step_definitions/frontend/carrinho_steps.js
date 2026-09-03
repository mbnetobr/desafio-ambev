import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import UserService from '../../../services/UserService';
import ProductService from '../../../services/ProductService';
import AuthService from '../../../services/AuthService';
import CarrinhoPage from '../../../pages/CarrinhoPage';

Given('que eu esteja autenticado como um usuário consumidor via API', function () {
  this.usuarioConsumidor = UserService.gerarDadosUsuario('false');

  UserService.cadastrarUsuario(this.usuarioConsumidor).then(() => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/login`,
      body: {
        email: this.usuarioConsumidor.email,
        password: this.usuarioConsumidor.password
      }
    }).then((res) => {
      this.userToken = res.body.authorization;
      
      cy.visit('/login', {
        onBeforeLoad(win) {
          win.localStorage.setItem('serverest/userToken', res.body.authorization);
        }
      });
    });
  });
});

Given('que exista um produto disponível no catálogo', function () {
  AuthService.obterTokenAdmin().then((adminToken) => {
    this.produto = ProductService.gerarDadosProduto();
    ProductService.cadastrarProduto(this.produto, adminToken);
  });
});

When('eu acessar a loja e adicionar o produto ao carrinho', function () {
  CarrinhoPage.visitarHomeConsumidor();
  CarrinhoPage.adicionarPrimeiroProdutoAoCarrinho();
});

Then('devo ser redirecionado para a minha lista de compras', function () {
  cy.url().should('include', '/minhaListaDeProdutos');
});

Then('devo visualizar o produto listado na tela', function () {
  CarrinhoPage.listaProdutos.should('be.visible');
});