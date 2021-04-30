const { Markup } = require('telegraf');
const {
  projectsID,
  issueTypesID,
  createIssue
} = require('@clients/jiraClient');

module.exports = async (ctx, featureReporter, featureDescription) => {
  const res = await createIssue(
    projectsID.RRA,
    issueTypesID.RRA.FEATURE,
    '[BOT]: New feature requestes.',
    featureDescription,
    featureReporter
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
