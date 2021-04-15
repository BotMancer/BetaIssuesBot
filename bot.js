require('module-alias/register'); // '@' routes.
require('dotenv').config(); // .env files.

// Telegraf & Telegram.
const { Telegraf } = require('telegraf');
const { Telegram } = require('telegraf');

// Commands.
const reportCommand = require('@commands/report');
const featureCommand = require('@commands/feature');

// Telegraf and Telegram bot instances.
const bot = new Telegraf(process.env.BOT_TOKEN);
const telegram = new Telegram(process.env.BOT_TOKEN);

// Config.
bot.use(Telegraf.log());

bot.command('report', (ctx) => reportCommand(ctx, telegram));
bot.command('feature', (ctx) => featureCommand(ctx, telegram));

// Bot Launch.
bot.launch(console.log('Bot started.'));
