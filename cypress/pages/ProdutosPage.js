class ProdutosPage {
  // Elementos (Locators)
  get btnCadastrarProdutos() { return cy.get('[data-testid="cadastrar-produtos"]'); }
  get inputNome() { return cy.get('[data-testid="nome"]'); }
  get inputPreco() { return cy.get('[data-testid="preco"]'); }
  get inputDescricao() { return cy.get('[data-testid="descricao"]'); }
  get inputQuantidade() { return cy.get('[data-testid="quantity"]'); }
  get btnSalvar() { return cy.get('[data-testid="cadastarProdutos"]'); }
  get alertMensagem() { return cy.get('.alert'); }

  // Ações (Methods)
  visitarTelaProdutos() {
    cy.visit('/admin/listarprodutos');
  }

  clicarEmCadastrarProduto() {
    cy.visit('/admin/cadastrarprodutos');
  }

  preencherFormularioProduto(nome, preco, descricao, quantidade) {
    this.inputNome.type(nome);
    this.inputPreco.type(preco);
    this.inputDescricao.type(descricao);
    this.inputQuantidade.type(quantidade);
  }

  submeterCadastroProduto() {
    this.btnSalvar.click();
  }

  validarProdutoNaTabela(nomeProduto) {
    cy.contains(nomeProduto).should('be.visible');
  }

  validarProdutoAusenteNaTabela(nomeProduto) {
    cy.contains(nomeProduto).should('not.exist');
  }

  excluirProdutoPorNome(nomeProduto) {
    cy.contains('tr, .card, div', nomeProduto).find('button').contains('Excluir').click();
  }
}

export default new ProdutosPage();