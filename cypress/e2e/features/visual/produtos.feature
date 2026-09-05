# language: pt
Funcionalidade: Testes Visuais - Vitrine de Produtos

  Cenário: Validar layout da listagem de produtos da loja
    Dado que eu esteja autenticado no sistema via API
    E que estou na vitrine de produtos
    Quando o Percy captura a tela de produtos
    Então o layout visual de produtos deve ser validado com sucesso