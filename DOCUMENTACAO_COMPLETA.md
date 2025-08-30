# 📚 Documentação Completa - API de Carrinho de Compras

## 🚀 Visão Geral

Este é um projeto NestJS que implementa uma API de carrinho de compras com suporte tanto para REST quanto para GraphQL. A aplicação permite gerenciar carrinhos de compras, adicionar/remover produtos e consultar informações de produtos.

### 🛠️ Tecnologias Utilizadas

- **NestJS** - Framework Node.js
- **TypeScript** - Linguagem de programação
- **GraphQL** - Query language para APIs
- **Apollo Server** - Servidor GraphQL
- **Express** - Framework web

## 📋 Pré-requisitos

- Node.js >= 20.0.0
- npm >= 10.0.0

## 🚀 Instalação e Execução

### 1. Instalar Dependências
```bash
npm install
```

### 2. Executar em Modo Desenvolvimento
```bash
npm run start:dev
```

### 3. Executar em Modo Produção
```bash
npm run build
npm run start:prod
```

### 4. Executar Testes
```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## 🌐 Endpoints da API

A aplicação estará disponível em:
- **REST API**: `http://localhost:3000`
- **GraphQL Playground**: `http://localhost:3000/graphql`

## 📊 Estrutura de Dados

### Produto (Product)
```typescript
interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  image: string
  category: string
  inStock: boolean
}
```

### Carrinho (Cart)
```typescript
interface Cart {
  id: string
  items: CartItem[]
  total: number
  createdAt: Date
  updatedAt: Date
}

interface CartItem {
  productId: string
  quantity: number
  price: number
  name: string
  image: string
}
```

## 🛍️ Produtos Disponíveis

| ID | Nome | Preço | Categoria | Em Estoque |
|----|------|-------|-----------|------------|
| 1 | Smartphone Galaxy Pro | R$ 899,99 | Eletrônicos | ✅ |
| 2 | Notebook Gamer Ultra | R$ 2.499,99 | Computadores | ✅ |
| 3 | Fone Bluetooth Premium | R$ 299,99 | Áudio | ✅ |
| 4 | Smart TV 55" 4K | R$ 1.899,99 | TV e Home Theater | ❌ |
| 5 | Tablet Pro 12" | R$ 1.299,99 | Tablets | ✅ |
| 6 | Smartwatch Elite Series | R$ 449,99 | Eletrônicos | ✅ |
| 7 | Câmera Digital Mirrorless 4K | R$ 1.799,99 | Eletrônicos | ❌ |
| 8 | Console Gaming Pro X | R$ 2.199,99 | Eletrônicos | ✅ |

---

## 🔗 API REST

### 1. Health Check
```http
GET /
```

**Resposta:**
```json
"API is running!"
```

### 2. Consultar Produto
```http
GET /product/:id
```

**Exemplo:**
```bash
curl -X GET http://localhost:3000/product/1
```

**Resposta:**
```json
{
  "id": "1",
  "name": "Smartphone Galaxy Pro",
  "price": 899.99,
  "originalPrice": 1199.99,
  "description": "Smartphone premium com câmera de 108MP...",
  "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
  "category": "Eletrônicos",
  "inStock": true
}
```

### 3. Carrinho de Compras

#### 3.1 Criar Carrinho
```http
POST /cart
```

**Exemplo:**
```bash
curl -X POST http://localhost:3000/cart
```

**Resposta:**
```json
{
  "id": "cart_1703123456789_abc123def",
  "items": [],
  "total": 0,
  "createdAt": "2023-12-21T10:30:56.789Z",
  "updatedAt": "2023-12-21T10:30:56.789Z"
}
```

#### 3.2 Consultar Carrinho
```http
GET /cart/:id
```

**Exemplo:**
```bash
curl -X GET http://localhost:3000/cart/cart_1703123456789_abc123def
```

#### 3.3 Adicionar Item ao Carrinho
```http
POST /cart/:id/items
Content-Type: application/json

{
  "productId": "1",
  "quantity": 2
}
```

