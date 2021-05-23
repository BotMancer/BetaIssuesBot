const { Markup } = require('telegraf');

module.exports = (ctx, telegram, message, owner) => {
  if (ctx.message.chat.id == process.env.TESTING_GROUP_ID) {
    try {
      if (message != '') {
        telegram
          .sendMessage(
            process.env.CHECK_CHANNEL_ID,
            `*FEATURE REQUESTED:* ✨\n\n*FROM:* [${owner.first_name} ${
              owner.last_name || ''
            }](tg://user?id=${owner.id})\n\n${message}`,
            {
              parse_mode: 'Markdown',
              ...Markup.inlineKeyboard([
                [Markup.button.callback('✅ APPROVE', 'APPROVE_FEATURE')],
                [Markup.button.callback('❌ REJECT', 'REJECT_FEATURE')]
              ])
            }
          )
          .then((_) => {
            ctx.reply(
              'Richiesta inviata correttamente, grazie mille per il consiglio!'
            );
          });
      } else {
        ctx.reply('Si prega di inserire una descrizione.');
      }
    } catch (e) {
      ctx.reply('An error occurred.');
      console.error(e);
    }
  } else {
    ctx.reply(
      'Spiacente, è possibile eseguire questo comando esclusivamente nei canali di Beta Testing accreditati.\nLo Staff di Starting Finance.'
    );
  }
};
