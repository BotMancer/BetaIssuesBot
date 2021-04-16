const { Markup } = require('telegraf');
const {
  projectsID,
  issueTypesID,
  createIssue
} = require('@clients/jiraClient');

module.exports = async (ctx, bugReporter, bugDescription) => {
  const res = await createIssue(
    projectsID.RRA,
    issueTypesID.RRA.BUG,
    '[BOT]: New bug reported.',
    bugDescription,
    bugReporter
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
