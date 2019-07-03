import handler from '../../src/controllers/UpdatePost';
import logger from '../../src/utils/Logger';
import { updatePost } from '../../src/models/Post';

jest.mock('../../src/utils/Logger', () => ({ error: jest.fn() }));
jest.mock('../../src/models/Post', () => ({ updatePost: jest.fn() }));

describe('FetchPostController', () => {
  beforeEach(() => jest.clearAllMocks());

  test('calling without error', async () => {
    const mockEndFn = jest.fn();
    const mockStatusFn = jest.fn().mockReturnValue({ end: mockEndFn });
    const post = { id: 1 };
    const mockReq = { body: { post } };
    const mockRes = { status: mockStatusFn };

    await handler(mockReq, mockRes);

    expect(updatePost).toHaveBeenCalledTimes(1);
    expect(updatePost).toHaveBeenLastCalledWith(post);
    expect(mockStatusFn).toHaveBeenCalledTimes(1);
    expect(mockStatusFn).toHaveBeenLastCalledWith(200);
    expect(logger.error).not.toHaveBeenCalled();
    expect(mockEndFn).toHaveBeenCalledTimes(1);
  });

  test('calling with an error', async () => {
    const mockEndFn = jest.fn();
    const mockStatusFn = jest.fn().mockReturnValue({ end: mockEndFn });
    const post = { id: 1 };
    const mockReq = { body: { post } };
    const mockRes = { status: mockStatusFn };

    const error = new Error('err');
    updatePost.mockImplementationOnce(() => { throw error; });

    await handler(mockReq, mockRes);

    expect(updatePost).toHaveBeenCalledTimes(1);
    expect(updatePost).toHaveBeenLastCalledWith(post);
    expect(mockStatusFn).toHaveBeenCalledTimes(1);
    expect(mockStatusFn).toHaveBeenLastCalledWith(500);
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenLastCalledWith('UpdatePost', error);
    expect(mockEndFn).toHaveBeenCalledTimes(1);
  });
});
