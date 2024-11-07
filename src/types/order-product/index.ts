export type TItemOrderProduct = {
  name: string
  amount: number
  image: string
  price: number
  discount: number
  id: string
  slug: string
}

export type TItemProductMe = {
  name: string
  amount: number
  image: string
  price: number
  discount: number
  id: string
  countInStock: number
  slug: string
}
export type TParamsStatusOrderUpdate = {
  id: string
  isDelivered?: number
  isPaid?: number
  status?: number
}

export type TParamsEditOrderProduct = {
  shippingAddress: {
    address: string
    fullName: string
    phone: string
    city: string
  }
  id: string
  isPaid: boolean
  isDelivery: boolean
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
    city: {
      id: string
      name: string
    }
    phone: string
  }
  orderItems: TItemProductMe[]
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
  deliveryAt: Date
  paidAt: Date
}

export interface TItemOrderProducts extends TItemOrderProductMe {}
