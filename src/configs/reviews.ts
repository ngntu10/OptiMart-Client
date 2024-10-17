import { useTranslation } from 'react-i18next'
export const FILTER_REVIEW_CMS = () => {
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
      label: t('Từ 2 trở lên'),
      value: '2'
    },
    {
      label: t('Từ 0.5 trở lên'),
      value: '0.5'
    }
  ]
}