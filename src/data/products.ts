export interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  stock: number
  tags: string[]
}

export const products: Product[] = [
  {
    id: 1,
    name: '深润修护面霜',
    description: '高保湿配方，帮助改善干燥粗糙，肤感轻盈不粘腻。',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
    category: '护肤',
    rating: 4.8,
    stock: 42,
    tags: ['热销', '补水']
  },
  {
    id: 2,
    name: '氨基酸洁面乳',
    description: '温和清洁多余油脂与污垢，洗后不紧绷，敏感肌可用。',
    price: 159,
    originalPrice: 199,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    category: '护肤',
    rating: 4.6,
    stock: 78,
    tags: ['温和', '敏感肌']
  },
  {
    id: 3,
    name: '哑光雾感口红',
    description: '显色饱满且持妆，添加润感成分，长时间不拔干。',
    price: 189,
    originalPrice: 249,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    category: '彩妆',
    rating: 4.9,
    stock: 35,
    tags: ['限量', '新品']
  },
  {
    id: 4,
    name: '舒缓须后精华',
    description: '剃须后快速舒缓泛红不适，清爽质地不闷肤。',
    price: 228,
    originalPrice: 288,
    image: 'https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6b?auto=format&fit=crop&w=800&q=80',
    category: '男士系列',
    rating: 4.7,
    stock: 56,
    tags: ['清爽', '舒缓']
  },
  {
    id: 5,
    name: '柔亮护发精油',
    description: '修护受损发丝，减少毛躁，提升发丝顺滑与光泽。',
    price: 178,
    originalPrice: 218,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=80',
    category: '个护',
    rating: 4.5,
    stock: 64,
    tags: ['修护', '柔顺']
  },
  {
    id: 6,
    name: '清新木质香水',
    description: '前调明快，中后调温暖沉稳，日常通勤都适用。',
    price: 458,
    originalPrice: 588,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    category: '香氛',
    rating: 4.8,
    stock: 22,
    tags: ['气质', '留香']
  },
  {
    id: 7,
    name: '高倍防晒乳 SPF50+',
    description: '轻薄易推开，防水防汗，适合通勤和户外场景。',
    price: 198,
    originalPrice: 258,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80',
    category: '护肤',
    rating: 4.7,
    stock: 89,
    tags: ['防晒', '夏日']
  },
  {
    id: 8,
    name: '12色眼影盘',
    description: '哑光与珠光组合，粉质细腻，上眼显色且服帖。',
    price: 328,
    originalPrice: 428,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    category: '彩妆',
    rating: 4.9,
    stock: 31,
    tags: ['多色', '人气']
  }
]