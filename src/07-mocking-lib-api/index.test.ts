import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const pathRelative = '/posts';
  const expectUrl = 'https://jsonplaceholder.typicode.com';

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const axiosSpyOn = jest.spyOn(axios, 'create');
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: null });

    await throttledGetDataFromApi(pathRelative);

    expect(axiosSpyOn).toHaveBeenCalledWith({ baseURL: expectUrl });
  });

  test('should perform request to correct provided url', async () => {
    const responseData = { data: null };
    const axiosGetSpyOn = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValueOnce(responseData);

    await throttledGetDataFromApi(pathRelative);

    jest.runOnlyPendingTimers();

    expect(axiosGetSpyOn).toHaveBeenCalledWith(pathRelative);
  });

  test('should return response data', async () => {
    const expectId = 1;
    const responseData = [{ id: expectId }];
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: responseData });

    const result = await throttledGetDataFromApi('/posts');

    expect(result[0].id).toEqual(expectId);
  });
});
