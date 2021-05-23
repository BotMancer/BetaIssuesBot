const { Markup } = require('telegraf');

module.exports = async (ctx) => {
  await ctx.editMessageReplyMarkup({
    inline_keyboard: [
      [Markup.button.callback('✅ APPROVE', 'APPROVE_FEATURE')],
      [Markup.button.callback('❌ REJECT', 'REJECT_FEATURE')]
    ]
  });
};
