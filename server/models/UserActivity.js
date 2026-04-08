/**
 * 用户活动模型
 * 记录用户在网站上的所有活动，用于实时同步和多用户查看
 */

export class UserActivity {
  constructor(data) {
    this.userId = data.userId || 'anonymous';
    this.activityType = data.activityType; // 'view_product', 'add_to_cart', 'checkout', 'login', etc.
    this.details = data.details || {};
    this.timestamp = data.timestamp || new Date();
    this.ipAddress = data.ipAddress || '0.0.0.0';
    this.userAgent = data.userAgent || '';
    this.sessionId = data.sessionId || '';
  }
  
  static getActivityTypes() {
    return {
      VIEW_PRODUCT: 'view_product',
      ADD_TO_CART: 'add_to_cart',
      REMOVE_FROM_CART: 'remove_from_cart',
      UPDATE_CART_QUANTITY: 'update_cart_quantity',
      CHECKOUT_START: 'checkout_start',
      CHECKOUT_COMPLETE: 'checkout_complete',
      LOGIN: 'login',
      LOGOUT: 'logout',
      SEARCH: 'search',
      FILTER_PRODUCTS: 'filter_products',
      SORT_PRODUCTS: 'sort_products',
      VIEW_CART: 'view_cart',
      VIEW_PROFILE: 'view_profile',
      UPDATE_PROFILE: 'update_profile'
    };
  }
  
  toJSON() {
    return {
      userId: this.userId,
      activityType: this.activityType,
      details: this.details,
      timestamp: this.timestamp,
      ipAddress: this.ipAddress,
      userAgent: this.userAgent,
      sessionId: this.sessionId
    };
  }
}