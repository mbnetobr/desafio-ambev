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

When('submeter o cadastro', function () {
  CadastroPage.submeterFormulario();
});

Then('devo ver a mensagem de sucesso {string} na interface', function (mensagemEsperada) {
  CadastroPage.alertMensagem.should('contain.text', mensagemEsperad);
});