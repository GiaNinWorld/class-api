import { Product } from 'src/model/Product'

export const products: Product[] = [
  {
    id: '1',
    name: 'Smartphone Galaxy Pro',
    price: 899.99,
    originalPrice: 1199.99,
    description:
      'Smartphone premium com câmera de 108MP, tela AMOLED de 6.7 polegadas, processador octa-core e 256GB de armazenamento. Ideal para fotografia profissional e gaming.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
    category: 'Eletrônicos',
    inStock: true,
  },
  {
    id: '2',
    name: 'Notebook Gamer Ultra',
    price: 2499.99,
    description:
      'Notebook gamer com placa de vídeo RTX 4060, processador Intel i7, 16GB RAM e SSD 1TB. Perfeito para jogos e trabalho pesado.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
    category: 'Computadores',
    inStock: true,
  },
  {
    id: '3',
    name: 'Fone Bluetooth Premium',
    price: 299.99,
    originalPrice: 399.99,
    description:
      'Fone de ouvido wireless com cancelamento de ruído ativo, bateria de 30 horas e qualidade de som Hi-Fi. Conforto garantido para uso prolongado.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Áudio',
    inStock: true,
  },
  {
    id: '4',
    name: 'Smart TV 55" 4K',
    price: 1899.99,
    description:
      'Smart TV LED 55 polegadas com resolução 4K, HDR, sistema operacional Android TV e conectividade Wi-Fi. Entretenimento em alta definição.',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop',
    category: 'TV e Home Theater',
    inStock: false,
  },
  {
    id: '5',
    name: 'Tablet Pro 12"',
    price: 1299.99,
    originalPrice: 1499.99,
    description:
      'Tablet profissional com tela de 12 polegadas, processador M1, 512GB de armazenamento e suporte à caneta digital. Ideal para criatividade e produtividade.',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop',
    category: 'Tablets',
    inStock: true,
  },
  {
    id: '6',
    name: 'Smartwatch Elite Series',
    price: 449.99,
    originalPrice: 599.99,
    description:
      'Smartwatch premium com tela OLED de 1.9 polegadas, GPS integrado, monitoramento de saúde 24/7, resistência à água IP68 e bateria de 7 dias. Compatível com iOS e Android.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'Eletrônicos',
    inStock: true,
  },
  {
    id: '7',
    name: 'Câmera Digital Mirrorless 4K',
    price: 1799.99,
    description:
      'Câmera mirrorless profissional com sensor APS-C de 24MP, gravação 4K 60fps, estabilização de imagem 5 eixos e conectividade Wi-Fi. Inclui lente 18-55mm.',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop',
    category: 'Eletrônicos',
    inStock: false,
  },
  {
    id: '8',
    name: 'Console Gaming Pro X',
    price: 2199.99,
    originalPrice: 2499.99,
    description:
      'Console de videogame de nova geração com SSD ultra-rápido de 1TB, suporte a 4K 120fps, ray tracing em tempo real e retrocompatibilidade. Inclui controle wireless.',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop',
    category: 'Eletrônicos',
    inStock: true,
  },
]
