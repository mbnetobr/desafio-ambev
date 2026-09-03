#language: pt
@api @usuarios
Funcionalidade: API - Gestão de Usuários

  Cenário: Cadastrar um novo usuário com sucesso e validar contrato
    Dado que eu possua dados válidos de um novo usuário
    Quando eu enviar uma requisição de cadastro para a API de usuários
    Então o código de status da resposta deve ser 201
    E a mensagem da resposta deve ser "Cadastro realizado com sucesso"
    E o corpo da resposta deve estar em conformidade com o JSON Schema de usuário