import { queryAsync } from '@kevinwang0316/mysql-helper';
import {
  addNewPost, updatePost, fetchPostCount, fetchPosts, deletePost,
} from '../../src/models/Post';

process.env.POST_TABLE = 'Post';
jest.mock('@kevinwang0316/mysql-helper', () => ({ queryAsync: jest.fn() }));
// Mock new Date().toLocaleDateString()
const constantDate = new Date('2019-01-01T04:41:20');

/* eslint no-global-assign:off */
Date = class extends Date {
  constructor() {
    return constantDate;
  }
};

describe('Post Model', () => {
  beforeEach(() => jest.clearAllMocks());

  test('addNewPost', async () => {
    const title = 'title';
    const content = 'content';
    const INSERT_SQL = 'INSERT INTO ?? (title, content) VALUES (?, ?)';

    queryAsync.mockReturnValueOnce({ rows: { insertId: 1 } });

    const result = await addNewPost({ title, content });

    expect(queryAsync).toHaveBeenCalledTimes(1);
    expect(queryAsync).toHaveBeenLastCalledWith(INSERT_SQL, [process.env.POST_TABLE, title, content]);
    expect(result).toEqual({
      id: 1, title, content, date: '1/1/2019',
    });
  });

  test('updatePost', async () => {
    const title = 'title';
    const content = 'content';
    const id = '1';
    const UPDATE_SQL = 'UPDATE ?? SET title= ?, content = ? WHERE id = ?';

    await updatePost({ title, content, id });

    expect(queryAsync).toHaveBeenCalledTimes(1);
    expect(queryAsync).toHaveBeenLastCalledWith(UPDATE_SQL, [process.env.POST_TABLE, title, content, +id]);
  });

  test('fetchPostCount', async () => {
    const QUERY_SQL = 'SELECT COUNT(*) count FROM ??';

    queryAsync.mockReturnValueOnce({ rows: [{ count: 1 }] });

    const result = await fetchPostCount();

    expect(queryAsync).toHaveBeenCalledTimes(1);
    expect(queryAsync).toHaveBeenLastCalledWith(QUERY_SQL, [process.env.POST_TABLE]);
    expect(result).toBe(1);
  });

  test('fetchPosts', async () => {
    const offset = '1';
    const limit = '2';
    const QUERY_SQL = 'SELECT id, title, content, timestamp date FROM ?? ORDER BY timestamp DESC LIMIT ?, ?';

    const mockRows = [{ id: 1 }];
    queryAsync.mockReturnValueOnce({ rows: mockRows });

    const result = await fetchPosts(offset, limit);

    expect(queryAsync).toHaveBeenCalledTimes(1);
    expect(queryAsync).toHaveBeenLastCalledWith(QUERY_SQL, [process.env.POST_TABLE, +offset, +limit]);
    expect(result).toBe(mockRows);
  });

  test('deletePost', async () => {
    const DELETE_SQL = 'DELETE FROM ?? WHERE id = ?';
    const id = '1';
    await deletePost(id);

    expect(queryAsync).toHaveBeenCalledTimes(1);
    expect(queryAsync).toHaveBeenLastCalledWith(DELETE_SQL, [process.env.POST_TABLE, +id]);
  });
});
