# language: pt
@frontend @carrinho_ui
Funcionalidade: Frontend - Lista de Compras / Carrinho

  Cenário: Adicionar um produto à lista de compras com sucesso
    Dado que eu esteja autenticado como um usuário consumidor via API
    E que exista um produto disponível no catálogo
    Quando eu acessar a loja e adicionar o produto ao carrinho
    Então devo ser redirecionado para a minha lista de compras
    E devo visualizar o produto listado na tela

  Cenário: Limpar a lista de compras após adicionar produtos
    Dado que eu esteja autenticado como um usuário consumidor via API
    E que exista um produto disponível no catálogo
    Quando eu acessar a loja e adicionar o produto ao carrinho
    E solicitar a limpeza da lista de compras
    Então a lista de compras deve ficar vazia

  Cenário: Tentar finalizar a compra com a lista de compras vazia
    Dado que eu esteja autenticado como um usuário consumidor via API
    Quando eu acessar diretamente a minha lista de compras vazia
    E tentar prosseguir com a compra
    Então devo visualizar a mensagem informando que o carrinho está vazio

  Cenário: Aumentar a quantidade de um item diretamente na lista de compras
    Dado que eu esteja autenticado como um usuário consumidor via API
    E que exista um produto disponível no catálogo
    Quando eu acessar a loja e adicionar o produto ao carrinho
    E solicitar o acréscimo da quantidade do produto na lista
    Então devo visualizar a quantidade atualizada do produto na tela