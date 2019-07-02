const normalRouter = require('express').Router();

require('dotenv').config(); // Loading .env to process.env

// Controllers import
const addNewPost = require('../controllers/AddNewPost');

// Add a new post
normalRouter.post('/post', addNewPost);

module.exports = normalRouter;
