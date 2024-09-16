export type TParamsGetDeliveryTypes = {
  limit?: number
  page?: number
  search?: string
  order?: string
}

export type TParamsCreateDeliveryType = {
  name: string
}

export type TParamsEditDeliveryType = {
  id: string
  name: string
}

export type TParamsDeleteDeliveryType = {
  id: string
}

export type TParamsDeleteMultipleDeliveryType = {
  deliveryTypeIds: string[]
}
