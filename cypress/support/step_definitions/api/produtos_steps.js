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
  });
});

Then('o corpo da resposta deve estar em conformidade com o JSON Schema de produto', function () {
  const validate = ajv.compile(schemaProduto);
  const valid = validate(this.apiResponse.body);
  expect(valid, 'Resposta da API deve respeitar o contrato JSON Schema de Produto').to.be.true;
});