/**
 *
 * @param {string} text
 * @param {Array} entities
 */
const getReportMessage = (text, entities) => {
  try {
    return text
      .substr(
        entities[entities.length - 1].offset +
          entities[entities.length - 1].length,
        text.length
      )
      .trim();
  } catch (e) {
    console.error(e);
  }
};

/**
 *
 * @param {string} text
 * @param {Array} entities
 */
const getReportOwner = (text, entities) => {
  try {
    return text
      .substr(
        entities[entities.length - 1].offset,
        entities[entities.length - 1].length
      )
      .trim();
  } catch (e) {
    console.error(e);
  }
};

const getCommandMessage = (text, entities) => {
  try {
    return text.replace(text.substr(0, entities[0].length), '').trim();
  } catch (e) {
    console.error(e);
  }
}

module.exports = { getReportMessage, getReportOwner, getCommandMessage };
