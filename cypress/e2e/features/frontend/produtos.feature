# language: pt
@frontend @produtos_ui
Funcionalidade: Frontend - Listagem e Cadastro de Produtos (Admin)

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

  Cenário: Tentar cadastrar um produto com nome já existente via interface administrativa
    Dado que eu esteja autenticado no sistema via API
    E que exista um produto cadastrado no sistema
    Quando eu acessar a listagem de produtos no painel administrativo
    E tentar cadastrar um novo produto com o mesmo nome do produto existente
    Então devo visualizar a mensagem de erro informando que o produto já possui esse nome

  Cenário: Tentar cadastrar um produto com campos obrigatórios em branco
    Dado que eu esteja autenticado no sistema via API
    Quando eu acessar a listagem de produtos no painel administrativo
    E tentar cadastrar um novo produto deixando os campos em branco
    Então devo visualizar as mensagens de obrigatoriedade nos campos do produto