**Exemplo:**
```bash
curl -X POST http://localhost:3000/cart/cart_1703123456789_abc123def/items \
  -H "Content-Type: application/json" \
  -d '{"productId": "1", "quantity": 2}'
```

#### 3.4 Atualizar Quantidade de Item
```http
PUT /cart/:id/items/:productId
Content-Type: application/json

{
  "quantity": 3
}
```

**Exemplo:**
```bash
curl -X PUT http://localhost:3000/cart/cart_1703123456789_abc123def/items/1 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 3}'
```

#### 3.5 Remover Item do Carrinho
```http
DELETE /cart/:id/items/:productId
```

**Exemplo:**
```bash
curl -X DELETE http://localhost:3000/cart/cart_1703123456789_abc123def/items/1
```

#### 3.6 Limpar Carrinho
```http
DELETE /cart/:id/items
```

**Exemplo:**
```bash
curl -X DELETE http://localhost:3000/cart/cart_1703123456789_abc123def/items
```

#### 3.7 Deletar Carrinho
```http
DELETE /cart/:id
```

**Exemplo:**
```bash
curl -X DELETE http://localhost:3000/cart/cart_1703123456789_abc123def
```

---

## 🔮 API GraphQL

Acesse o GraphQL Playground em: `http://localhost:3000/graphql`

### 1. Consultar Produto
```graphql
query GetProduct {
  products(id: "1") {
    id
    name
    price
    originalPrice
    description
    image
    category
    inStock
  }
}
```

### 2. Carrinho de Compras

#### 2.1 Criar Carrinho
```graphql
mutation CreateCart {
  createCart {
    id
    items {
      productId
      name
      quantity
      price
      image
    }
    total
    createdAt
    updatedAt
  }
}
```

#### 2.2 Consultar Carrinho
```graphql
query GetCart {
  cart(id: "cart_1703123456789_abc123def") {
    id
    items {
      productId
      name
      quantity
      price
      image
    }
    total
    createdAt
    updatedAt
  }
}
```

#### 2.3 Adicionar Item ao Carrinho
```graphql
mutation AddItemToCart {
  addItemToCart(
    cartId: "cart_1703123456789_abc123def"
    productId: "1"
    quantity: 2
  ) {
    id
    items {
      productId
      name
      quantity
      price
      image
    }
    total
    createdAt
    updatedAt
  }
}
```

#### 2.4 Atualizar Item do Carrinho
```graphql
mutation UpdateCartItem {
  updateCartItem(
    cartId: "cart_1703123456789_abc123def"
    productId: "1"
    quantity: 3
  ) {
    id
    items {
      productId
      name
      quantity
      price
      image
    }
    total
    createdAt
    updatedAt
  }
}
```

#### 2.5 Remover Item do Carrinho
```graphql
mutation RemoveItemFromCart {
  removeItemFromCart(
    cartId: "cart_1703123456789_abc123def"
    productId: "1"
  ) {
    id
    items {
      productId
      name
      quantity
      price
      image
    }
    total
    createdAt
    updatedAt
  }
}
```

#### 2.6 Limpar Carrinho
```graphql
mutation ClearCart {
  clearCart(cartId: "cart_1703123456789_abc123def") {
    id
    items {
      productId
      name
      quantity
      price
      image
    }
    total
    createdAt
    updatedAt
  }
}
```

#### 2.7 Deletar Carrinho
```graphql
mutation DeleteCart {
  deleteCart(cartId: "cart_1703123456789_abc123def")
}
```

---

## 🧪 Exemplos de Teste Completos

### Fluxo Completo via REST

