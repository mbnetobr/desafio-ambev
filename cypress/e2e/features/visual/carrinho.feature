# language: pt
Funcionalidade: Testes Visuais - Carrinho de Compras

  Cenário: Validar layout do carrinho de compras vazio e preenchido
    Dado que eu esteja autenticado no sistema via API 
    E que estou na página do carrinho de compras
    Quando o Percy captura a tela do carrinho
    Então o layout visual de carrinho deve ser validado com sucesso