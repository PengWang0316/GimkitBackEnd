const logger = require('../utils/Logger');
const { fetchPostCount } = require('../models/Post');

module.exports = async (req, res) => {
  try {
    const count = await fetchPostCount();
    res.status(200).json(count);
  } catch (err) {
    logger.error('FetchPostCount', err);
    res.status(500).end();
  }
};
