export const getTimePast = (createdAt: number[], t: any): string => {
  // Chuyển mảng thành đối tượng Date
  const pastDate = new Date(
    createdAt[0], // Năm
    createdAt[1] - 1, // Tháng (trừ đi 1 vì tháng bắt đầu từ 0)
    createdAt[2], // Ngày
    createdAt[3], // Giờ
    createdAt[4], // Phút
    createdAt[5]  // Giây
  );

  const currentDate = new Date(); // Lấy thời điểm hiện tại
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const pastTimeSecond = currentDate.getTime() - pastDate.getTime();
  const pastTimeDate = pastTimeSecond / millisecondsInDay;



  // Kiểm tra khoảng thời gian và trả về chuỗi tương ứng
  if (pastTimeDate < 30) {
    if (pastTimeDate < 1) {
      return `${t('recently')}`; // Dưới 1 ngày => "Gần đây"
    }
    return `${Math.floor(pastTimeDate)} ${t('day_ago')}`; // Dưới 30 ngày => X ngày
  } else if (pastTimeDate < 365) {
    const month = Math.floor(pastTimeDate / 30);
    return `${month} ${t('month_ago')}`; // Dưới 1 năm => X tháng
  } else {
    const year = Math.floor(pastTimeDate / 365);
    return `${year} ${t('year_ago')}`; // Trên 1 năm => X năm
  }
};

export const formatDate = (
  value: Date | string | number[] | null,
  formatting: Intl.DateTimeFormatOptions = { month: 'numeric', day: 'numeric', year: 'numeric' }
) => {
  if (!value) return value;

  // Check if value is an array
  if (Array.isArray(value)) {
    // Convert the array into a Date object
    const [year, month, day, hour, minute, second, millisecond] = value;
    value = new Date(year, month - 1, day, hour, minute, second, millisecond);
  }

  return Intl.DateTimeFormat('vi-VN', formatting).format(new Date(value));
};

export const getTimePast1 = (date: Date, t: any): string => {
  const currentDate: Date = new Date()
  const millisecondsInDay: number = 1000 * 60 * 60 * 24

  const pastTimeSecond: number = currentDate.getTime() - date.getTime()
  const pastTimeDate: number = pastTimeSecond / millisecondsInDay
  if (pastTimeDate < 30) {
    if(pastTimeDate < 1) {
        return `${"recently"}`
    }

    return `${Math.floor(pastTimeDate)} ${t("day")}`
  } else if (pastTimeDate < 365) {
    const month: number = Math.floor(pastTimeDate / 30)

    return `${month} ${t("month")}`
  } else {
    const year: number = Math.floor(pastTimeDate / 365)

    return `${year} ${t("year")}`
  }
}

export const fDate = (
  value: Date | string,
  formatting: Intl.DateTimeFormatOptions = { month: 'numeric', day: 'numeric', year: 'numeric' }
) => {
  if (!value) return value

  return Intl.DateTimeFormat('vi-VN', formatting).format(new Date(value))
}
