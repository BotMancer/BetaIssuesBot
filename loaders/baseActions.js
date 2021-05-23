const { getReportMessage, getReportOwner } = require('@utils/parseMessage');

/**
 *
 * @param {*} bot
 * @param {Function} callback
 * @param {string} trigger
 */
module.exports = (bot, callback, trigger) => {
  bot.action(trigger, (ctx) => {
    const { text, entities } = ctx.callbackQuery.message;

    const tickerOwner = getReportOwner(text, entities);
    const tickerDesc = getReportMessage(text, entities);

    console.log(`Running action: ${trigger}`);

    callback(ctx, tickerOwner, tickerDesc);
  });
  return;
};
