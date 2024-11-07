export type TParamsGetNotification = {
  limit?: number
  page?: number
  search?: string
  order?: string
  userId?: string
}
export type TParamsCreateDeliveryType = {
  name: string
  price: string
}
export type TParamsEditDeliveryType = {
  id: string
  name: string
  price: string
}
export type TParamsDeleteDeliveryType = {
  id: string
}
export type TParamsDeleteMultipleDeliveryType = {
  deliveryTypeIds: string[]
}
