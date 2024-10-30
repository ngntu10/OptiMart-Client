export type TParamsAddComment = {
  product: string
  user: string
  content: string
}
export interface TParamsUpdateComment {
  id: string
  content: string
}
export type TParamsDeleteMultipleComment = {
  commentIds: string[]
}
export type TParamsGetComments = {
  limit?: number
  page?: number
  search?: string
  order?: string
  isPublic?: boolean
  productId?:string
}
export type TCommentItem = {
  id: string
  user: {
    firstName: string
    lastName: string
    middleName: string
    avatar: string
    id: string
  }
  parent?:string
  product: {
    id: string
    name: string
  }
  content: string
  createdAt: Date
}
export interface TCommentItemProduct extends TCommentItem {
  replies?: TCommentItem[]
}

export type TParamsReplyComment = {
  product: string
  user: string
  content: string
  parent: string
}

