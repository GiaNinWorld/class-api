# 🧪 Exemplos Práticos de Teste da API

Este documento contém exemplos práticos para testar a API usando diferentes ferramentas e métodos.

## 🚀 Iniciando a Aplicação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run start:dev
```

A aplicação estará disponível em:
- **REST API**: `http://localhost:3000`
- **GraphQL Playground**: `http://localhost:3000/graphql`

---

## 📱 Testando com cURL

### 1. Health Check
```bash
curl -X GET http://localhost:3000/
```

### 2. Consultar Produto
```bash
curl -X GET http://localhost:3000/product/1
```

### 3. Fluxo Completo do Carrinho

#### 3.1 Criar Carrinho
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

#### 3.2 Adicionar Produtos
```bash
# Adicionar smartphone
curl -X POST http://localhost:3000/cart/cart_1703123456789_abc123def/items \
  -H "Content-Type: application/json" \
  -d '{"productId": "1", "quantity": 2}'

# Adicionar notebook
curl -X POST http://localhost:3000/cart/cart_1703123456789_abc123def/items \
  -H "Content-Type: application/json" \
  -d '{"productId": "2", "quantity": 1}'

# Adicionar fone
curl -X POST http://localhost:3000/cart/cart_1703123456789_abc123def/items \
  -H "Content-Type: application/json" \
  -d '{"productId": "3", "quantity": 3}'
```

#### 3.3 Verificar Carrinho
```bash
curl -X GET http://localhost:3000/cart/cart_1703123456789_abc123def
```

#### 3.4 Atualizar Quantidade
```bash
curl -X PUT http://localhost:3000/cart/cart_1703123456789_abc123def/items/1 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 5}'
```

#### 3.5 Remover Item
```bash
curl -X DELETE http://localhost:3000/cart/cart_1703123456789_abc123def/items/3
```

#### 3.6 Limpar Carrinho
```bash
curl -X DELETE http://localhost:3000/cart/cart_1703123456789_abc123def/items
```

#### 3.7 Deletar Carrinho
```bash
curl -X DELETE http://localhost:3000/cart/cart_1703123456789_abc123def
```

---

## 🎯 Testando com Postman/Insomnia

### Collection JSON para Importar

```json
{
  "info": {
    "name": "API Carrinho de Compras",
    "description": "Testes da API de carrinho de compras"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/"
      }
    },
    {
      "name": "Consultar Produto",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/product/1"
      }
    },
    {
      "name": "Criar Carrinho",
      "request": {
        "method": "POST",
        "url": "http://localhost:3000/cart"
      }
    },
    {
      "name": "Consultar Carrinho",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/cart/{{cartId}}"
      }
    },
    {
      "name": "Adicionar Item ao Carrinho",
      "request": {
        "method": "POST",
        "url": "http://localhost:3000/cart/{{cartId}}/items",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"productId\": \"1\",\n  \"quantity\": 2\n}"
        }
      }
    },
    {
      "name": "Atualizar Item do Carrinho",
      "request": {
        "method": "PUT",
        "url": "http://localhost:3000/cart/{{cartId}}/items/1",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"quantity\": 3\n}"
        }
      }
    },
    {
      "name": "Remover Item do Carrinho",
      "request": {
        "method": "DELETE",
        "url": "http://localhost:3000/cart/{{cartId}}/items/1"
      }
    },
    {
      "name": "Limpar Carrinho",
      "request": {
        "method": "DELETE",
        "url": "http://localhost:3000/cart/{{cartId}}/items"
      }
    },
    {
      "name": "Deletar Carrinho",
      "request": {
        "method": "DELETE",
        "url": "http://localhost:3000/cart/{{cartId}}"
      }
    }
  ],
  "variable": [
    {
      "key": "cartId",
      "value": "cart_1703123456789_abc123def"
    }
  ]
}
```

### Variáveis de Ambiente

Configure estas variáveis no Postman/Insomnia:

| Variável | Valor |
|----------|-------|
| `baseUrl` | `http://localhost:3000` |
| `cartId` | `cart_1703123456789_abc123def` |

---

## 🔮 Testando com GraphQL Playground

Acesse: `http://localhost:3000/graphql`

