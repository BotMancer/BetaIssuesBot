require('module-alias/register'); // '@' routes.
require('dotenv').config(); // .env files.

// Telegraf & Telegram.
const { Telegraf } = require('telegraf');
const { Telegram } = require('telegraf');

// Commands.
const reportCommand = require('@commands/reportCommand');
const featureCommand = require('@commands/featureCommand');

// Actions.
const {
  reportApprovedAction,
  reportRestoredAction,
  reportRejectedAction
} = require('@actions/reportActions');
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
bot.command('report', (ctx) => reportCommand(ctx, telegram));
bot.command('feature', (ctx) => featureCommand(ctx, telegram));

// Bug related actions registration.
bot.action('APPROVE_BUG', (ctx) => reportApprovedAction(ctx));
bot.action('REJECT_BUG', (ctx) => reportRejectedAction(ctx));
bot.action('RESTORE_BUG', (ctx) => reportRestoredAction(ctx));

// Feature related actions registration.
bot.action('APPROVE_FEATURE', (ctx) => featureApprovedAction(ctx));
bot.action('REJECT_FEATURE', (ctx) => featureRejectedAction(ctx));
bot.action('RESTORE_FEATURE', (ctx) => featureRestoredAction(ctx));

// Bot Launch.
bot.launch(console.log('Bot started.')).catch((err) => console.error(err));
