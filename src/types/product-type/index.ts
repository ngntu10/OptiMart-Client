export type TParamsGetProductTypes = {
  limit?: number
  page?: number
  search?: string
  order?: string
}

export type TParamsCreateProductType = {
  name: string
  slug: string
}

export type TParamsEditProductType = {
  id: string
  name: string
  slug: string
}

export type TParamsDeleteProductType = {
  id: string
}

export type TParamsDeleteMultipleProductType = {
  productTypeIds: string[]
}
