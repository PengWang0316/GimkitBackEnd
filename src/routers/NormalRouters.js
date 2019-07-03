const normalRouter = require('express').Router();

require('dotenv').config(); // Loading .env to process.env

// Controllers import
const addNewPost = require('../controllers/AddNewPost');
const fetchPostCount = require('../controllers/FetchPostCount');
const fetchPosts = require('../controllers/FetchPosts');
const deletePost = require('../controllers/DeletePost');

// Add a new post
normalRouter.post('/post', addNewPost);
normalRouter.get('/post', fetchPosts);
normalRouter.delete('/post', deletePost);
normalRouter.get('/post/count', fetchPostCount);

module.exports = normalRouter;
