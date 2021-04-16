require('module-alias/register'); // '@' routes.
require('dotenv').config(); // .env files.

// Telegraf & Telegram.
const { Telegraf } = require('telegraf');
const { Telegram } = require('telegraf');

// Commands.
const bugCommand = require('@commands/bugCommand');
const featureCommand = require('@commands/featureCommand');

// Actions.
const loadActions = require('@loaders/loadActions');

// Telegraf and Telegram bot instances.
const bot = new Telegraf(process.env.BOT_TOKEN);
const telegram = new Telegram(process.env.BOT_TOKEN);

// Config.
bot.use(Telegraf.log());

// Commands registration.
bot.command('bug', (ctx) => bugCommand(ctx, telegram));
bot.command('feature', (ctx) => featureCommand(ctx, telegram));

// Actions registration.
loadActions(bot);

// Bot Launch.
bot.launch(console.log('Bot started.')).catch((err) => console.error(err));
