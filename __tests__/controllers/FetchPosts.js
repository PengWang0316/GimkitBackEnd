import handler from '../../src/controllers/FetchPosts';
import logger from '../../src/utils/Logger';
import { fetchPosts } from '../../src/models/Post';

jest.mock('../../src/utils/Logger', () => ({ error: jest.fn() }));
jest.mock('../../src/models/Post', () => ({ fetchPosts: jest.fn() }));

describe('FetchPostController', () => {
  beforeEach(() => jest.clearAllMocks());

  test('calling without error', async () => {
    const mockEndFn = jest.fn();
    const mockJsonFn = jest.fn();
    const mockStatusFn = jest.fn().mockReturnValue({ json: mockJsonFn, end: mockEndFn });
    const mockReq = { query: { offset: 1, limit: 10 } };
    const mockRes = { status: mockStatusFn };
    const posts = [{ id: 1 }, { id: 2 }];

    fetchPosts.mockReturnValueOnce(posts);

    await handler(mockReq, mockRes);

    expect(fetchPosts).toHaveBeenCalledTimes(1);
    expect(fetchPosts).toHaveBeenLastCalledWith(1, 10);
    expect(mockStatusFn).toHaveBeenCalledTimes(1);
    expect(mockStatusFn).toHaveBeenLastCalledWith(200);
    expect(mockJsonFn).toHaveBeenCalledTimes(1);
    expect(mockJsonFn).toHaveBeenLastCalledWith(posts);
    expect(logger.error).not.toHaveBeenCalled();
    expect(mockEndFn).not.toHaveBeenCalled();
  });

  test('calling with an error', async () => {
    const mockEndFn = jest.fn();
    const mockJsonFn = jest.fn();
    const mockStatusFn = jest.fn().mockReturnValue({ json: mockJsonFn, end: mockEndFn });
    const mockReq = { query: { offset: 1, limit: 10 } };
    const mockRes = { status: mockStatusFn };

    const error = new Error('err');
    fetchPosts.mockImplementationOnce(() => { throw error; });

    await handler(mockReq, mockRes);

    expect(fetchPosts).toHaveBeenCalledTimes(1);
    expect(fetchPosts).toHaveBeenLastCalledWith(1, 10);
    expect(mockStatusFn).toHaveBeenCalledTimes(1);
    expect(mockStatusFn).toHaveBeenLastCalledWith(500);
    expect(mockJsonFn).not.toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenLastCalledWith('FetchPosts', error);
    expect(mockEndFn).toHaveBeenCalledTimes(1);
  });
});
