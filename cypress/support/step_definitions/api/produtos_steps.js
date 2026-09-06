import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import AuthService from '../../../services/AuthService';
import ProductService from '../../../services/ProductService';
import schemaProduto from '../../../fixtures/schemas/produto-schema.json';
import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true });

Given('que eu esteja autenticado como um usuário administrador', function () {
  AuthService.obterTokenAdmin().then((token) => {
    this.authToken = token;
  });
});

Given('que eu possua dados válidos de um novo produto', function () {
  this.produtoPayload = ProductService.gerarDadosProduto();
});

When('eu enviar uma requisição de cadastro de produto para a API', function () {
  ProductService.cadastrarProduto(this.produtoPayload, this.authToken).then((response) => {
    this.apiResponse = response;
    if (response.body._id) {
      this.produtoId = response.body._id;
    }
  });
});

When('eu enviar a requisição para listar os produtos', function () {
  ProductService.listarProdutos().then((response) => {
    this.apiResponse = response;
  });
});

When('eu busco o produto pelo ID cadastrado', function () {
  ProductService.buscarProdutoPorId(this.produtoId).then((response) => {
    this.apiResponse = response;
  });
});

When('eu enviar a requisição para deletar o produto', function () {
  ProductService.deletarProduto(this.produtoId, this.authToken).then((response) => {
    this.apiResponse = response;
  });
});

When('eu altero os dados do produto e envio a requisição de edição', function () {
  const novoPayload = ProductService.gerarDadosProduto();
  ProductService.editarProduto(this.produtoId, novoPayload, this.authToken).then((response) => {
    this.apiResponse = response;
  });
});

Then('o código de status da resposta de produtos deve ser {int}', function (statusCode) {
  expect(this.apiResponse.status).to.eq(statusCode);
});

Then('a mensagem da resposta de produtos deve ser {string}', function (mensagemEsperada) {
  expect(this.apiResponse.body.message).to.eq(mensagemEsperada);
});

Then('o corpo da resposta deve estar em conformidade com o JSON Schema de produto', function () {
  const validate = ajv.compile(schemaProduto);
  const valid = validate(this.apiResponse.body);
  expect(valid, 'Resposta da API deve respeitar o contrato JSON Schema de Produto').to.be.true;
});