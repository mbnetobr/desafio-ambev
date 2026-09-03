#language: pt
@api @carrinhos
Funcionalidade: API - Gestão de Carrinhos de Compras

  Cenário: Criar um carrinho de compras com sucesso e validar contrato
    Dado que eu esteja autenticado como um usuário administrador
    E que eu tenha um produto cadastrado no sistema
    Quando eu enviar uma requisição para adicionar esse produto ao carrinho
    Então o código de status da resposta deve ser 201
    E a mensagem da resposta deve ser "Cadastro realizado com sucesso"
    E o corpo da resposta deve estar em conformidade com o JSON Schema de carrinho