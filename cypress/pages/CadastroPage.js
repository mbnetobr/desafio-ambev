class CadastroPage {
  // Elementos (Locators)
  get inputNome() { return cy.get('[data-testid="nome"]'); }
  get inputEmail() { return cy.get('[data-testid="email"]'); }
  get inputPassword() { return cy.get('[data-testid="password"]'); }
  get checkboxAdmin() { return cy.get('[data-testid="checkbox"]'); }
  get btnCadastrar() { return cy.get('[data-testid="cadastrar"]'); }
  get alertMensagem() { return cy.get('.alert'); }

  // Ações (Methods)
  visitarTelaCadastro() {
    cy.visit('/cadastrarusuarios');
  }

  preencherNome(nome) {
    this.inputNome.type(nome);
  }

  preencherEmail(email) {
    this.inputEmail.invoke('removeAttr', 'type').type(email);
  }

  submeterFormularioForce() {
    this.btnCadastrar.click({ force: true });
  }

  preencherSenha(password) {
    this.inputPassword.type(password);
  }

  preencherFormulario(nome, email, password, eAdmin = true) {
    this.preencherNome(nome);
    this.preencherEmail(email);
    this.preencherSenha(password);
    
    if (eAdmin) {
      this.checkboxAdmin.check();
    }
  }

  submeterFormulario() {
    this.btnCadastrar.click();
  }
  
}

export default new CadastroPage();