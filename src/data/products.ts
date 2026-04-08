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
    name: "深层保湿面霜",
    description: "富含玻尿酸和维生素E，深层滋润肌肤，改善干燥粗糙，令肌肤水润光滑。",
    price: 299,
    originalPrice: 399,
    image: "https://picsum.photos/seed/cream1/400/400",
    category: "护肤",
    rating: 4.8,
    stock: 42,
    tags: ["热销", "新品"]
  },
  {
    id: 2,
    name: "净透洁面乳",
    description: "温和配方，彻底清洁毛孔污垢，保持肌肤水油平衡，洗后不紧绷。",
    price: 159,
    originalPrice: 199,
    image: "https://picsum.photos/seed/facewash/400/400",
    category: "护肤",
    rating: 4.6,
    stock: 78,
    tags: ["温和", "敏感肌"]
  },
  {
    id: 3,
    name: "持久哑光口红",
    description: "丝绒哑光质地，色彩饱满持久，添加保湿成分，不易脱色不拔干。",
    price: 189,
    originalPrice: 249,
    image: "https://picsum.photos/seed/lipstick/400/400",
    category: "彩妆",
    rating: 4.9,
    stock: 35,
    tags: ["热销", "限量"]
  },
  {
    id: 4,
    name: "男士清爽须后水",
    description: "舒缓剃须后肌肤，收敛毛孔，清爽不油腻，散发淡雅木质香调。",
    price: 228,
    originalPrice: 288,
    image: "https://picsum.photos/seed/aftershave/400/400",
    category: "男士系列",
    rating: 4.7,
    stock: 56,
    tags: ["男士", "清爽"]
  },
  {
    id: 5,
    name: "柔顺护发精油",
    description: "修复受损发质，抚平毛躁，增强头发光泽，让秀发顺滑易打理。",
    price: 178,
    originalPrice: 218,
    image: "https://picsum.photos/seed/hairoil/400/400",
    category: "个人护理",
    rating: 4.5,
    stock: 64,
    tags: ["护发", "修复"]
  },
  {
    id: 6,
    name: "淡香水（女士）",
    description: "前调柑橘，中调茉莉，后调麝香，清新优雅，留香持久。",
    price: 458,
    originalPrice: 588,
    image: "https://picsum.photos/seed/perfume/400/400",
    category: "香水",
    rating: 4.8,
    stock: 22,
    tags: ["香水", "优雅"]
  },
  {
    id: 7,
    name: "防晒隔离霜 SPF50+",
    description: "高效防晒，轻薄透气，防水防汗，适合日常及户外活动使用。",
    price: 198,
    originalPrice: 258,
    image: "https://picsum.photos/seed/sunscreen/400/400",
    category: "护肤",
    rating: 4.7,
    stock: 89,
    tags: ["防晒", "必备"]
  },
  {
    id: 8,
    name: "眼影盘（12色）",
    description: "哑光、珠光、闪片多种质地，色彩丰富，粉质细腻易上色。",
    price: 328,
    originalPrice: 428,
    image: "https://picsum.photos/seed/eyeshadow/400/400",
    category: "彩妆",
    rating: 4.9,
    stock: 31,
    tags: ["彩妆", "多色"]
  }
]