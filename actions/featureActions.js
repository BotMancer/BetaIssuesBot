const { Markup } = require('telegraf');
const {
  projectsID,
  issueTypesID,
  createIssue
} = require('@clients/jiraClient');
const { getMessage, getOwner } = require('@utils/parseCbQuery');

const featureApprovedAction = async (ctx) => {
  const { text, entities } = ctx.callbackQuery.message;
  await ctx.editMessageReplyMarkup({
    inline_keyboard: []
  });

  const featureOwner = getOwner(text, entities);
  const featureMessage = getMessage(text, entities);

  createIssue(
    projectsID.RRA,
    issueTypesID.RRA.FEATURE,
    'BOT - NEW FEATURE',
    featureMessage,
    featureOwner
  );
};

const featureRestoredAction = async (ctx) => {
  await ctx.editMessageReplyMarkup({
    inline_keyboard: [
      [Markup.button.callback('✅ APPROVE', 'APPROVE_FEATURE')],
      [Markup.button.callback('❌ REJECT', 'REJECT_FEATURE')]
    ]
  });
};

const featureRejectedAction = async (ctx) => {
  await ctx.editMessageReplyMarkup({
    inline_keyboard: [[Markup.button.callback('♻️ RESTORE', 'RESTORE_FEATURE')]]
  });
};

module.exports = {
  featureApprovedAction,
  featureRestoredAction,
  featureRejectedAction
};
