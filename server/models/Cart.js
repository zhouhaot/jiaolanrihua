/**
 * 购物车模型
 * 支持多用户实时同步购物车
 */

export class Cart {
  constructor(data) {
    this.userId = data.userId;
    this.items = data.items || [];
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
    this.sessionId = data.sessionId || '';
    this.isShared = data.isShared || false; // 是否共享购物车
    this.sharedWith = data.sharedWith || []; // 共享给的用户ID列表
  }
  
  addItem(product, quantity = 1) {
    const existingItemIndex = this.items.findIndex(item => item.productId === product.id);
    
    if (existingItemIndex > -1) {
      // 更新现有商品数量
      this.items[existingItemIndex].quantity += quantity;
      this.items[existingItemIndex].updatedAt = new Date();
    } else {
      // 添加新商品
      this.items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        addedAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    this.updatedAt = new Date();
    return this;
  }
  
  removeItem(productId) {
    this.items = this.items.filter(item => item.productId !== productId);
    this.updatedAt = new Date();
    return this;
  }
  
  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.productId === productId);
    if (item) {
      item.quantity = quantity;
      item.updatedAt = new Date();
      this.updatedAt = new Date();
    }
    return this;
  }
  
  clear() {
    this.items = [];
    this.updatedAt = new Date();
    return this;
  }
  
  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }
  
  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  
  shareWith(userIds) {
    this.isShared = true;
    this.sharedWith = Array.isArray(userIds) ? userIds : [userIds];
    this.updatedAt = new Date();
    return this;
  }
  
  unshare() {
    this.isShared = false;
    this.sharedWith = [];
    this.updatedAt = new Date();
    return this;
  }
  
  toJSON() {
    return {
      userId: this.userId,
      items: this.items,
      totalItems: this.getTotalItems(),
      totalPrice: this.getTotalPrice(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isShared: this.isShared,
      sharedWith: this.sharedWith,
      sessionId: this.sessionId
    };
  }
}