/*
 * A middleware to wrap some comman middlwares.
 * So all function will have these middlewares automatically.
 */
const middy = require('middy');

const initialMysqlPool = require('./InitialMysqlPool');

module.exports = func => middy(func).use(initialMysqlPool);
