import { useTranslation } from 'react-i18next'

export const PAYMENT_TYPES = () => {
  const { t } = useTranslation()

  return {
    PAYMENT_LATER: {
      label: t('Payment_later_type'),
      value: 'PAYMENT_LATER'
    },
    VN_PAYMENT: {
      label: t('Vn_pay_type'),
      value: 'VN_PAYMENT'
    },
    PAYPAL: {
      label: t('Paypal_type'),
      value: 'PAYPAL'
    }
  }
}
