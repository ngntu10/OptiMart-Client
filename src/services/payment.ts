import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'
import { TParamsCreateURLPayment, TParamsGetIpnVNPay } from 'src/types/payment'
export const createURLpaymentVNPay = async (data: TParamsCreateURLPayment) => {
    const res = await instanceAxios.post(`${API_ENDPOINT.PAYMENT.VN_PAY.INDEX}/vnpay`, data)
    return res.data
}
export const getVNPayIpnPayment = async (data: { params: TParamsGetIpnVNPay }) => {
    const res = await instanceAxios.get(`${API_ENDPOINT.PAYMENT.VN_PAY.INDEX}/vnpay-callback`, data)
    return res.data
}