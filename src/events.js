const TelegramBot = require('node-telegram-bot-api');
const { getToday } = require('./utils');
const { namuWikiCrawler, weatherCrawler } = require('./crawlers');
const { intervalTimeChecker } = require('./intervals');

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/time/, (msg, _) => {
  bot.sendMessage(msg.chat.id, getToday());
});

bot.onText(/\/날씨/, (msg, _) => {
  weatherCrawler(msg, bot);
});

bot.onText(/\/namu (.+)/, (msg, _) => {
  namuWikiCrawler(msg, bot);
});

intervalTimeChecker(bot);
