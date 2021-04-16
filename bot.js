require('module-alias/register'); // '@' routes.
require('dotenv').config(); // .env files.

// Telegraf & Telegram.
const { Telegraf } = require('telegraf');
const { Telegram } = require('telegraf');

// Commands.
const bugCommand = require('@commands/bugCommand');
const featureCommand = require('@commands/featureCommand');

// Actions.
const {
  bugApprovedAction,
  bugRestoredAction,
  bugRejectedAction
} = require('@actions/bugActions');
const {
  featureApprovedAction,
  featureRestoredAction,
  featureRejectedAction
} = require('@actions/featureActions');

// Telegraf and Telegram bot instances.
const bot = new Telegraf(process.env.BOT_TOKEN);
const telegram = new Telegram(process.env.BOT_TOKEN);

// Config.
bot.use(Telegraf.log());

// Commands registration.
bot.command('bug', (ctx) => bugCommand(ctx, telegram));
bot.command('feature', (ctx) => featureCommand(ctx, telegram));

// Bug related actions registration.
bot.action('APPROVE_BUG', (ctx) => bugApprovedAction(ctx));
bot.action('REJECT_BUG', (ctx) => bugRejectedAction(ctx));
bot.action('RESTORE_BUG', (ctx) => bugRestoredAction(ctx));

// Feature related actions registration.
bot.action('APPROVE_FEATURE', (ctx) => featureApprovedAction(ctx));
bot.action('REJECT_FEATURE', (ctx) => featureRejectedAction(ctx));
bot.action('RESTORE_FEATURE', (ctx) => featureRestoredAction(ctx));

// Bot Launch.
bot.launch(console.log('Bot started.')).catch((err) => console.error(err));
