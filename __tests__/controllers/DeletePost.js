import handler from '../../src/controllers/DeletePost';
import logger from '../../src/utils/Logger';
import { deletePost } from '../../src/models/Post';

jest.mock('../../src/utils/Logger', () => ({ error: jest.fn() }));
jest.mock('../../src/models/Post', () => ({ deletePost: jest.fn() }));

describe('DeletePostController', () => {
  beforeEach(() => jest.clearAllMocks());

  test('calling without error', async () => {
    const id = 'id';
    const mockEndFn = jest.fn();
    const mockStatusFn = jest.fn().mockReturnValue({ end: mockEndFn });
    const mockReq = { query: { id } };
    const mockRes = { status: mockStatusFn };

    await handler(mockReq, mockRes);

    expect(deletePost).toHaveBeenCalledTimes(1);
    expect(deletePost).toHaveBeenLastCalledWith(id);
    expect(mockStatusFn).toHaveBeenCalledTimes(1);
    expect(mockStatusFn).toHaveBeenLastCalledWith(200);
    expect(logger.error).not.toHaveBeenCalled();
    expect(mockEndFn).toHaveBeenCalledTimes(1);
  });

  test('calling with an error', async () => {
    const id = 'id';
    const mockEndFn = jest.fn();
    const mockStatusFn = jest.fn().mockReturnValue({ end: mockEndFn });
    const mockReq = { query: { id } };
    const mockRes = { status: mockStatusFn };

    const error = new Error('err');
    deletePost.mockImplementationOnce(() => { throw error; });

    await handler(mockReq, mockRes);

    expect(deletePost).toHaveBeenCalledTimes(1);
    expect(deletePost).toHaveBeenLastCalledWith(id);
    expect(mockStatusFn).toHaveBeenCalledTimes(1);
    expect(mockStatusFn).toHaveBeenLastCalledWith(500);
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenLastCalledWith('DeletePost', error);
    expect(mockEndFn).toHaveBeenCalledTimes(1);
  });
});
