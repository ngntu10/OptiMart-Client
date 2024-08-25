import { ROUTE_CONFIG } from 'src/configs/route'

export const VerticalItems = [
  {
    title: 'Hệ thống',
    icon: 'eos-icons:file-system-outlined',
    childrens: [
      {
        title: 'Người dùng',
        icon: 'iconoir:group',
        path: ROUTE_CONFIG.SYSTEM.USER
      },
      {
        title: 'Nhóm vai trò',
        icon: 'icon-park-outline:permissions',
        path: ROUTE_CONFIG.SYSTEM.ROLE
      }
    ]
  },
  {
    title: 'Quản trị sản phẩm',
    icon: 'eos-icons:products-outlined',
    childrens: [
      {
        title: 'Danh sách sản phẩm',
        icon: 'icon-park-outline:ad-product',
        path: ROUTE_CONFIG.MANAGE_PRODUCT.PRODUCT
      },
      {
        title: 'Danh mục sản phẩm',
        icon: 'material-symbols-light:category-outline',
        path: ROUTE_CONFIG.MANAGE_PRODUCT.MANAGE_TYPE_PRODUCT
      },
      {
        title: 'Danh sách đơn hàng',
        icon: 'lets-icons:order-light',
        path: ROUTE_CONFIG.MANAGE_PRODUCT.MANAGE_ORDER
      },
      {
        title: 'Danh sách đánh giá',
        icon: 'carbon:review',
        path: ROUTE_CONFIG.MANAGE_PRODUCT.MANAGE_REVIEW
      }
    ]
  },
  {
    title: 'Cài đặt',
    icon: 'ant-design:setting-outlined',
    childrens: [
      {
        title: 'Cài đặt thành phố',
        icon: 'solar:city-outline',
        path: ROUTE_CONFIG.SETTINGS.CITY
      },
      {
        title: 'Phương thức giao hàng',
        icon: 'carbon:delivery',
        path: ROUTE_CONFIG.SETTINGS.DELIVERY_TYPE
      },
      {
        title: 'Phương thức thanh toán',
        icon: 'streamline:payment-10',
        path: ROUTE_CONFIG.SETTINGS.PAYMENT_TYPE
      }
    ]
  }
]
