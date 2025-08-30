# Queries GraphQL do Carrinho de Compras

Seguindo o modelo da query `products`, aqui estão as queries GraphQL para o carrinho de compras:

## 1. Criar Carrinho
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

## 2. Consultar Carrinho
```graphql
query Cart {
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

## 3. Adicionar Item ao Carrinho
```graphql
mutation AddItemToCart {
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

## 4. Atualizar Item do Carrinho
```graphql
mutation UpdateCartItem {
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

## 5. Remover Item do Carrinho
```graphql
mutation RemoveItemFromCart {
    removeItemFromCart(cartId: "cart_1703123456789_abc123def", productId: "1") {
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

## 6. Limpar Carrinho
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

## 7. Deletar Carrinho
```graphql
mutation DeleteCart {
    deleteCart(cartId: "cart_1703123456789_abc123def")
}
```

## Exemplo de Fluxo Completo

### Passo 1: Criar Carrinho
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

### Passo 2: Adicionar Produtos (use o ID retornado)
```graphql
mutation AddItems {
    addItemToCart(cartId: "ID_DO_CARRINHO_RETORNADO", productId: "1", quantity: 2) {
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

### Passo 3: Consultar Carrinho
```graphql
query Cart {
    cart(id: "ID_DO_CARRINHO_RETORNADO") {
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

## Produtos Disponíveis (mesmo modelo da query products)

```graphql
query Products {
    products(id: "1") {
        category
        description
        id
        image
        inStock
        name
        originalPrice
        price
    }
}
```

### IDs de Produtos:
- **"1"**: Smartphone Galaxy Pro
- **"2"**: Notebook Gamer Ultra
- **"3"**: Fone Bluetooth Premium
- **"4"**: Smart TV 55" 4K
- **"5"**: Tablet Pro 12"
- **"6"**: Smartwatch Elite Series
- **"7"**: Câmera Digital Mirrorless 4K
- **"8"**: Console Gaming Pro X

## Como Usar no GraphQL Playground

1. Acesse: `http://localhost:3000/graphql`
2. Cole uma das queries acima
3. Clique em "Play" para executar
4. Substitua os IDs pelos valores reais retornados

## Estrutura de Resposta

Todas as queries seguem o mesmo padrão de resposta, retornando:
- `id`: ID do carrinho
- `items`: Array de itens no carrinho
- `total`: Valor total do carrinho
- `createdAt`: Data de criação
- `updatedAt`: Data da última atualização

