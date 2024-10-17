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
    return `${Math.floor(pastTimeDate)} ${t('day')}`; // Dưới 30 ngày => X ngày
  } else if (pastTimeDate < 365) {
    const month = Math.floor(pastTimeDate / 30);
    return `${month} ${t('month')}`; // Dưới 1 năm => X tháng
  } else {
    const year = Math.floor(pastTimeDate / 365);
    return `${year} ${t('year')}`; // Trên 1 năm => X năm
  }
};
