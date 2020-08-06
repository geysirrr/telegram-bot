const getHourMessage = (hour) =>
  hour === 12 ? '점심 시간입니다.' : `${hour}시 입니다.`;

module.exports = {
  getHourMessage,
};
