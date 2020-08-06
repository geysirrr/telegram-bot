const Crawler = require('crawler');

const urls = {
  NAMU_WIKI: 'https://namu.wiki/w/',
  NAVER_WEATHER:
    'https://search.naver.com/search.naver?sm=top_hty&fbm=0&ie=utf8&query=%EB%82%A0%EC%94%A8',
};

const namuWikiCrawler = (msg, bot) => {
  const c = new Crawler({
    maxConnections: 10,
    callback: function (error, res, done) {
      if (error) {
        bot.sendMessage(msg.chat.id, error.message);
      } else {
        const $ = res.$;
        const $content = $('.wiki-heading-content > .wiki-paragraph');
        const text = $content.eq(0).text();

        bot.sendMessage(
          msg.chat.id,
          $content.length === 0 || !text
            ? '정보가 없습니다'
            : $content.eq(0).text()
        );
      }
      done();
    },
  });
  c.queue(`${urls.NAMU_WIKI}${encodeURIComponent(msg.text.substring(6))}`);
};

const weatherCrawler = (msg, bot) => {
  const c = new Crawler({
    maxConnections: 10,
    callback: function (error, res, done) {
      if (error) {
        bot.sendMessage(msg.chat.id, error.message);
      } else {
        const $ = res.$;
        const $weatherBox = $('.weather_box').eq(0);
        const address = $weatherBox.find('.sort_box._areaSelectLayer').text();
        const mainInfo = $weatherBox.find('.main_info').eq(0).text();

        bot.sendMessage(msg.chat.id, `${address}\n${mainInfo.trimLeft()}`);
      }
      done();
    },
  });
  c.queue(`${urls.NAVER_WEATHER}`);
};

module.exports = {
  namuWikiCrawler,
  weatherCrawler,
};
