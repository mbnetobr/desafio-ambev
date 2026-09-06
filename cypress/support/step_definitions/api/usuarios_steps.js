import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import UserService from '../../../services/UserService';
import schemaUsuario from '../../../fixtures/schemas/usuario-schema.json';
import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true });

Given('que eu possua dados válidos de um novo usuário', function () {
  this.usuarioPayload = UserService.gerarDadosUsuario('true');
});

When('eu enviar uma requisição de cadastro para a API de usuários', function () {
  UserService.cadastrarUsuario(this.usuarioPayload).then((response) => {
    this.apiResponse = response;
    if (response.body._id) {
      this.usuarioId = response.body._id;
    }
  });
});

When('eu enviar a requisição para listar os usuários', function () {
  UserService.listarUsuarios().then((response) => {
    this.apiResponse = response;
  });
});

When('eu busco o usuário pelo ID cadastrado', function () {
  UserService.buscarUsuarioPorId(this.usuarioId).then((response) => {
    this.apiResponse = response;
  });
});

When('eu enviar a requisição para deletar o usuário', function () {
  UserService.deletarUsuario(this.usuarioId).then((response) => {
    this.apiResponse = response;
  });
});

When('eu altero os dados do usuário e envio a requisição de edição', function () {
  const novoPayload = UserService.gerarDadosUsuario('true');
  UserService.editarUsuario(this.usuarioId, novoPayload).then((response) => {
    this.apiResponse = response;
  });
});

Then('o código de status da resposta deve ser {int}', function (statusCode) {
  expect(this.apiResponse.status).to.eq(statusCode);
});

Then('a mensagem da resposta deve ser {string}', function (mensagemEsperada) {
  expect(this.apiResponse.body.message).to.eq(mensagemEsperada);
});

Then('o corpo da resposta deve estar em conformidade com o JSON Schema de usuário', function () {
  const validate = ajv.compile(schemaUsuario);
  const valid = validate(this.apiResponse.body);
  expect(valid, 'Resposta da API deve respeitar o contrato JSON Schema').to.be.true;
});