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
  location: string
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
  location: string
}

export type TParamsDeleteProduct = {
  id: string
}

export type TParamsDeleteMultipleProduct = {
  productIds: string[]
}

export type TProduct = {
  id: string
  averageRating: number
  createdAt: Date | null
  image: string
  price: number
  name: string
  slug: string
  totalLike: number
  countInStock: number
  discountEndDate: Date | null
  discountStartDate: Date | null
  totalReviews: number
  discount: number
  sold: number
  location: {
    name: string
    id: string
  }
  likedBy: string[]
}
export type  TParamsGetRelatedProduct = {
  limit?: number
  page?: number
  search?: string
  slug: string
  order?: string
}
