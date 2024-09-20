export type TParamsGetProducts = {
  limit?: number
  page?: number
  search?: string
  order?: string
}
export type TParamsCreateProduct = {
  name: string
  slug: string
}
export type TParamsEditProduct = {
  id: string
  name: string
  slug: string
}
export type TParamsDeleteProduct = {
  id: string
}
export type TParamsDeleteMultipleProduct = {
  productIds: string[]
}
