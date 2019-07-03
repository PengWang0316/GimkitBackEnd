const logger = require('../utils/Logger');
const { fetchPosts } = require('../models/Post');

module.exports = async (req, res) => {
  try {
    const { offset, limit } = req.query;
    const posts = await fetchPosts(offset, limit);
    res.status(200).json(posts);
  } catch (err) {
    logger.error('FetchPosts', err);
    res.status(500).end();
  }
};
