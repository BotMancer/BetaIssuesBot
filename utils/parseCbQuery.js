/**
 *
 * @param {string} text
 * @param {Array} entities
 */
const getMessage = (text, entities) => {
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

/**
 *
 * @param {string} text
 * @param {Array} entities
 */
const getOwner = (text, entities) => {
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

module.exports = { getMessage, getOwner };
