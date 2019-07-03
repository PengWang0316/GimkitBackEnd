const initialPool = require('@kevinwang0316/mysql-helper');

export const initialMysqlPool = {
  before: (req, res, next) => {
    const {
      dbHost, dbUser, dbPassword, dbName, poolSize,
    } = process.env;
    initialPool(dbHost, dbUser, dbPassword, dbName, poolSize, { multipleStatements: true });
    next();
  },
};

export default initialMysqlPool;
