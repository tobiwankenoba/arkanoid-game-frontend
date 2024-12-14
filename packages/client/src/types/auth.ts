export interface ISignUpRequest {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface ISignUpResponse {
  status: number
  id: number
  data: unknown
}
export interface ISignInRequest {
  login: string
  password: string
}

export interface IErrorResponse {
  status: number
  reason: string
}
