# language: pt
@frontend @cadastro
Funcionalidade: Frontend - Cadastro de Usuários

  Cenário: Realizar cadastro de um novo usuário administrador via interface com sucesso
    Dado que eu esteja na página de cadastro de usuários
    Quando eu preencher o formulário com dados válidos
    E submeter o cadastro
    Então devo ver a mensagem de sucesso "Cadastro realizado com sucesso" na interface

  Cenário: Tentativa de cadastro com e-mail em branco
    Dado que eu esteja na página de cadastro de usuários
    Quando preencho o nome "Maria Oliveira"
    E preencho a senha "senha123"
    E submeter o cadastro
    Então visualizo a mensagem de erro de campos obrigatórios

  Cenário: Tentativa de cadastro com campos em branco
    Dado que eu esteja na página de cadastro de usuários
    Quando deixo os campos obrigatórios em branco
    E submeter o cadastro
    Então visualizo mensagens de obrigatoriedade nos campos

  Cenário: Tentativa de cadastro com e-mail já cadastrado
    Dado que eu esteja na página de cadastro de usuários
    Quando preencho o nome "Usuário Duplicado"
    E preencho o email "fulano@qa.com"
    E preencho a senha "teste123"
    E submeter o cadastro
    Então visualizo a mensagem de que o e-mail já está sendo usado