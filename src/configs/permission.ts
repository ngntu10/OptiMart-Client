export const PERMISSIONS = {
  ADMIN: 'ADMIN.GRANTED',
  BASIC: 'BASIC.PUBLIC',
  DASHBOARD: 'DASHBOARD',
  MANAGE_PRODUCT: {
    PRODUCT: {
      VIEW: 'MANAGE_PRODUCT.PRODUCT.VIEW',
      CREATE: 'MANAGE_PRODUCT.PRODUCT.CREATE',
      UPDATE: 'MANAGE_PRODUCT.PRODUCT.UPDATE',
      DELETE: 'MANAGE_PRODUCT.PRODUCT.DELETE'
    },
    PRODUCT_TYPE: {
      CREATE: 'MANAGE_PRODUCT.PRODUCT_TYPE.CREATE',
      UPDATE: 'MANAGE_PRODUCT.PRODUCT_TYPE.UPDATE',
      DELETE: 'MANAGE_PRODUCT.PRODUCT_TYPE.DELETE'
    },
    COMMENT: {
      UPDATE: 'MANAGE_PRODUCT.COMMENT.UPDATE',
      DELETE: 'MANAGE_PRODUCT.COMMENT.DELETE'
    }
  },
  SYSTEM: {
    USER: {
      VIEW: 'SYSTEM.USER.VIEW',
      CREATE: 'SYSTEM.USER.CREATE',
      UPDATE: 'SYSTEM.USER.UPDATE',
      DELETE: 'SYSTEM.USER.DELETE'
    },
    ROLE: {
      VIEW: 'SYSTEM.ROLE.VIEW',
      CREATE: 'SYSTEM.ROLE.CREATE',
      UPDATE: 'SYSTEM.ROLE.UPDATE',
      DELETE: 'SYSTEM.ROLE.DELETE'
    }
  },
  MANAGE_ORDER: {
    REVIEW: {
      UPDATE: 'MANAGE_ORDER.REVIEW.UPDATE',
      DELETE: 'MANAGE_ORDER.REVIEW.DELETE'
    },
    ORDER: {
      VIEW: 'MANAGE_ORDER.ORDER.VIEW',
      CREATE: 'MANAGE_ORDER.ORDER.CREATE',
      UPDATE: 'MANAGE_ORDER.ORDER.UPDATE',
      DELETE: 'MANAGE_ORDER.ORDER.DELETE'
    }
  },
  SETTING: {
    PAYMENT_TYPE: {
      CREATE: 'SETTING.PAYMENT_TYPE.CREATE',
      UPDATE: 'SETTING.PAYMENT_TYPE.UPDATE',
      DELETE: 'SETTING.PAYMENT_TYPE.DELETE'
    },
    DELIVERY_TYPE: {
      CREATE: 'SETTING.DELIVERY_TYPE.CREATE',
      UPDATE: 'SETTING.DELIVERY_TYPE.UPDATE',
      DELETE: 'SETTING.DELIVERY_TYPE.DELETE'
    },
    CITY: {
      CREATE: 'CITY.CREATE',
      UPDATE: 'CITY.UPDATE',
      DELETE: 'CITY.DELETE'
    }
  }
}

export const LIST_DATA_PERMISSIONS: any = [
  {
    id: 15,
    name: 'Dashboard',
    isParent: false,
    value: 'DASHBOARD',
    isHideCreate: true,
    isHideUpdate: true,
    isHideDelete: true,
    isHideAll: true
  },
  { id: 1, name: 'Manage_product', isParent: true, value: 'MANAGE_PRODUCT' },
  {
    id: 2,
    name: 'Product',
    isParent: false,
    value: 'PRODUCT',
    parentValue: 'MANAGE_PRODUCT'
  },
  {
    id: 3,
    name: 'Product_type',
    isParent: false,
    value: 'PRODUCT_TYPE',
    parentValue: 'MANAGE_PRODUCT',
    isHideView: true
  },
  {
    id: 14,
    name: 'Comment',
    isParent: false,
    value: 'COMMENT',
    parentValue: 'MANAGE_PRODUCT',
    isHideView: true,
    isHideCreate: true
  },
  { id: 4, name: 'System', isParent: true, value: 'SYSTEM' },
  {
    id: 5,
    name: 'User',
    isParent: false,
    value: 'USER',
    parentValue: 'SYSTEM'
  },
  {
    id: 6,
    name: 'Role',
    isParent: false,
    value: 'ROLE',
    parentValue: 'SYSTEM'
  },
  { id: 7, name: 'Manage_order', isParent: true, value: 'MANAGE_ORDER' },
  {
    id: 8,
    name: 'Review',
    isParent: false,
    value: 'REVIEW',
    parentValue: 'MANAGE_ORDER',
    isHideView: true,
    isHideCreate: true
  },
  {
    id: 9,
    name: 'Order',
    isParent: false,
    value: 'ORDER',
    parentValue: 'MANAGE_ORDER'
  },
  { id: 10, name: 'Settings', isParent: true, value: 'SETTING' },
  {
    id: 11,
    name: 'City',
    isParent: false,
    isHideView: true,
    value: 'CITY',
    parentValue: 'SETTING'
  },
  {
    id: 12,
    name: 'Delivery_type',
    isParent: false,
    isHideView: true,
    value: 'DELIVERY_TYPE',
    parentValue: 'SETTING'
  },
  {
    id: 13,
    name: 'Payment_type',
    isParent: false,
    isHideView: true,
    value: 'PAYMENT_TYPE',
    parentValue: 'SETTING'
  }
]