### 1. Consultar Produto
```graphql
query {
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

### 2. Fluxo Completo do Carrinho

#### 2.1 Criar Carrinho
```graphql
mutation {
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

#### 2.2 Adicionar Produtos (use o ID retornado)
```graphql
mutation {
  addItemToCart(cartId: "CART_ID_RETORNADO", productId: "1", quantity: 2) {
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

#### 2.3 Consultar Carrinho
```graphql
query {
  cart(id: "CART_ID_RETORNADO") {
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

#### 2.4 Atualizar Item
```graphql
mutation {
  updateCartItem(cartId: "CART_ID_RETORNADO", productId: "1", quantity: 3) {
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

#### 2.5 Remover Item
```graphql
mutation {
  removeItemFromCart(cartId: "CART_ID_RETORNADO", productId: "1") {
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
mutation {
  clearCart(cartId: "CART_ID_RETORNADO") {
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
mutation {
  deleteCart(cartId: "CART_ID_RETORNADO")
}
```

---

## 🧪 Testando com JavaScript/Node.js

### Script de Teste Automatizado

```javascript
const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
  try {
    console.log('🚀 Iniciando testes da API...\n');

    // 1. Health Check
    console.log('1. Testando Health Check...');
    const health = await axios.get(`${BASE_URL}/`);
    console.log('✅ Health Check:', health.data);

    // 2. Consultar Produto
    console.log('\n2. Testando consulta de produto...');
    const product = await axios.get(`${BASE_URL}/product/1`);
    console.log('✅ Produto:', product.data.name);

    // 3. Criar Carrinho
    console.log('\n3. Testando criação de carrinho...');
    const cart = await axios.post(`${BASE_URL}/cart`);
    const cartId = cart.data.id;
    console.log('✅ Carrinho criado:', cartId);

    // 4. Adicionar Itens
    console.log('\n4. Testando adição de itens...');
    await axios.post(`${BASE_URL}/cart/${cartId}/items`, {
      productId: '1',
      quantity: 2
    });
    await axios.post(`${BASE_URL}/cart/${cartId}/items`, {
      productId: '2',
      quantity: 1
    });
    console.log('✅ Itens adicionados');

    // 5. Verificar Carrinho
    console.log('\n5. Testando consulta de carrinho...');
    const cartData = await axios.get(`${BASE_URL}/cart/${cartId}`);
    console.log('✅ Carrinho:', {
      id: cartData.data.id,
      total: cartData.data.total,
      itemsCount: cartData.data.items.length
    });

    // 6. Atualizar Item
    console.log('\n6. Testando atualização de item...');
    await axios.put(`${BASE_URL}/cart/${cartId}/items/1`, {
      quantity: 3
    });
    console.log('✅ Item atualizado');

    // 7. Remover Item
    console.log('\n7. Testando remoção de item...');
    await axios.delete(`${BASE_URL}/cart/${cartId}/items/2`);
    console.log('✅ Item removido');

    // 8. Limpar Carrinho
    console.log('\n8. Testando limpeza de carrinho...');
    await axios.delete(`${BASE_URL}/cart/${cartId}/items`);
    console.log('✅ Carrinho limpo');

    // 9. Deletar Carrinho
    console.log('\n9. Testando deleção de carrinho...');
    await axios.delete(`${BASE_URL}/cart/${cartId}`);
    console.log('✅ Carrinho deletado');

    console.log('\n🎉 Todos os testes passaram com sucesso!');

  } catch (error) {
    console.error('❌ Erro nos testes:', error.response?.data || error.message);
  }
}

// Executar testes
testAPI();
```

Para executar este script:

```bash
# Instalar axios
npm install axios

# Executar script
node test-api.js
```

---

## 🐍 Testando com Python

### Script de Teste em Python

```python
import requests
import json

BASE_URL = 'http://localhost:3000'

def test_api():
    try:
        print('🚀 Iniciando testes da API...\n')

        # 1. Health Check
        print('1. Testando Health Check...')
        response = requests.get(f'{BASE_URL}/')
        print(f'✅ Health Check: {response.text}')

        # 2. Consultar Produto
        print('\n2. Testando consulta de produto...')
        response = requests.get(f'{BASE_URL}/product/1')
        product = response.json()
        print(f'✅ Produto: {product["name"]}')

        # 3. Criar Carrinho
        print('\n3. Testando criação de carrinho...')
        response = requests.post(f'{BASE_URL}/cart')
        cart = response.json()
        cart_id = cart['id']
        print(f'✅ Carrinho criado: {cart_id}')

        # 4. Adicionar Itens
        print('\n4. Testando adição de itens...')
        requests.post(f'{BASE_URL}/cart/{cart_id}/items', 
                     json={'productId': '1', 'quantity': 2})
        requests.post(f'{BASE_URL}/cart/{cart_id}/items', 
                     json={'productId': '2', 'quantity': 1})
        print('✅ Itens adicionados')

        # 5. Verificar Carrinho
        print('\n5. Testando consulta de carrinho...')
        response = requests.get(f'{BASE_URL}/cart/{cart_id}')
        cart_data = response.json()
        print(f'✅ Carrinho: {cart_data["total"]} - {len(cart_data["items"])} itens')

        # 6. Atualizar Item
        print('\n6. Testando atualização de item...')
        requests.put(f'{BASE_URL}/cart/{cart_id}/items/1', 
                    json={'quantity': 3})
        print('✅ Item atualizado')

        # 7. Remover Item
        print('\n7. Testando remoção de item...')
        requests.delete(f'{BASE_URL}/cart/{cart_id}/items/2')
        print('✅ Item removido')

        # 8. Limpar Carrinho
        print('\n8. Testando limpeza de carrinho...')
        requests.delete(f'{BASE_URL}/cart/{cart_id}/items')
        print('✅ Carrinho limpo')

        # 9. Deletar Carrinho
        print('\n9. Testando deleção de carrinho...')
        requests.delete(f'{BASE_URL}/cart/{cart_id}')
        print('✅ Carrinho deletado')

        print('\n🎉 Todos os testes passaram com sucesso!')

    except Exception as e:
        print(f'❌ Erro nos testes: {str(e)}')

if __name__ == '__main__':
    test_api()
```

Para executar:

```bash
# Instalar requests
pip install requests

# Executar script
python test_api.py
```

---

## 🔍 Cenários de Teste Específicos

### 1. Teste de Produto Fora de Estoque
```bash
# Tentar adicionar produto fora de estoque (ID 4)
curl -X POST http://localhost:3000/cart/cart_1703123456789_abc123def/items \
  -H "Content-Type: application/json" \
  -d '{"productId": "4", "quantity": 1}'
```

### 2. Teste de Produto Inexistente
```bash
# Tentar adicionar produto que não existe
curl -X POST http://localhost:3000/cart/cart_1703123456789_abc123def/items \
  -H "Content-Type: application/json" \
  -d '{"productId": "999", "quantity": 1}'
```

### 3. Teste de Quantidade Zero
```bash
# Tentar adicionar quantidade zero
curl -X POST http://localhost:3000/cart/cart_1703123456789_abc123def/items \
  -H "Content-Type: application/json" \
  -d '{"productId": "1", "quantity": 0}'
```

### 4. Teste de Carrinho Inexistente
```bash
# Tentar acessar carrinho que não existe
curl -X GET http://localhost:3000/cart/carrinho_inexistente
```

---

## 📊 Validação de Respostas

### Resposta de Sucesso (200/201)
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
    }
  ],
  "total": 1799.98,
  "createdAt": "2023-12-21T10:30:56.789Z",
  "updatedAt": "2023-12-21T10:35:12.345Z"
}
```

### Resposta de Erro (400/404)
```json
{
  "statusCode": 400,
  "message": "Produto não encontrado",
  "error": "Bad Request"
}
```

---

## 🎯 Dicas para Testes

1. **Sempre use IDs válidos** dos produtos (1-8)
2. **Guarde o ID do carrinho** retornado na criação
3. **Teste cenários de erro** para validar validações
4. **Verifique o total** após cada operação
5. **Use o GraphQL Playground** para queries mais complexas
6. **Monitore os logs** da aplicação durante os testes

---

## 🔧 Troubleshooting

### Problemas Comuns

1. **Aplicação não inicia**
   - Verifique se a porta 3000 está livre
   - Confirme se as dependências foram instaladas

2. **Erro de CORS**
   - A API não tem CORS configurado para produção
   - Use apenas localhost para testes

3. **Produto não encontrado**
   - Use apenas IDs de 1 a 8
   - Verifique se o produto está em estoque

4. **Carrinho não encontrado**
   - Use o ID correto retornado na criação
   - Verifique se o carrinho não foi deletado

---

## 📞 Suporte

Para problemas específicos:
1. Verifique os logs da aplicação
2. Teste o endpoint de health check
3. Confirme se todas as dependências estão instaladas
4. Verifique se a porta 3000 está disponível
