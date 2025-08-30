# Exemplo Prático: Inserção de Itens via API REST

Este documento mostra como inserir itens no carrinho usando a API REST.

## Passo 1: Criar um Carrinho

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

## Passo 2: Inserir Primeiro Item (Smartphone)

```bash
curl -X POST http://localhost:3000/cart/cart_1703123456789_abc123def/items \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "1",
    "quantity": 2
  }'
```

**Resposta esperada:**
```json
{
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
```

## Passo 3: Inserir Segundo Item (Notebook)

```bash
curl -X POST http://localhost:3000/cart/cart_1703123456789_abc123def/items \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "2",
    "quantity": 1
  }'
```

**Resposta esperada:**
```json
{
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
```

## Passo 4: Inserir Terceiro Item (Fone)

```bash
curl -X POST http://localhost:3000/cart/cart_1703123456789_abc123def/items \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "3",
    "quantity": 3
  }'
```

## Passo 5: Verificar o Carrinho

```bash
curl -X GET http://localhost:3000/cart/cart_1703123456789_abc123def
```

## Passo 6: Atualizar Quantidade de um Item

```bash
curl -X PUT http://localhost:3000/cart/cart_1703123456789_abc123def/items/1 \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 3
  }'
```

## Inserção em Lote (Script Completo)

Crie um arquivo `insert_items.sh`:

```bash
#!/bin/bash

# 1. Criar carrinho
echo "Criando carrinho..."
CART_RESPONSE=$(curl -s -X POST http://localhost:3000/cart)
CART_ID=$(echo $CART_RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
echo "Carrinho criado com ID: $CART_ID"

# 2. Inserir smartphone
echo "Inserindo smartphone..."
curl -X POST http://localhost:3000/cart/$CART_ID/items \
  -H "Content-Type: application/json" \
  -d '{"productId": "1", "quantity": 2}'

# 3. Inserir notebook
echo "Inserindo notebook..."
curl -X POST http://localhost:3000/cart/$CART_ID/items \
  -H "Content-Type: application/json" \
  -d '{"productId": "2", "quantity": 1}'

# 4. Inserir fone
echo "Inserindo fone..."
curl -X POST http://localhost:3000/cart/$CART_ID/items \
  -H "Content-Type: application/json" \
  -d '{"productId": "3", "quantity": 3}'

# 5. Verificar carrinho final
echo "Carrinho final:"
curl -X GET http://localhost:3000/cart/$CART_ID
```

## Exemplos com PowerShell (Windows)

```powershell
# 1. Criar carrinho
$cartResponse = Invoke-RestMethod -Uri "http://localhost:3000/cart" -Method POST
$cartId = $cartResponse.id
Write-Host "Carrinho criado: $cartId"

# 2. Inserir smartphone
$smartphoneData = @{
    productId = "1"
    quantity = 2
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/cart/$cartId/items" -Method POST -Body $smartphoneData -ContentType "application/json"

# 3. Inserir notebook
$notebookData = @{
    productId = "2"
    quantity = 1
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/cart/$cartId/items" -Method POST -Body $notebookData -ContentType "application/json"

# 4. Verificar carrinho
$cart = Invoke-RestMethod -Uri "http://localhost:3000/cart/$cartId" -Method GET
$cart | ConvertTo-Json -Depth 10
```

## Exemplos com JavaScript/Node.js

```javascript
const axios = require('axios');

async function insertItems() {
  try {
    // 1. Criar carrinho
    const cartResponse = await axios.post('http://localhost:3000/cart');
    const cartId = cartResponse.data.id;
    console.log('Carrinho criado:', cartId);

    // 2. Inserir smartphone
    await axios.post(`http://localhost:3000/cart/${cartId}/items`, {
      productId: "1",
      quantity: 2
    });

    // 3. Inserir notebook
    await axios.post(`http://localhost:3000/cart/${cartId}/items`, {
      productId: "2",
      quantity: 1
    });

    // 4. Inserir fone
    await axios.post(`http://localhost:3000/cart/${cartId}/items`, {
      productId: "3",
      quantity: 3
    });

    // 5. Verificar carrinho
    const finalCart = await axios.get(`http://localhost:3000/cart/${cartId}`);
    console.log('Carrinho final:', JSON.stringify(finalCart.data, null, 2));

  } catch (error) {
    console.error('Erro:', error.response?.data || error.message);
  }
}

insertItems();
```

## Produtos Disponíveis

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

## Códigos de Status

- **201 Created**: Carrinho criado com sucesso
- **200 OK**: Item adicionado/atualizado com sucesso
- **400 Bad Request**: Dados inválidos
- **404 Not Found**: Carrinho ou produto não encontrado

## Dicas

1. **Substitua o ID**: Use o ID real retornado ao criar o carrinho
2. **Content-Type**: Sempre use `application/json`
3. **Quantidades**: Use números maiores que 0
4. **Produtos válidos**: Use apenas IDs de 1 a 8
5. **Verificação**: Sempre verifique o carrinho após inserções

