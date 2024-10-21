export type TParamsCreateURLPayment = {
    totalPrice: number
    orderId: string
    language: string
  }
  export type TParamsGetIpnVNPay = {
    vnp_SecureHash: string
    vnp_TxnRef: string
    vnp_ResponseCode: string
    orderId: string
  }