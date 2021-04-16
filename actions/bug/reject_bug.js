const { Markup } = require('telegraf');

module.exports = async (ctx) => {
  await ctx.editMessageReplyMarkup({
    inline_keyboard: [[Markup.button.callback('♻️ RESTORE', 'RESTORE_BUG')]]
  });
};
