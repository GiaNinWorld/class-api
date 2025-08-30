# ⚡ Quick Start - API Carrinho de Compras

## 🚀 Início Rápido

```bash
# Instalar e executar
npm install
npm run start:dev
```

**URLs:**
- REST API: `http://localhost:3000`
- GraphQL: `http://localhost:3000/graphql`

---

## 📋 Endpoints Principais

### REST API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/` | Health check |
| `GET` | `/product/:id` | Consultar produto |
| `POST` | `/cart` | Criar carrinho |
| `GET` | `/cart/:id` | Consultar carrinho |
| `POST` | `/cart/:id/items` | Adicionar item |
| `PUT` | `/cart/:id/items/:productId` | Atualizar item |
| `DELETE` | `/cart/:id/items/:productId` | Remover item |
| `DELETE` | `/cart/:id/items` | Limpar carrinho |
| `DELETE` | `/cart/:id` | Deletar carrinho |

### GraphQL

| Tipo | Query/Mutation | Descrição |
|------|----------------|-----------|
| `Query` | `products(id: String)` | Consultar produto |
| `Query` | `cart(id: String)` | Consultar carrinho |
| `Mutation` | `createCart` | Criar carrinho |
| `Mutation` | `addItemToCart` | Adicionar item |
| `Mutation` | `updateCartItem` | Atualizar item |
| `Mutation` | `removeItemFromCart` | Remover item |
| `Mutation` | `clearCart` | Limpar carrinho |
| `Mutation` | `deleteCart` | Deletar carrinho |

---

## 🛍️ Produtos Disponíveis

| ID | Nome | Preço | Em Estoque |
|----|------|-------|------------|
| 1 | Smartphone Galaxy Pro | R$ 899,99 | ✅ |
| 2 | Notebook Gamer Ultra | R$ 2.499,99 | ✅ |
| 3 | Fone Bluetooth Premium | R$ 299,99 | ✅ |
| 4 | Smart TV 55" 4K | R$ 1.899,99 | ❌ |
| 5 | Tablet Pro 12" | R$ 1.299,99 | ✅ |
| 6 | Smartwatch Elite Series | R$ 449,99 | ✅ |
| 7 | Câmera Digital Mirrorless 4K | R$ 1.799,99 | ❌ |
| 8 | Console Gaming Pro X | R$ 2.199,99 | ✅ |

---

## 🧪 Testes Rápidos

### REST (cURL)

```bash
# Health check
curl -X GET http://localhost:3000/

# Criar carrinho
curl -X POST http://localhost:3000/cart

# Adicionar produto (use ID retornado)
curl -X POST http://localhost:3000/cart/CART_ID/items \
  -H "Content-Type: application/json" \
  -d '{"productId": "1", "quantity": 2}'

# Consultar carrinho
curl -X GET http://localhost:3000/cart/CART_ID
```

### GraphQL

```graphql
# Criar carrinho
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

# Adicionar item (use ID retornado)
mutation {
  addItemToCart(cartId: "CART_ID", productId: "1", quantity: 2) {
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

# Consultar carrinho
query {
  cart(id: "CART_ID") {
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

---

## 📊 Estrutura de Dados

### Carrinho
```json
{
  "id": "cart_1703123456789_abc123def",
  "items": [
    {
      "productId": "1",
      "quantity": 2,
      "price": 899.99,
      "name": "Smartphone Galaxy Pro",
      "image": "https://..."
    }
  ],
  "total": 1799.98,
  "createdAt": "2023-12-21T10:30:56.789Z",
  "updatedAt": "2023-12-21T10:35:12.345Z"
}
```

### Produto
```json
{
  "id": "1",
  "name": "Smartphone Galaxy Pro",
  "price": 899.99,
  "originalPrice": 1199.99,
  "description": "Smartphone premium...",
  "image": "https://...",
  "category": "Eletrônicos",
  "inStock": true
}
```

---

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod

# Testes
npm run test
npm run test:e2e

# Linting
npm run lint
npm run format
```

---

## ⚠️ Validações

- Quantidade deve ser > 0
- Produto deve existir (IDs 1-8)
- Produto deve estar em estoque
- Carrinho deve existir para operações

---

## 📝 Códigos de Status

| Código | Descrição |
|--------|-----------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 404 | Not Found |

---

## 🔗 Documentação Completa

- **Documentação Completa**: `DOCUMENTACAO_COMPLETA.md`
- **Exemplos de Teste**: `EXEMPLOS_TESTE_API.md`
- **Queries GraphQL**: `GRAPHQL_QUERIES.md`
- **Exemplos REST**: `EXEMPLO_USO.md`
