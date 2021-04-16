const { Markup } = require('telegraf');
const {
  projectsID,
  issueTypesID,
  createIssue
} = require('@clients/jiraClient');
const { getMessage, getOwner } = require('@utils/parseCbQuery');

const featureApprovedAction = async (ctx) => {
  const { text, entities } = ctx.callbackQuery.message;

  const featureOwner = getOwner(text, entities);
  const featureMessage = getMessage(text, entities);

  const res = createIssue(
    projectsID.RRA,
    issueTypesID.RRA.FEATURE,
    '[BOT]: New feature requestes.',
    featureMessage,
    featureOwner
  );

  if (res.status == 201) {
    await ctx.editMessageReplyMarkup({
      inline_keyboard: [
        [
          Markup.button.url(
            'VIEW ON JIRA',
            `${process.env.JIRA_BASE_URL}/jira/software/c/projects/RRA/issues/${res.key}`
          )
        ]
      ]
    });
  } else {
    console.error(
      `Error while creating a FEATURE issue on Jira. Code: ${res.status}`
    );
    await ctx.editMessageReplyMarkup({
      inline_keyboard: [[Markup.button.callback('⚠️ RETRY', 'APPROVE_FEATURE')]]
    });
  }
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
