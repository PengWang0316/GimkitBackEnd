const logger = require('../utils/Logger');
const { deletePost } = require('../models/Post');

module.exports = async (req, res) => {
  try {
    const { id } = req.query;
    await deletePost(id);
    res.status(200).end();
  } catch (err) {
    logger.error('FetchPosts', err);
    res.status(500).end();
  }
};
