class ProdutosPage {
  get tabelaProdutos() { return cy.get('table tbody'); }
  get linhasTabela() { return cy.get('table tbody tr'); }

  visitarTelaProdutos() {
    cy.visit('/admin/listarprodutos');
  }

  validarProdutoNaTabela(nomeProduto) {
    this.tabelaProdutos.should('contain.text', nomeProduto);
  }

  excluirProdutoPorNome(nomeProduto) {
    this.linhasTabela.contains('td', nomeProduto).parent('tr').within(() => {
      cy.get('button').contains('Excluir').click();
    });
  }

  validarProdutoAusenteNaTabela(nomeProduto) {
    this.tabelaProdutos.should('not.contain.text', nomeProduto);
  }
}

export default new ProdutosPage();