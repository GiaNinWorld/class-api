# Exemplo de Uso da API do Carrinho

Este documento mostra como testar a API do carrinho de compras passo a passo.

## Pré-requisitos

1. Certifique-se de que a aplicação está rodando:
```bash
npm run start:dev
```

2. A API estará disponível em: `http://localhost:3000`

## Teste Completo da API

### 1. Criar um Carrinho

```bash
curl -X POST http://localhost:3000/cart
```

**Resposta esperada:**
```json
{
  "id": "cart_1703123456789_abc123def",
  "items": [],
  "total": 0,
  "createdAt": "2023-12-21T10:30:56.789Z",
  "updatedAt": "2023-12-21T10:30:56.789Z"
}
```

### 2. Adicionar Produtos ao Carrinho

```bash
# Adicionar smartphone
curl -X POST http://localhost:3000/cart/cart_1703123456789_abc123def/items \
  -H "Content-Type: application/json" \
  -d '{"productId": "1", "quantity": 2}'

# Adicionar notebook
curl -X POST http://localhost:3000/cart/cart_1703123456789_abc123def/items \
  -H "Content-Type: application/json" \
  -d '{"productId": "2", "quantity": 1}'
```

### 3. Verificar o Carrinho

```bash
curl -X GET http://localhost:3000/cart/cart_1703123456789_abc123def
```

**Resposta esperada:**
```json
{
  "id": "cart_1703123456789_abc123def",
  "items": [
    {
      "productId": "1",
      "quantity": 2,
      "price": 899.99,
      "name": "Smartphone Galaxy Pro",
      "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop"
    },
    {
      "productId": "2",
      "quantity": 1,
      "price": 2499.99,
      "name": "Notebook Gamer Ultra",
      "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop"
    }
  ],
  "total": 4299.97,
  "createdAt": "2023-12-21T10:30:56.789Z",
  "updatedAt": "2023-12-21T10:35:12.345Z"
}
```

### 4. Atualizar Quantidade de um Item

```bash
curl -X PUT http://localhost:3000/cart/cart_1703123456789_abc123def/items/1 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 3}'
```

### 5. Remover um Item

```bash
curl -X DELETE http://localhost:3000/cart/cart_1703123456789_abc123def/items/2
```

### 6. Limpar o Carrinho

```bash
curl -X DELETE http://localhost:3000/cart/cart_1703123456789_abc123def/items
```

### 7. Deletar o Carrinho

```bash
curl -X DELETE http://localhost:3000/cart/cart_1703123456789_abc123def
```

## Teste com GraphQL

Acesse o playground GraphQL em: `http://localhost:3000/graphql`

### Criar Carrinho
```graphql
mutation {
  createCart {
    id
    total
    items {
      productId
      name
      quantity
      price
    }
  }
}
```

### Adicionar Item
```graphql
mutation {
  addItemToCart(cartId: "cart_1703123456789_abc123def", productId: "1", quantity: 2) {
    id
    total
    items {
      productId
      name
      quantity
      price
    }
  }
}
```

### Consultar Carrinho
```graphql
query {
  cart(id: "cart_1703123456789_abc123def") {
    id
    total
    items {
      productId
      name
      quantity
      price
      image
    }
    createdAt
    updatedAt
  }
}
```

## Produtos Disponíveis

Use estes IDs de produtos para testar:

- **ID 1**: Smartphone Galaxy Pro - R$ 899,99
- **ID 2**: Notebook Gamer Ultra - R$ 2.499,99
- **ID 3**: Fone Bluetooth Premium - R$ 299,99
- **ID 4**: Smart TV 55" 4K - R$ 1.899,99
- **ID 5**: Tablet Pro 12" - R$ 1.299,99
- **ID 6**: Smartwatch Elite Series - R$ 449,99
- **ID 7**: Câmera Digital Mirrorless 4K - R$ 1.799,99
- **ID 8**: Console Gaming Pro X - R$ 2.199,99

## Códigos de Status

- **200**: Sucesso
- **201**: Criado com sucesso
- **204**: Deletado com sucesso
- **400**: Dados inválidos
- **404**: Não encontrado

## Validações

- Quantidade deve ser maior que zero
- Produto deve existir no catálogo
- Carrinho deve existir para operações
- Item deve existir no carrinho para atualização/remoção

