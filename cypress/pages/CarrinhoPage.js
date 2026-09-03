class CarrinhoPage {
  get btnAdicionarNaLista() { return cy.get('[data-testid="adicionarNaLista"]'); }
  get listaProdutos() { return cy.get('.card-body'); }

  visitarHomeConsumidor() {
    cy.visit('/home');
  }

  adicionarPrimeiroProdutoAoCarrinho() {
    this.btnAdicionarNaLista.first().click();
  }
}

export default new CarrinhoPage();