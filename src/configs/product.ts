import { useTranslation } from 'react-i18next'
export const OBJECT_STATUS_PRODUCT = () => {
  const { t } = useTranslation()
  return {
    '0': {
      label: t('Private'),
      value: '0'
    },
    '1': {
      label: t('Public'),
      value: '1'
    }
  }
}

export const FILTER_REVIEW_PRODUCT = () => {
  const { t } = useTranslation()
  return [
    {
      label: t('Từ 4.5 trở lên'),
      value: '4.5'
    },
    {
      label: t('Từ 4 trở lên'),
      value: '4'
    },
    {
      label: t('Từ 3,5 trở lên'),
      value: '3.5'
    },
    {
      label: t('Từ 3 trở lên'),
      value: '3'
    }
  ]
}
