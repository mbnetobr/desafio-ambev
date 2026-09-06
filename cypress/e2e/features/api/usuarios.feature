# language: pt
@api @usuarios
Funcionalidade: API - Gestão de Usuários

  Cenário: Cadastrar um novo usuário com sucesso e validar contrato
    Dado que eu possua dados válidos de um novo usuário
    Quando eu enviar uma requisição de cadastro para a API de usuários
    Então o código de status da resposta deve ser 201
    E a mensagem da resposta deve ser "Cadastro realizado com sucesso"
    E o corpo da resposta deve estar em conformidade com o JSON Schema de usuário

  Cenário: Listar todos os usuários cadastrados com sucesso
    Quando eu enviar a requisição para listar os usuários
    Então o código de status da resposta deve ser 200

  Cenário: Buscar um usuário por ID com sucesso
    Dado que eu possua dados válidos de um novo usuário
    Quando eu enviar uma requisição de cadastro para a API de usuários
    E eu busco o usuário pelo ID cadastrado
    Então o código de status da resposta deve ser 200

  Cenário: Editar um usuário com sucesso
    Dado que eu possua dados válidos de um novo usuário
    Quando eu enviar uma requisição de cadastro para a API de usuários
    E eu altero os dados do usuário e envio a requisição de edição
    Então o código de status da resposta deve ser 200
    E a mensagem da resposta deve ser "Registro alterado com sucesso"

  Cenário: Deletar um usuário com sucesso
    Dado que eu possua dados válidos de um novo usuário
    Quando eu enviar uma requisição de cadastro para a API de usuários
    E eu enviar a requisição para deletar o usuário
    Então o código de status da resposta deve ser 200
    E a mensagem da resposta deve ser "Registro excluído com sucesso"