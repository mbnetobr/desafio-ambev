import { faker } from '@faker-js/faker';

class ProductService {
  gerarDadosProduto() {
    return {
      nome: faker.commerce.productName() + ` ${Date.now()}`,
      preco: Number(faker.commerce.price({ min: 10, max: 1000 })),
      descricao: faker.commerce.productDescription(),
      quantidade: faker.number.int({ min: 1, max: 100 })
    };
  }

  cadastrarProduto(produto, token) {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/produtos`,
      body: produto,
      headers: { authorization: token },
      failOnStatusCode: false
    });
  }

  listarProdutos() {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos`,
      failOnStatusCode: false
    });
  }

  buscarProdutoPorId(id) {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos/${id}`,
      failOnStatusCode: false
    });
  }

  deletarProduto(id, token) {
    return cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiUrl')}/produtos/${id}`,
      headers: { authorization: token },
      failOnStatusCode: false
    });
  }

  editarProduto(id, produto, token) {
    return cy.request({
      method: 'PUT',
      url: `${Cypress.env('apiUrl')}/produtos/${id}`,
      body: produto,
      headers: { authorization: token },
      failOnStatusCode: false
    });
  }
}

export default new ProductService();