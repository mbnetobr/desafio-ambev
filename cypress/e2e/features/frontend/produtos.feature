#language: pt
@frontend @produtos_ui
Funcionalidade: Frontend - Listagem de Produtos (Admin)

  Cenário: Visualizar um produto recém-cadastrado na tabela de produtos
    Dado que eu esteja autenticado no sistema via API
    E que exista um produto cadastrado no sistema
    Quando eu acessar a listagem de produtos no painel administrativo
    Então devo visualizar o produto correspondente listado na tabela

  Cenário: Excluir um produto existente através da interface do painel
    Dado que eu esteja autenticado no sistema via API
    E que exista um produto cadastrado no sistema
    Quando eu acessar a listagem de produtos no painel administrativo
    E solicitar a exclusão do produto criado
    Então o produto não deve mais ser exibido na tabela