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
    product: {
      id: string
      name: string
    }
    content: string
    updatedAt: Date
  }