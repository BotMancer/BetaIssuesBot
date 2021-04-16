const { Markup } = require('telegraf');
const { projectsID, issueTypesID, createIssue } = require('@utils/jiraClient');

const featureApprovedAction = async (ctx) => {
  const { text, entities } = ctx.callbackQuery.message;
  await ctx.editMessageReplyMarkup({
    inline_keyboard: []
  });

  const featureMessage = text
    .substr(
      entities[entities.length - 1].offset +
        entities[entities.length - 1].length,
      text.length
    )
    .trim();

  // createIssue(
  //   projectsID.RRA,
  //   issueTypesID.RRA.FEATURE,
  //   'BOT - NEW FEATURE',
  //   featureMessage
  // );
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
