const { getCommandMessage } = require('@utils/parseCbQuery');

module.exports = (bot, telegram, callback, trigger) => {
  bot.command(trigger, (ctx) => {
    const { from, entities, text } = ctx.message;

    const message = getCommandMessage(text, entities);

    console.log(`Running command: ${trigger}`);

    callback(ctx, telegram, message, from);
  });
  return;
};
