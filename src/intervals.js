const { getHourMessage } = require('./messages');

const intervalTimeChecker = (bot) => {
  let hour = new Date().getHours();

  setInterval(() => {
    const date = new Date();
    const [currentHour, currentMinute, currentSecond] = [
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ];

    if (currentHour === 18 && currentMinute === 30 && currentSecond === 0) {
      bot.sendMessage(process.env.CHAT_ID, `퇴근 시간이 되었습니다.`);
    }

    if (hour !== currentHour) {
      hour = currentHour;
      bot.sendMessage(process.env.CHAT_ID, getHourMessage(hour));
    }
  }, 1000);
};

module.exports = {
  intervalTimeChecker,
};
