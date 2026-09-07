import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import CadastroPage from '../../../pages/CadastroPage';
import UserService from '../../../services/UserService';

Given('que eu esteja na página de cadastro de usuários', function () {
  CadastroPage.visitarTelaCadastro();
});

When('eu preencher o formulário com dados válidos', function () {
  this.usuario = UserService.gerarDadosUsuario('true');
  CadastroPage.preencherFormulario(
    this.usuario.nome,
    this.usuario.email,
    this.usuario.password,
    true
  );
});

When('preencho o nome {string}', function (nome) {
  CadastroPage.preencherNome(nome);
});

When('preencho o email {string}', function (email) {
  CadastroPage.inputEmail.type(email, { force: true });
});

When('preencho a senha {string}', function (senha) {
  CadastroPage.preencherSenha(senha);
});

When('deixo os campos obrigatórios em branco', function () {
  // Apenas avança sem preencher para disparar validações nativas ou da aplicação
});

When('submeter o cadastro', function () {
  CadastroPage.submeterFormularioForce();
});


Then('devo ver a mensagem de sucesso {string} na interface', function (mensagemEsperada) {
  CadastroPage.alertMensagem.should('contain.text', mensagemEsperada);
});

Then('visualizo a mensagem de erro de email inválido', function () {
  CadastroPage.alertMensagem.should('contain.text', 'Email deve ser um email válido');
});

Then('visualizo mensagens de obrigatoriedade nos campos', function () {
  CadastroPage.alertMensagem.should('be.visible');
});

Then('visualizo a mensagem de que o e-mail já está sendo usado', function () {
  CadastroPage.alertMensagem.should('contain.text', 'Este email já está sendo usado');
});

Then('visualizo a mensagem de erro de campos obrigatórios', function () {
  CadastroPage.alertMensagem.should('be.visible').and('contain.text', 'Email é obrigatório');
});