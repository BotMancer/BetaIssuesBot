const { Markup } = require('telegraf');

module.exports = (ctx, telegram, message, owner) => {
  if (ctx.message.chat.id == process.env.TESTING_GROUP_ID) {
    try {
      if (message != '') {
        telegram
          .sendMessage(
            process.env.CHECK_CHANNEL_ID,
            `*BUG REPORTED:* 🐛\n\n*FROM:* [${owner.first_name} ${
              owner.last_name || ''
            }](tg://user?id=${owner.id})\n\n${message}`,
            {
              parse_mode: 'Markdown',
              ...Markup.inlineKeyboard([
                [Markup.button.callback('✅ APPROVE', 'APPROVE_BUG')],
                [Markup.button.callback('❌ REJECT', 'REJECT_BUG')]
              ])
            }
          )
          .then((_) => {
            ctx.reply(
              'Segnalazione inviata correttamente, grazie mille per il feedback!'
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
