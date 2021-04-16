const fetch = require('node-fetch');

const JIRA_TOKEN = process.env.JIRA_TOKEN;
const BASE_URL = process.env.JIRA_BASE_URL;

const projectsID = {
  RRA: '10004',
  APP: '10000'
};

const issueTypesID = {
  RRA: {
    BUG: '10026',
    FEATURE: '10025',
    IMPROVEMENT: '10022',
    TASK: '10023'
  },
  APP: {
    BUG: '10001',
    REVIEW: '10006',
    FIX: '10021',
    TASK: '10002'
  }
};

/**
 *
 * @param {keyof(projectsID)} projectID
 * @param {keyof(issueTypesID)} issueTypeID
 * @param {string} summary
 * @param {string} desc
 */
const createIssue = (projectID, issueTypeID, summary, desc, reporter) => {
  const data = {
    fields: {
      summary: summary,
      issuetype: {
        id: issueTypeID
      },
      project: {
        id: projectID
      },
      description: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [
              {
                text: `Reporter: ${reporter}`,
                type: 'text'
              }
            ]
          },
          {
            type: 'paragraph',
            content: [
              {
                text: desc,
                type: 'text'
              }
            ]
          }
        ]
      }
    }
  };

  fetch(`${BASE_URL}/issue`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${JIRA_TOKEN}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((res) => {
      return res.status;
    })
    .catch((err) => console.error(err));
};

module.exports = { projectsID, issueTypesID, createIssue };
