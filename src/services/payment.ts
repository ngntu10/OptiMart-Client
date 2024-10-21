import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'
import { TParamsCreateURLPayment, TParamsGetIpnVNPay } from 'src/types/payment'
export const createURLpaymentVNPay = async (data: TParamsCreateURLPayment) => {
    const res = await instanceAxios.post(`${API_ENDPOINT.SETTING.PAYMENT_TYPE.INDEX}/create_payment_url`, data)
    return res.data
}
export const getVNPayIpnPayment = async (data: { params: TParamsGetIpnVNPay }) => {
    const res = await instanceAxios.get(`${API_ENDPOINT.SETTING.PAYMENT_TYPE.INDEX}/vnpay_ipn`, data)
    return res.data
}