# Exemplo Prático: Inserção de Itens no Carrinho

Este documento mostra como inserir itens no carrinho de compras passo a passo.

## Passo 1: Criar um Carrinho

Primeiro, vamos criar um novo carrinho:

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

**Resposta esperada:**
```json
{
  "data": {
    "createCart": {
      "id": "cart_1703123456789_abc123def",
      "items": [],
      "total": 0,
      "createdAt": "2023-12-21T10:30:56.789Z",
      "updatedAt": "2023-12-21T10:30:56.789Z"
    }
  }
}
```

## Passo 2: Inserir Primeiro Item (Smartphone)

Agora vamos adicionar um smartphone ao carrinho:

```graphql
mutation AddSmartphone {
    addItemToCart(cartId: "cart_1703123456789_abc123def", productId: "1", quantity: 2) {
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

**Resposta esperada:**
```json
{
  "data": {
    "addItemToCart": {
      "id": "cart_1703123456789_abc123def",
      "items": [
        {
          "productId": "1",
          "name": "Smartphone Galaxy Pro",
          "quantity": 2,
          "price": 899.99,
          "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop"
        }
      ],
      "total": 1799.98,
      "createdAt": "2023-12-21T10:30:56.789Z",
      "updatedAt": "2023-12-21T10:35:12.345Z"
    }
  }
}
```

## Passo 3: Inserir Segundo Item (Notebook)

Vamos adicionar um notebook:

```graphql
mutation AddNotebook {
    addItemToCart(cartId: "cart_1703123456789_abc123def", productId: "2", quantity: 1) {
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

**Resposta esperada:**
```json
{
  "data": {
    "addItemToCart": {
      "id": "cart_1703123456789_abc123def",
      "items": [
        {
          "productId": "1",
          "name": "Smartphone Galaxy Pro",
          "quantity": 2,
          "price": 899.99,
          "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop"
        },
        {
          "productId": "2",
          "name": "Notebook Gamer Ultra",
          "quantity": 1,
          "price": 2499.99,
          "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop"
        }
      ],
      "total": 4299.97,
      "createdAt": "2023-12-21T10:30:56.789Z",
      "updatedAt": "2023-12-21T10:37:45.678Z"
    }
  }
}
```

## Passo 4: Inserir Terceiro Item (Fone)

Vamos adicionar um fone de ouvido:

```graphql
mutation AddHeadphones {
    addItemToCart(cartId: "cart_1703123456789_abc123def", productId: "3", quantity: 3) {
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

**Resposta esperada:**
```json
{
  "data": {
    "addItemToCart": {
      "id": "cart_1703123456789_abc123def",
      "items": [
        {
          "productId": "1",
          "name": "Smartphone Galaxy Pro",
          "quantity": 2,
          "price": 899.99,
          "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop"
        },
        {
          "productId": "2",
          "name": "Notebook Gamer Ultra",
          "quantity": 1,
          "price": 2499.99,
          "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop"
        },
        {
          "productId": "3",
          "name": "Fone Bluetooth Premium",
          "quantity": 3,
          "price": 299.99,
          "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
        }
      ],
      "total": 5199.94,
      "createdAt": "2023-12-21T10:30:56.789Z",
      "updatedAt": "2023-12-21T10:40:23.456Z"
    }
  }
}
```

## Passo 5: Consultar Carrinho Completo

Vamos verificar o carrinho final:

```graphql
query ViewCart {
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

## Passo 6: Atualizar Quantidade de um Item

Vamos aumentar a quantidade do smartphone:

```graphql
mutation UpdateSmartphoneQuantity {
    updateCartItem(cartId: "cart_1703123456789_abc123def", productId: "1", quantity: 3) {
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

## Inserção em Lote (Múltiplos Itens)

Se quiser inserir vários itens de uma vez, execute as mutations em sequência:

```graphql
# 1. Smartphone
mutation { addItemToCart(cartId: "cart_1703123456789_abc123def", productId: "1", quantity: 2) { id total } }

# 2. Notebook  
mutation { addItemToCart(cartId: "cart_1703123456789_abc123def", productId: "2", quantity: 1) { id total } }

# 3. Fone
mutation { addItemToCart(cartId: "cart_1703123456789_abc123def", productId: "3", quantity: 3) { id total } }

# 4. Smart TV
mutation { addItemToCart(cartId: "cart_1703123456789_abc123def", productId: "4", quantity: 1) { id total } }
```

## Produtos Disponíveis para Inserção

| ID | Nome | Preço | Categoria |
|----|------|-------|-----------|
| "1" | Smartphone Galaxy Pro | R$ 899,99 | Eletrônicos |
| "2" | Notebook Gamer Ultra | R$ 2.499,99 | Computadores |
| "3" | Fone Bluetooth Premium | R$ 299,99 | Áudio |
| "4" | Smart TV 55" 4K | R$ 1.899,99 | TV e Home Theater |
| "5" | Tablet Pro 12" | R$ 1.299,99 | Tablets |
| "6" | Smartwatch Elite Series | R$ 449,99 | Eletrônicos |
| "7" | Câmera Digital Mirrorless 4K | R$ 1.799,99 | Eletrônicos |
| "8" | Console Gaming Pro X | R$ 2.199,99 | Eletrônicos |

## Dicas para Inserção

1. **Use IDs reais**: Substitua `cart_1703123456789_abc123def` pelo ID retornado ao criar o carrinho
2. **Quantidades válidas**: Use números maiores que 0
3. **Produtos existentes**: Use apenas os IDs de 1 a 8
4. **Verifique o total**: O sistema calcula automaticamente o valor total
5. **Timestamps**: As datas são atualizadas automaticamente

## Como Testar no GraphQL Playground

1. Acesse: `http://localhost:3000/graphql`
2. Cole uma das mutations acima
3. Clique em "Play"
4. Copie o ID do carrinho retornado
5. Use esse ID nas próximas operações

