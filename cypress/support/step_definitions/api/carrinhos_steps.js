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
    if (response.body._id) {
      this.carrinhoId = response.body._id;
    }
  });
});

When('eu enviar a requisição para listar os carrinhos', function () {
  CartService.listarCarrinhos().then((response) => {
    this.apiResponse = response;
  });
});

When('eu busco o carrinho pelo ID cadastrado', function () {
  CartService.buscarCarrinhoPorId(this.carrinhoId).then((response) => {
    this.apiResponse = response;
  });
});

When('eu enviar a requisição para concluir a compra do carrinho', function () {
  CartService.concluirCompra(this.authToken).then((response) => {
    this.apiResponse = response;
  });
});

When('eu enviar a requisição para cancelar a compra do carrinho', function () {
  CartService.cancelarCompra(this.authToken).then((response) => {
    this.apiResponse = response;
  });
});

Then('o código de status da resposta de carrinhos deve ser {int}', function (statusCode) {
  expect(this.apiResponse.status).to.eq(statusCode);
});

Then('a mensagem da resposta de carrinhos deve ser {string}', function (mensagemEsperada) {
  expect(this.apiResponse.body.message).to.eq(mensagemEsperada);
});

Then('o corpo da resposta deve estar em conformidade com o JSON Schema de carrinho', function () {
  const validate = ajv.compile(schemaCarrinho);
  const valid = validate(this.apiResponse.body);
  expect(valid, 'Resposta da API deve respeitar o contrato JSON Schema de Carrinho').to.be.true;
});