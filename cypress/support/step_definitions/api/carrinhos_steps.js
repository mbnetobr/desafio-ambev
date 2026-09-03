import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import ProductService from '../../../services/ProductService';
import CartService from '../../../services/CartService';
import schemaCarrinho from '../../../fixtures/schemas/carrinho-schema.json';
import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true });

Given('que eu tenha um produto cadastrado no sistema', function () {
  const produtoPayload = ProductService.gerarDadosProduto();

  ProductService.cadastrarProduto(produtoPayload, this.authToken).then((response) => {
    this.produtoId = response.body._id;
  });
});

When('eu enviar uma requisição para adicionar esse produto ao carrinho', function () {
  CartService.cadastrarCarrinho(this.produtoId, 1, this.authToken).then((response) => {
    this.apiResponse = response;
  });
});

Then('o corpo da resposta deve estar em conformidade com o JSON Schema de carrinho', function () {
  const validate = ajv.compile(schemaCarrinho);
  const valid = validate(this.apiResponse.body);
  expect(valid, 'Resposta da API deve respeitar o contrato JSON Schema de Carrinho').to.be.true;
});