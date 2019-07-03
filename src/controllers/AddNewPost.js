const logger = require('../utils/Logger');
const { addNewPost } = require('../models/Post');

module.exports = async (req, res) => {
  const { post } = req.body;
  try {
    const newPost = await addNewPost(post);
    res.status(200).json(newPost);
  } catch (err) {
    logger.error('AddNewPost', err);
    res.status(500).end();
  }
};
