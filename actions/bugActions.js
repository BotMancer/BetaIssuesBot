const { Markup } = require('telegraf');
const {
  projectsID,
  issueTypesID,
  createIssue
} = require('@clients/jiraClient');
const { getMessage, getOwner } = require('@utils/parseCbQuery');

const bugApprovedAction = async (ctx) => {
  const { text, entities } = ctx.callbackQuery.message;

  const bugOwner = getOwner(text, entities);
  const bugMessage = getMessage(text, entities);

  const res = await createIssue(
    projectsID.RRA,
    issueTypesID.RRA.BUG,
    '[BOT]: New bug reported.',
    bugMessage,
    bugOwner
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
      `Error while creating a BUG issue on Jira. Code: ${res.status}`
    );
    await ctx.editMessageReplyMarkup({
      inline_keyboard: [[Markup.button.callback('⚠️ RETRY', 'APPROVE_BUG')]]
    });
  }
};

const bugRestoredAction = async (ctx) => {
  await ctx.editMessageReplyMarkup({
    inline_keyboard: [
      [Markup.button.callback('✅ APPROVE', 'APPROVE_BUG')],
      [Markup.button.callback('❌ REJECT', 'REJECT_BUG')]
    ]
  });
};

const bugRejectedAction = async (ctx) => {
  await ctx.editMessageReplyMarkup({
    inline_keyboard: [[Markup.button.callback('♻️ RESTORE', 'RESTORE_BUG')]]
  });
};

module.exports = {
  bugApprovedAction,
  bugRestoredAction,
  bugRejectedAction
};
