// ** Types
import { TItemOrderProduct } from 'src/types/order-product'

// ** Libraries
import { useTranslation } from 'react-i18next'
import { ContentState, EditorState } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'
import Chart from 'chart.js/auto';

export const toFullName = (lastName: string, middleName: string, firstName: string, language: string) => {
  if (language === 'vi') {
    return `${lastName ? lastName : ''} ${middleName ? middleName : ''} ${firstName ? firstName : ''}`.trim()
  }

  return `${firstName ? firstName : ''} ${middleName ? middleName : ''} ${lastName ? lastName : ''}`.trim()
}

export const convertBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

export const separationFullName = (fullName: string, language: string) => {
  const result = {
    firstName: '',
    middleName: '',
    lastName: ''
  }
  const arrFullName = fullName.trim().split(' ')?.filter(Boolean)
  if (arrFullName?.length === 1) {
    if (language === 'vi') {
      result.firstName = arrFullName.join()
    } else if (language === 'en') {
      result.lastName = arrFullName.join()
    }
  } else if (arrFullName.length === 2) {
    if (language === 'vi') {
      result.lastName = arrFullName[0]
      result.firstName = arrFullName[1]
    } else if (language === 'en') {
      result.lastName = arrFullName[1]
      result.firstName = arrFullName[0]
    }
  } else if (arrFullName.length >= 3) {
    if (language === 'vi') {
      result.lastName = arrFullName[0]
      result.middleName = arrFullName.slice(1, arrFullName.length - 1).join(' ')
      result.firstName = arrFullName[arrFullName.length - 1]
    } else if (language === 'en') {
      result.lastName = arrFullName[arrFullName.length - 1]
      result.middleName = arrFullName.slice(1, arrFullName.length - 1).join(' ')
      result.firstName = arrFullName[0]
    }
  }

  return result
}
export const getAllValueOfObject = (obj: any, arrExlude?: string[]) => {
  try {
    const values: any[] = []

    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        values.push(...getAllValueOfObject(obj[key], arrExlude))
      } else {
        if (!arrExlude?.includes(obj[key])) {
          values.push(obj[key])
        }
      }
    }

    return values
  } catch (error) {
    return []
  }
}


export const formatFilter = (filter: any) => {
  const result: Record<string, string> = {}
  Object.keys(filter)?.forEach((key: string) => {
    if (Array.isArray(filter[key]) && filter[key]?.length > 0) {
      result[key] = filter[key].join('|')
    } else if (filter[key]) {
      result[key] = filter[key]
    }
  })

  return result
}

export const stringToSlug = (str: string) => {
  // remove accents
  const from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
    to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy'
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], 'gi'), to[i])
  }

  str = str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, '-')
    .replace(/-+/g, '-')

  return str
}

export const convertHTMLToDraft = (html: string) => {
  const blocksFromHtml = htmlToDraft(html)
  const { contentBlocks, entityMap } = blocksFromHtml
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
  const editorState = EditorState.createWithContent(contentState)
  return editorState
}

export const formatNumberToLocal = (value: string | number) => {
  try {
    return Number(value).toLocaleString('vi-VN', {
      minimumFractionDigits: 0
    })
  } catch (error) {
    return value
  }
}

export const cloneDeep = (data: any) => {
  try {
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    return data
  }
}
export const convertUpdateProductToCart = (orderItems: TItemOrderProduct[], addItem: TItemOrderProduct) => {
  try {
    let result = []
    const cloneOrderItems = cloneDeep(orderItems)
    const findItems = cloneOrderItems.find((item: TItemOrderProduct) => item.id === addItem.id)
    if (findItems) {
      findItems.amount += addItem.amount
    } else {
      cloneOrderItems.push(addItem)
    }
    result = cloneOrderItems.filter((item: TItemOrderProduct) => item.amount)

    return result
  } catch (error) {
    return orderItems
  }
}
export const convertUpdateMultipleProductsCart = (orderItems: TItemOrderProduct[], addItems: any) => {
  try {
    let result = []
    const cloneOrderItems = cloneDeep(orderItems)
    addItems.forEach((addItem: any) => {
      const findItems = cloneOrderItems.find((item: any) => item.name == addItem.name)
      if (findItems) {
        findItems.amount += addItem.amount
      } else {
        cloneOrderItems.push(addItem)
      }
    })
    result = cloneOrderItems.filter((item: TItemOrderProduct) => item.amount)

    return result
  } catch (error) {
    return orderItems
  }
}

export const isExpiry = (startDate: Date | null, endDate: Date | null) => {
  if (startDate && endDate) {
    const currentTime = new Date().getTime()
    const startDateTime = new Date(startDate).getTime()
    const endDateTime = new Date(endDate).getTime()

    return startDateTime <= currentTime && endDateTime > currentTime
  }
  return false
}