```bash
# 1. Criar carrinho
curl -X POST http://localhost:3000/cart

# 2. Adicionar produtos (use o ID retornado)
curl -X POST http://localhost:3000/cart/CART_ID_RETORNADO/items \
  -H "Content-Type: application/json" \
  -d '{"productId": "1", "quantity": 2}'

curl -X POST http://localhost:3000/cart/CART_ID_RETORNADO/items \
  -H "Content-Type: application/json" \
  -d '{"productId": "2", "quantity": 1}'

# 3. Verificar carrinho
curl -X GET http://localhost:3000/cart/CART_ID_RETORNADO

# 4. Atualizar quantidade
curl -X PUT http://localhost:3000/cart/CART_ID_RETORNADO/items/1 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 3}'

# 5. Remover item
curl -X DELETE http://localhost:3000/cart/CART_ID_RETORNADO/items/2

# 6. Limpar carrinho
curl -X DELETE http://localhost:3000/cart/CART_ID_RETORNADO/items

# 7. Deletar carrinho
curl -X DELETE http://localhost:3000/cart/CART_ID_RETORNADO
```

### Fluxo Completo via GraphQL

```graphql
# 1. Criar carrinho
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

# 2. Adicionar produtos (use o ID retornado)
mutation {
  addItemToCart(cartId: "CART_ID_RETORNADO", productId: "1", quantity: 2) {
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

# 3. Consultar carrinho
query {
  cart(id: "CART_ID_RETORNADO") {
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

# 4. Atualizar item
mutation {
  updateCartItem(cartId: "CART_ID_RETORNADO", productId: "1", quantity: 3) {
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

# 5. Remover item
mutation {
  removeItemFromCart(cartId: "CART_ID_RETORNADO", productId: "1") {
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

# 6. Limpar carrinho
mutation {
  clearCart(cartId: "CART_ID_RETORNADO") {
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

# 7. Deletar carrinho
mutation {
  deleteCart(cartId: "CART_ID_RETORNADO")
}
```

---

## 📝 Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | OK - Operação realizada com sucesso |
| 201 | Created - Recurso criado com sucesso |
| 204 | No Content - Recurso deletado com sucesso |
| 400 | Bad Request - Dados inválidos |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro interno do servidor |

---

## ⚠️ Validações e Regras de Negócio

### Carrinho
- Cada carrinho tem um ID único gerado automaticamente
- O total é calculado automaticamente baseado nos itens
- As datas de criação e atualização são gerenciadas automaticamente

### Itens do Carrinho
- Quantidade deve ser maior que zero
- Produto deve existir no catálogo
- Se o produto já existe no carrinho, a quantidade é somada
- Preço e informações do produto são copiados do catálogo

### Produtos
- Produtos são consultados por ID
- Produtos fora de estoque podem ser visualizados mas não adicionados ao carrinho
- Imagens são URLs externas do Unsplash

---

## 🏗️ Estrutura do Projeto

```
src/
├── app.controller.ts      # Controller REST principal
├── app.resolver.ts        # Resolver GraphQL de produtos
├── app.service.ts         # Serviço principal
├── app.module.ts          # Módulo principal
├── main.ts               # Ponto de entrada
├── cart.controller.ts     # Controller REST do carrinho
├── cart.resolver.ts       # Resolver GraphQL do carrinho
├── data/
│   └── Products.ts       # Dados dos produtos
├── model/
│   ├── Cart.ts           # Interface do carrinho
│   ├── CartGql.ts        # Tipo GraphQL do carrinho
│   ├── Product.ts        # Interface do produto
│   └── ProductGql.ts     # Tipo GraphQL do produto
└── service/
    ├── CartService.ts    # Serviço do carrinho
    └── ProductService.ts # Serviço de produtos
```

---

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run start:dev

# Build para produção
npm run build

# Executar em produção
npm run start:prod

# Linting
npm run lint

# Formatação de código
npm run format

# Testes
npm run test
npm run test:watch
npm run test:cov
npm run test:e2e
```

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique se a aplicação está rodando corretamente
2. Confirme se as dependências foram instaladas
3. Verifique os logs da aplicação
4. Teste os endpoints de health check

---

## 📄 Licença

Este projeto está sob a licença MIT.
