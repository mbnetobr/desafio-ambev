# language: pt
@api @produtos
Funcionalidade: API - Gestão de Produtos

  Cenário: Cadastrar um produto com sucesso usando autenticação Bearer Token
    Dado que eu esteja autenticado como um usuário administrador
    E que eu possua dados válidos de um novo produto
    Quando eu enviar uma requisição de cadastro de produto para a API
    Então o código de status da resposta de produtos deve ser 201
    E a mensagem da resposta de produtos deve ser "Cadastro realizado com sucesso"
    E o corpo da resposta deve estar em conformidade com o JSON Schema de produto

  Cenário: Listar todos os produtos cadastrados com sucesso
    Quando eu enviar a requisição para listar os produtos
    Então o código de status da resposta de produtos deve ser 200

  Cenário: Buscar um produto por ID com sucesso
    Dado que eu esteja autenticado como um usuário administrador
    E que eu possua dados válidos de um novo produto
    Quando eu enviar uma requisição de cadastro de produto para a API
    E eu busco o produto pelo ID cadastrado
    Então o código de status da resposta de produtos deve ser 200

  Cenário: Editar um produto com sucesso
    Dado que eu esteja autenticado como um usuário administrador
    E que eu possua dados válidos de um novo produto
    Quando eu enviar uma requisição de cadastro de produto para a API
    E eu altero os dados do produto e envio a requisição de edição
    Então o código de status da resposta de produtos deve ser 200
    E a mensagem da resposta de produtos deve ser "Registro alterado com sucesso"

  Cenário: Deletar um produto com sucesso
    Dado que eu esteja autenticado como um usuário administrador
    E que eu possua dados válidos de um novo produto
    Quando eu enviar uma requisição de cadastro de produto para a API
    E eu enviar a requisição para deletar o produto
    Então o código de status da resposta de produtos deve ser 200
    E a mensagem da resposta de produtos deve ser "Registro excluído com sucesso"