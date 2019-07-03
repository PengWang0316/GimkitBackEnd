const logger = require('../utils/Logger');
const { updatePost } = require('../models/Post');

module.exports = async (req, res) => {
  const { post } = req.body;
  try {
    await updatePost(post);
    res.status(200).end();
  } catch (err) {
    logger.error('AddNewPost', err);
    res.status(500).end();
  }
};
