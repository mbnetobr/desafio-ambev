#language: pt
@frontend @carrinho_ui
Funcionalidade: Frontend - Lista de Compras / Carrinho

  Cenário: Adicionar um produto à lista de compras com sucesso
    Dado que eu esteja autenticado como um usuário consumidor via API
    E que exista um produto disponível no catálogo
    Quando eu acessar a loja e adicionar o produto ao carrinho
    Então devo ser redirecionado para a minha lista de compras
    E devo visualizar o produto listado na tela