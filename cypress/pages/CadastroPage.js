class CadastroPage {
  // Elementos (Locators)
  get inputNome() { return cy.get('[data-testid="nome"]'); }
  get inputEmail() { return cy.get('[data-testid="email"]'); }
  get inputPassword() { return cy.get('[data-testid="password"]'); }
  get checkboxAdmin() { return cy.get('[data-testid="checkbox"]'); }
  get btnCadastrar() { return cy.get('[data-testid="cadastrar"]'); }
  get alertMensagem() { return cy.get('.alert-dismissible'); }

  // Ações (Methods)
  visitarTelaCadastro() {
    cy.visit('/cadastrarusuarios');
  }

  preencherFormulario(nome, email, password, eAdmin = true) {
    this.inputNome.type(nome);
    this.inputEmail.type(email);
    this.inputPassword.type(password);
    
    if (eAdmin) {
      this.checkboxAdmin.check();
    }
  }

  submeterFormulario() {
    this.btnCadastrar.click();
  }
}

export default new CadastroPage();