const { queryAsync } = require('@kevinwang0316/mysql-helper');

exports.addNewPost = async ({ title, content }) => {
  const INSERT_SQL = 'INSERT INTO ?? (title, content) VALUES (?, ?)';
  const { rows: { insertId } } = await queryAsync(INSERT_SQL, [process.env.POST_TABLE, title, content]);
  return {
    id: insertId, title, content, date: new Date().toLocaleDateString(),
  };
};

exports.fetchPostCount = async () => {
  const QUERY_SQL = 'SELECT COUNT(*) count FROM ??';
  const { rows } = await queryAsync(QUERY_SQL, [process.env.POST_TABLE]);
  return rows[0].count;
};

exports.fetchPosts = async (offset, limit) => {
  const QUERY_SQL = 'SELECT id, title, content, timestamp date FROM ?? ORDER BY timestamp DESC LIMIT ?, ?';
  const { rows } = await queryAsync(QUERY_SQL, [process.env.POST_TABLE, +offset, +limit]);
  return rows;
};
