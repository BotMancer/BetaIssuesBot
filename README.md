# Support Bot - Starting Finance App

Bot created to help both beta-testers and developers to easly report and track
bugs, available on Telegram.

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

\* `[type]` stands for `bug` or `feature`.

## Installation

`.env` file structure:

| Field              | Description                              |
| ------------------ | ---------------------------------------- |
| `BOT_TOKEN`        | Telegram bot token given from Botfather. |
| `JIRA_TOKEN`       | Security token to interact with Jira.    |
| `JIRA_BASE_URL`    | Company base url for boards on Jira.     |
| `TESTING_GROUP_ID` | Testing team group ID.                   |
| `CHECK_CHANNEL_ID` | Support team channel ID.                 |

## License

Released under the [GNU GPL v3](https://www.gnu.org/licenses/gpl-3.0.en.html)
license.

This bot is built on top of [telegraf.js](https://telegraf.js.org/#/),
distributed under MIT License.  
Copy of this license can be found in
[LICENCE](https://github.com/telegraf/telegraf/blob/develop/LICENSE) file in the
official [telegraf.js](https://github.com/telegraf/telegraf) GitHub repo.
