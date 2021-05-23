const { Markup } = require('telegraf');
const { projectsID, issueTypesID, createIssue } = require('@clients/jira');

/* JIRA PROJECT SECTION */

const PROJECT_NAME = 'RRA';
const ISSUE_TYPE = 'FEATURE';

/* END OF JIRA PROJECT SECTION */

module.exports = async (ctx, featureReporter, featureDescription) => {
  const res = await createIssue(
    projectsID[PROJECT_NAME],
    issueTypesID[PROJECT_NAME][ISSUE_TYPE],
    '[BOT]: New feature requested.',
    featureDescription,
    featureReporter
  );

  if (res.status == 201) {
    await ctx.editMessageReplyMarkup({
      inline_keyboard: [
        [
          Markup.button.url(
            'VIEW ON JIRA',
            `${process.env.JIRA_BASE_URL}/jira/software/c/projects/${PROJECT_NAME}/issues/${res.key}`
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
