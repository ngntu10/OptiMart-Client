export type TParamsGetRoles = {
  limit?: number
  page?: number
  search?: string
  order?: string
}

export type TParamsCreateRole = {
  name: string
}

export type TParamsEditRole = {
  name: string
  id: string
  permissions?: string[]
}

export type TParamsDeleteRole = {
  name: string
  id: string
}
