export type TItemOrderProduct = {
  name: string
  amount: number
  image: string
  price: number
  discount: number
  product: string
  slug: string
}

export type TParamsCreateOrderProduct = {
  orderItems: TItemOrderProduct[]
  fullName: string
  address?: string
  city: string
  phone: string
  paymentMethod: string
  itemsPrice: number
  shippingPrice: number
  totalPrice: number
  user: string
  deliveryMethod: string
}

export type TParamsGetOrderProducts = {
  limit?: number
  page?: number
  search?: string
  order?: string
}
export type TItemOrderProductMe = {
  id: string
  shippingAddress: {
    fullName: string
    address: string
    city: string
    phone: string
  }
  orderItems: TItemOrderProduct[]
  paymentMethod: {
    id: string
    name: string
    type: string
  }
  deliveryMethod: {
    id: string
    name: string
    price: number
  }
  itemsPrice: number
  shippingPrice: number
  totalPrice: number
  user: {
    id: string
    firstName: string
    lastName: string
    middleName: string
  }
  isPaid: number
  isDelivered: number
  status: number
}