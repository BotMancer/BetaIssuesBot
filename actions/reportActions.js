const { Markup } = require('telegraf');
const {
  projectsID,
  issueTypesID,
  createIssue
} = require('@clients/jiraClient');
const { getMessage, getOwner } = require('@utils/parseCbQuery');

const reportApprovedAction = async (ctx) => {
  const { text, entities } = ctx.callbackQuery.message;

  const reportOwner = getOwner(text, entities);
  const reportMessage = getMessage(text, entities);

  await ctx.editMessageReplyMarkup({
    inline_keyboard: []
  });

  createIssue(
    projectsID.RRA,
    issueTypesID.RRA.BUG,
    'BOT - NEW BUG',
    reportMessage,
    reportOwner
  );
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
