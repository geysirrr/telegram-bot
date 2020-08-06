const getToday = () => {
  const today = new Date();

  const [year, month, date, day, hour, minute, second] = [
    today.getFullYear(),
    getParsedDate(today.getMonth() + 1),
    getParsedDate(today.getDate()),
    getDayName(today.getDay()),
    today.getHours(),
    today.getMinutes(),
    today.getSeconds(),
  ];

  return `${year}년 ${month}월 ${date}일 ${day}요일 ${hour}시 ${minute}분 ${second}초`;
};

const getParsedDate = (date) => (date < 10 ? `0${date}` : date);

const getDayName = (day) =>
  ({
    0: '일',
    1: '월',
    2: '화',
    3: '수',
    4: '목',
    5: '금',
    6: '토',
    7: '일',
  }[day]);

module.exports = {
  getToday,
  getParsedDate,
  getDayName,
};
