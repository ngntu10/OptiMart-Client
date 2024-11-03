import { useTranslation } from 'react-i18next'

export const OBJECT_STATUS_USER = () => {
  const { t } = useTranslation()

  return {
    '0': {
      label: t('Blocking'),
      value: '0'
    },
    '1': {
      label: t('Active'),
      value: '1'
    }
  }
}

export const OBJECT_TYPE_USER = () => {
  const {t} = useTranslation()
  return {
      "1": {
          label: t("Google"),
          value: "1"
      },
      "2": {
          label: t("Facebook"),
          value: "2"
      },
      "3": {
          label: t("Email"),
          value: "3"
      }
  }
}


export const CONFIG_USER_TYPE = {
  GOOGLE: 1,
  FACEBOOK: 2,
  DEFAULT: 3
};
