const path = require('path');
const fs = require('fs');

module.exports = (bot) => {
  const baseActions = require('./baseActions');

  const loadActions = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir));

    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));

      if (stat.isDirectory()) {
        loadActions(path.join(dir, file));
      } else {
        const callback = require(path.join(__dirname, dir, file));
        const trigger = file.split('.')[0].toUpperCase();

        if (bot) {
          baseActions(bot, callback, trigger);
          console.log(`Loaded action: ${trigger}`);
        }
      }
    }
  };

  loadActions('../actions');
};
