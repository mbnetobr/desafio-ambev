# language: pt
@api @carrinhos
Funcionalidade: API - Gestão de Carrinhos de Compras

  Cenário: Criar um carrinho de compras com sucesso e validar contrato
    Dado que eu esteja autenticado como um usuário administrador
    E que eu tenha um produto cadastrado no sistema
    Quando eu enviar uma requisição para adicionar esse produto ao carrinho
    Então o código de status da resposta de carrinhos deve ser 201
    E a mensagem da resposta de carrinhos deve ser "Cadastro realizado com sucesso"
    E o corpo da resposta deve estar em conformidade com o JSON Schema de carrinho

  Cenário: Listar todos os carrinhos cadastrados com sucesso
    Quando eu enviar a requisição para listar os carrinhos
    Então o código de status da resposta de carrinhos deve ser 200

  Cenário: Buscar um carrinho por ID com sucesso
    Dado que eu esteja autenticado como um usuário administrador
    E que eu tenha um produto cadastrado no sistema
    Quando eu enviar uma requisição para adicionar esse produto ao carrinho
    E eu busco o carrinho pelo ID cadastrado
    Então o código de status da resposta de carrinhos deve ser 200

  Cenário: Concluir uma compra de carrinho com sucesso
    Dado que eu esteja autenticado como um usuário administrador
    E que eu tenha um produto cadastrado no sistema
    Quando eu enviar uma requisição para adicionar esse produto ao carrinho
    E eu enviar a requisição para concluir a compra do carrinho
    Então o código de status da resposta de carrinhos deve ser 200
    E a mensagem da resposta de carrinhos deve ser "Registro excluído com sucesso"

  Cenário: Cancelar uma compra de carrinho com sucesso
    Dado que eu esteja autenticado como um usuário administrador
    E que eu tenha um produto cadastrado no sistema
    Quando eu enviar uma requisição para adicionar esse produto ao carrinho
    E eu enviar a requisição para cancelar a compra do carrinho
    Então o código de status da resposta de carrinhos deve ser 200
    E a mensagem da resposta de carrinhos deve ser "Registro excluído com sucesso. Estoque dos produtos reabastecido"