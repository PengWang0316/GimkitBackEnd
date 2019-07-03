import handler from '../../src/controllers/FetchPostCount';
import logger from '../../src/utils/Logger';
import { fetchPostCount } from '../../src/models/Post';

jest.mock('../../src/utils/Logger', () => ({ error: jest.fn() }));
jest.mock('../../src/models/Post', () => ({ fetchPostCount: jest.fn() }));

describe('FetchPostController', () => {
  beforeEach(() => jest.clearAllMocks());

  test('calling without error', async () => {
    const mockEndFn = jest.fn();
    const mockJsonFn = jest.fn();
    const mockStatusFn = jest.fn().mockReturnValue({ json: mockJsonFn, end: mockEndFn });
    const mockReq = {};
    const mockRes = { status: mockStatusFn };
    const count = 1;

    fetchPostCount.mockReturnValueOnce(count);

    await handler(mockReq, mockRes);

    expect(fetchPostCount).toHaveBeenCalledTimes(1);
    expect(mockStatusFn).toHaveBeenCalledTimes(1);
    expect(mockStatusFn).toHaveBeenLastCalledWith(200);
    expect(mockJsonFn).toHaveBeenCalledTimes(1);
    expect(mockJsonFn).toHaveBeenLastCalledWith(count);
    expect(logger.error).not.toHaveBeenCalled();
    expect(mockEndFn).not.toHaveBeenCalled();
  });

  test('calling with an error', async () => {
    const mockEndFn = jest.fn();
    const mockJsonFn = jest.fn();
    const mockStatusFn = jest.fn().mockReturnValue({ json: mockJsonFn, end: mockEndFn });
    const mockReq = {};
    const mockRes = { status: mockStatusFn };

    const error = new Error('err');
    fetchPostCount.mockImplementationOnce(() => { throw error; });

    await handler(mockReq, mockRes);

    expect(fetchPostCount).toHaveBeenCalledTimes(1);
    expect(mockStatusFn).toHaveBeenCalledTimes(1);
    expect(mockStatusFn).toHaveBeenLastCalledWith(500);
    expect(mockJsonFn).not.toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenLastCalledWith('FetchPostCount', error);
    expect(mockEndFn).toHaveBeenCalledTimes(1);
  });
});
