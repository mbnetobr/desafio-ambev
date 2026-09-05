#language: pt
@frontend @cadastro
Funcionalidade: Frontend - Cadastro de Usuários

  Cenário: Realizar cadastro de um novo usuário administrador via interface com sucesso
    Dado que eu esteja na página de cadastro de usuários
    Quando eu preencher o formulário com dados válidos
    E submeter o cadastro
    Então devo ver a mensagem de sucesso "Cadastro realizado com sucess" na interface