require('module-alias/register'); // '@' routes.
require('dotenv').config(); // .env file.

// Telegraf & Telegram.
const { Telegraf } = require('telegraf');
const { Telegram } = require('telegraf');

// Commands.
const loadCommands = require('@loaders/loadCommands');

// Actions.
const loadActions = require('@loaders/loadActions');

// Telegraf and Telegram bot instances.
const bot = new Telegraf(process.env.BOT_TOKEN);
const telegram = new Telegram(process.env.BOT_TOKEN);

// Config.
bot.use(Telegraf.log());

// Commands registration.
loadCommands(bot, telegram);

// Actions registration.
loadActions(bot);

// Bot Launch.
bot.launch(console.log('BBot started.')).catch((err) => console.error(err));
