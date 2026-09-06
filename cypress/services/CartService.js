import ProductService from './ProductService';

class CartService {
  cadastrarCarrinho(produtoId, quantidade, token) {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/carrinhos`,
      body: {
        produtos: [
          {
            idProduto: produtoId,
            quantidade: quantidade
          }
        ]
      },
      headers: { authorization: token },
      failOnStatusCode: false
    });
  }

  listarCarrinhos() {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/carrinhos`,
      failOnStatusCode: false
    });
  }

  buscarCarrinhoPorId(id) {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/carrinhos/${id}`,
      failOnStatusCode: false
    });
  }

  concluirCompra(token) {
    return cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiUrl')}/carrinhos/concluir-compra`,
      headers: { authorization: token },
      failOnStatusCode: false
    });
  }

  cancelarCompra(token) {
    return cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiUrl')}/carrinhos/cancelar-compra`,
      headers: { authorization: token },
      failOnStatusCode: false
    });
  }
}

export default new CartService();