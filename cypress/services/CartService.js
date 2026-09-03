class CartService {
  cadastrarCarrinho(idProduto, quantidade, token) {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/carrinhos`,
      headers: {
        authorization: token
      },
      body: {
        produtos: [
          {
            idProduto: idProduto,
            quantidade: quantidade
          }
        ]
      },
      failOnStatusCode: false
    });
  }
}

export default new CartService();