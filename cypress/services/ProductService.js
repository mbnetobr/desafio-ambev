import { faker } from '@faker-js/faker';

class ProductService {
  gerarDadosProduto() {
    return {
      nome: `Produto ${faker.commerce.productName()} ${faker.string.alphanumeric(5)}`,
      preco: parseInt(faker.commerce.price({ min: 10, max: 500 })),
      descricao: faker.commerce.productDescription(),
      quantidade: faker.number.int({ min: 1, max: 100 })
    };
  }

  cadastrarProduto(produto, token) {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/produtos`,
      headers: {
        authorization: token
      },
      body: produto,
      failOnStatusCode: false
    });
  }
}

export default new ProductService();