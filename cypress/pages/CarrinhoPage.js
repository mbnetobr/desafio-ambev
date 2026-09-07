class CarrinhoPage {
  get btnAdicionarNaLista() { return cy.get('[data-testid="adicionarNaLista"]'); }
  get listaProdutos() { return cy.get('.card-body'); }
  get btnLimparLista() { return cy.get('[data-testid="limparLista"]'); }
  get btnAdicionarQuantidade() { return cy.get('.ri-add-fill, [data-testid="adicionar-quantidade"], button:has(.ri-add-fill)'); }
  get alertMensagem() { return cy.get('.alert'); }

  visitarHomeConsumidor() {
    cy.visit('/home');
  }

  visitarListaCompras() {
    cy.visit('/minhaListaDeProdutos');
  }

  adicionarPrimeiroProdutoAoCarrinho() {
    this.btnAdicionarNaLista.first().click();
  }

  limparListaCompras() {
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="limparLista"]').length > 0) {
        this.btnLimparLista.click();
      }
    });
  }

  aumentarQuantidadeProduto() {
    // Clica no botão de somar/incrementar quantidade do produto na lista
    cy.get('.card-body button').last().click();
  }

  validarListaVazia() {
    cy.contains('Seu carrinho está vazio').should('be.visible');
  }

  validarMensagemCarrinhoVazio() {
    cy.contains('Seu carrinho está vazio').should('be.visible');
  }

  validarQuantidadeAtualizada() {
    cy.contains('2').should('be.visible');
  }
}

export default new CarrinhoPage();