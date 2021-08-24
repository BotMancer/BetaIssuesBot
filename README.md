# BetaIssuesBot

Born to help:

- **Testers:** allowing them to easily report bugs, as well as request new
  features.
- **Developers:** grouping all the reports received from testers in a dedicated
  channel, waiting to be revised.  
  In case of a positive revision, automatic creation of the related issue on
  Jira.

Available on Telegram.

## Commands and Actions

| Users      | Description                                              |
| ---------- | -------------------------------------------------------- |
| `/bug`     | Send a ticket with description about a discovered bug.   |
| `/feature` | Send a ticket with description about a feature you wish. |

| Staff            | Description                                 |
| ---------------- | ------------------------------------------- |
| `approve-[type]` | Mark as approved. Upload it on Jira.        |
| `reject-[type]`  | Mark as rejected. Available to be restored. |
| `restore-[type]` | On rejected ticket, reset its status.       |

\*`[type]` stands for `bug` or `feature`.

## Installation

### Enviroment

`.env` file structure:

| Field              | Description                                                        |
| ------------------ | ------------------------------------------------------------------ |
| `BOT_TOKEN`        | Telegram bot token given from [BotFather](https://t.me/botfather). |
| `JIRA_TOKEN`       | Security token to interact with Jira.                              |
| `JIRA_BASE_URL`    | Company base url on Jira.                                          |
| `TESTING_GROUP_ID` | Testing team group ID.                                             |
| `CHECK_CHANNEL_ID` | Support team channel ID.                                           |

### Jira Client

- On `clients/jira.js` file:
  - Check _Jira Projects_ section and edit it properly, specifying your projects
    and related issue types.
- On `actions/[type]/approve_[type].js` files:
  - Check _Jira Project_ section and modify it with your related
    project/issue-type infos.  
    \*`[type]` stands for `bug` or `feature`.

## License

Released under the [GNU GPL v3](https://www.gnu.org/licenses/gpl-3.0.en.html)
license.

This bot is built on top of [telegraf.js](https://telegraf.js.org/#/),
distributed under MIT License.  
Copy of this license can be found in
[LICENCE](https://github.com/telegraf/telegraf/blob/develop/LICENSE) file in the
official [telegraf.js](https://github.com/telegraf/telegraf) GitHub repo.
