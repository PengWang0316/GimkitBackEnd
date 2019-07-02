'use stict';

const app = require('express')();
// const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { initialPool } = require('@kevinwang0316/mysql-helper');

// fallback to regular https when the browers do not support HTTP2 nor SPDY.
// const spdy = require('spdy');
const normalRouters = require('./routers/NormalRouters');
require('dotenv').config();

// will not use in this project
// const credentials = { // Config to use ssl
//   key: fs.readFileSync('/etc/letsencrypt/live/orderstaker.kevin-project.com/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/orderstaker.kevin-project.com/fullchain.pem'),
// };


app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use compression
// app.use(compress());

// define routers
app.use('/api/v1', normalRouters);

/*
* Health check for monitoring
*/
app.get('/healthcheck', (req, res) => {
  res.end('ok');
});
// Initialize the MySql pool
const {
  dbHost, dbUser, dbPassword, dbName, poolSize,
} = process.env;
console.log(poolSize);
initialPool(dbHost, dbUser, dbPassword, dbName, poolSize, { multipleStatements: true });

// spdy.createServer(app).listen(process.env.SERVER_PORT, () => console.log(`The service is started. port:${process.env.SERVER_PORT}`));
app.listen(process.env.SERVER_PORT, () => console.log(`The service is started. port:${process.env.SERVER_PORT}`));
