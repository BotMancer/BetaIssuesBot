const { Markup } = require('telegraf');
const { projectsID, issueTypesID, createIssue } = require('@utils/jiraClient');

const reportApprovedAction = async (ctx) => {
  const { text, entities } = ctx.callbackQuery.message;
  await ctx.editMessageReplyMarkup({
    inline_keyboard: []
  });

  const reportMessage = text
    .substr(
      entities[entities.length - 1].offset +
        entities[entities.length - 1].length,
      text.length
    )
    .trim();

  // createIssue(
  //   projectsID.RRA,
  //   issueTypesID.RRA.BUG,
  //   'BOT - NEW BUG',
  //   reportMessage
  // );
};

const reportRestoredAction = async (ctx) => {
  await ctx.editMessageReplyMarkup({
    inline_keyboard: [
      [Markup.button.callback('✅ APPROVE', 'APPROVE_BUG')],
      [Markup.button.callback('❌ REJECT', 'REJECT_BUG')]
    ]
  });
};

const reportRejectedAction = async (ctx) => {
  await ctx.editMessageReplyMarkup({
    inline_keyboard: [[Markup.button.callback('♻️ RESTORE', 'RESTORE_BUG')]]
  });
};

module.exports = {
  reportApprovedAction,
  reportRestoredAction,
  reportRejectedAction
};
