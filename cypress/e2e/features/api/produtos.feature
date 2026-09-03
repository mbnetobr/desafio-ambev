#language: pt
@api @produtos
Funcionalidade: API - Gestão de Produtos

  Cenário: Cadastrar um produto com sucesso usando autenticação Bearer Token
    Dado que eu esteja autenticado como um usuário administrador
    E que eu possua dados válidos de um novo produto
    Quando eu enviar uma requisição de cadastro de produto para a API
    Então o código de status da resposta deve ser 201
    E a mensagem da resposta deve ser "Cadastro realizado com sucesso"
    E o corpo da resposta deve estar em conformidade com o JSON Schema de produto