require('module-alias/register'); // '@' routes.
require('dotenv').config(); // .env files.

// Telegraf.
const { Telegraf } = require('telegraf');
const { Telegram } = require('telegraf');

// Bot instance.
const bot = new Telegraf(process.env.BOT_TOKEN);
const telegram = new Telegram(process.env.BOT_TOKEN);

// Config.
bot.use(Telegraf.log());

bot.command('segnalazione', (ctx) => {
  if (ctx.message.chat.id == process.env.TESTING_GROUP_ID) {
    try {
      let user = ctx.message.from;
      let command = ctx.message.text.substr(0, ctx.message.entities[0].length);
      let message = ctx.message.text.replace(command, '').trim();
      telegram.sendMessage(
        process.env.CHECK_CHANNEL_ID,
        `*BUG REPORTED:* 🐛\n\n*FROM:* [${user.first_name} ${
          user.last_name || ''
        }](tg://user?id=${user.id})\n\n${message}`,
        { parse_mode: 'Markdown' }
      );
    } catch (e) {
      ctx.reply('error');
    }
  } else {
    ctx.reply(
      'Spiacente, è possibile eseguire questo comando esclusivamente nei canali di Beta Testing accreditati.\nLo Staff di Starting Finance.'
    );
  }
});

bot.launch(console.log('Bot started.'));
