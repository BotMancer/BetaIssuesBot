const { Markup } = require('telegraf');

const featureCommand = (ctx, telegram) => {
  if (ctx.message.chat.id == process.env.TESTING_GROUP_ID) {
    try {
      const { from, entities, text } = ctx.message;
      const command = text.substr(0, entities[0].length);
      const message = text.replace(command, '').trim();

      telegram
        .sendMessage(
          process.env.CHECK_CHANNEL_ID,
          `*FEATURE REQUESTED:* ✨\n\n*FROM:* [${from.first_name} ${
            from.last_name || ''
          }](tg://user?id=${from.id})\n\n${message}`,
          {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
              [Markup.button.callback('✅ APPROVE', 'APPROVE_BUG_REPORT')],
              [Markup.button.callback('❌ REJECT', 'REJECT_BUG_REPORT')]
            ])
          }
        )
        .then((_) => {
          ctx.reply(
            'Richiesta inviata correttamente, grazie mille per il consiglio!'
          );
        });
    } catch (e) {
      ctx.reply('error');
    }
  } else {
    ctx.reply(
      'Spiacente, è possibile eseguire questo comando esclusivamente nei canali di Beta Testing accreditati.\nLo Staff di Starting Finance.'
    );
  }
};

module.exports = featureCommand;
