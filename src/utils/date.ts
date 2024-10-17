export const getTimePast = (date: Date, t: any): string => {
  const currentDate: Date = new Date()
  const millisecondsInDay: number = 1000 * 60 * 60 * 24
  const pastTimeSecond: number = currentDate.getTime() - date.getTime()
  const pastTimeDate: number = pastTimeSecond / millisecondsInDay
  console.log('pastTimeDate', { pastTimeDate })
  if (pastTimeDate < 30) {
    if (pastTimeDate < 1) {
      return `${'recently'}`
    }
    return `${Math.floor(pastTimeDate)} ${t('day')}`
  } else if (pastTimeDate < 365) {
    const month: number = Math.floor(pastTimeDate / 30)
    return `${month} ${t('month')}`
  } else {
    const year: number = Math.floor(pastTimeDate / 365)
    return `${year} ${t('year')}`
  }
}
