export type TParamsGetProducts = {
  limit?: number
  page?: number
  search?: string
  order?: string
}
export type TParamsCreateProduct = {
  name: string
  type: string
  discount: number
  price: number
  description?: string
  slug: string
  city: string
  countInStock: number
  status: number
  discountEndDate: Date | null
  discountStartDate: Date | null
}
export type TParamsEditProduct = {
  id: string
  name: string
  type: string
  discount: number
  price: number
  description: string
  slug: string
  countInStock: number
  status: number
  discountEndDate: Date | null
  discountStartDate: Date | null
  city: string
}
export type TParamsDeleteProduct = {
  id: string
}
export type TParamsDeleteMultipleProduct = {
  productIds: string[]
}
