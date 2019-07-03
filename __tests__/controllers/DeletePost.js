import handler from '../../src/controllers/AddNewPost';
import logger from '../../src/utils/Logger';
import { addNewPost } from '../../src/models/Post';

jest.mock('../../src/utils/Logger', () => ({ error: jest.fn() }));
jest.mock('../../src/models/Post', () => ({ addNewPost: jest.fn() }));

describe('AddNewPostController', () => {
  beforeEach(() => jest.clearAllMocks());

  test('calling without error', async () => {
    const post = { title: 'title' };
    const mockJsonFn = jest.fn();
    const mockEndFn = jest.fn();
    const mockStatusFn = jest.fn().mockReturnValue({ json: mockJsonFn, end: mockEndFn });
    const mockReq = { body: { post } };
    const mockRes = { status: mockStatusFn };
    const newPost = { title: 'titleA' };
    addNewPost.mockReturnValueOnce(newPost);

    await handler(mockReq, mockRes);

    expect(addNewPost).toHaveBeenCalledTimes(1);
    expect(addNewPost).toHaveBeenLastCalledWith(post);
    expect(mockStatusFn).toHaveBeenCalledTimes(1);
    expect(mockStatusFn).toHaveBeenLastCalledWith(200);
    expect(mockJsonFn).toHaveBeenCalledTimes(1);
    expect(mockJsonFn).toHaveBeenLastCalledWith(newPost);
    expect(logger.error).not.toHaveBeenCalled();
    expect(mockEndFn).not.toHaveBeenCalled();
  });

  test('calling with an error', async () => {
    const post = { title: 'title' };
    const mockJsonFn = jest.fn();
    const mockEndFn = jest.fn();
    const mockStatusFn = jest.fn().mockReturnValue({ json: mockJsonFn, end: mockEndFn });
    const mockReq = { body: { post } };
    const mockRes = { status: mockStatusFn };
    const error = new Error('err');
    addNewPost.mockImplementationOnce(() => { throw error; });

    await handler(mockReq, mockRes);

    expect(addNewPost).toHaveBeenCalledTimes(1);
    expect(addNewPost).toHaveBeenLastCalledWith(post);
    expect(mockStatusFn).toHaveBeenCalledTimes(1);
    expect(mockStatusFn).toHaveBeenLastCalledWith(500);
    expect(mockEndFn).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenLastCalledWith('AddNewPost', error);
    expect(mockJsonFn).not.toHaveBeenCalled();
  });
});
