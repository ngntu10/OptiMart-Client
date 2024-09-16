export type TParamsGetDeliveryTypes = {
  limit?: number
  page?: number
  search?: string
  order?: string
}

export type TParamsCreateDeliveryType = {
  name: string
  price: string
}

export type TParamsEditDeliveryType = {
  id: string
  price?: string
  name: string
}

export type TParamsDeleteDeliveryType = {
  id: string
}

export type TParamsDeleteMultipleDeliveryType = {
  deliveryTypeIds: string[]
}
