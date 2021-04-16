const { getMessage, getOwner } = require('@utils/parseCbQuery');

/**
 *
 * @param {*} bot
 * @param {Function} callback
 * @param {string} trigger
 */
module.exports = (bot, callback, trigger) => {
  bot.action(trigger, (ctx) => {
    const { text, entities } = ctx.callbackQuery.message;

    const tickerOwner = getOwner(text, entities);
    const tickerDesc = getMessage(text, entities);

    console.log(`Running action: ${trigger}`);

    callback(ctx, tickerOwner, tickerDesc);
  });
  return;
};
