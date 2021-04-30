const path = require('path');
const fs = require('fs');

module.exports = (bot, telegram) => {
  const baseCommands = require('./baseCommands');

  const loadCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir));

    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));

      if (stat.isDirectory()) {
        loadCommands(path.join(dir, file));
      } else {
        const callback = require(path.join(__dirname, dir, file));
        const trigger = file.split('.')[0];

        if (bot && telegram) {
          baseCommands(bot, telegram, callback, trigger);
          console.log(`Loaded command: ${trigger}`);
        }
      }
    }
  };

  loadCommands('../commands');
};
