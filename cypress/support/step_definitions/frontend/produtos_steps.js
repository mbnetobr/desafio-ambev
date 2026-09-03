import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import ProductService from '../../../services/ProductService';
import ProdutosPage from '../../../pages/ProdutosPage';
import AuthService from '../../../services/AuthService';

Given('que eu esteja autenticado no sistema via API', function () {
  AuthService.obterTokenAdmin().then((token) => {
    this.authToken = token;
    cy.visit('/login', {
      onBeforeLoad(win) {
        win.localStorage.setItem('serverest/userToken', token);
      }
    });
  });
});

Given('que exista um produto cadastrado no sistema', function () {
  this.produto = ProductService.gerarDadosProduto();
  
  ProductService.cadastrarProduto(this.produto, this.authToken).then((res) => {
    this.produtoId = res.body._id;
  });
});

When('eu acessar a listagem de produtos no painel administrativo', function () {
  ProdutosPage.visitarTelaProdutos();
});

Then('devo visualizar o produto correspondente listado na tabela', function () {
  ProdutosPage.validarProdutoNaTabela(this.produto.nome);
});

When('solicitar a exclusão do produto criado', function () {
  ProdutosPage.excluirProdutoPorNome(this.produto.nome);
});

Then('o produto não deve mais ser exibido na tabela', function () {
  ProdutosPage.validarProdutoAusenteNaTabela(this.produto.nome);
});