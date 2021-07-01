import { createRequest, RequestFunction, urlParams } from '../request';




describe('data-fetching/request', () => {
  describe('.urlParams', () => {
    it('Returns an empty string when no parameters are given', () => {
      expect(urlParams()).toBe('');
    });

    it('Returns an empty string when given parameter object is empty', () => {
      expect(urlParams({})).toBe('');
    })

    describe('Returns on object as a URL string', () => {
      it('With one property', () => {
        expect(urlParams({ q:'test' })).toBe('?q=test');
      });

      it('With multiple properties', () => {
        expect(urlParams({ q:'test', stars: 10 })).toBe('?q=test&stars=10');
      });
    });
  });

  describe('.request', () => {
    let request: RequestFunction;
    let fakeFetch: jest.Mock<Promise<any>>;

    const githubResult = {
      name: 'Toke Voltelen',
      login: 'tokimon',
      avatar: "https://avatars.githubusercontent.com/u/367237?v=4"
    };

    const path = '/some/path';
    const apiUrl = 'https://api.github.com';
  
    beforeAll(() => {
      const result = { json: () => githubResult }
      fakeFetch = jest.fn().mockReturnValue(Promise.resolve(result));
      request = createRequest(fakeFetch);
    });
  
    beforeEach(() => {
      fakeFetch.mockClear();
    })
  
    it('Fetches the result from the Github API with the given path', async () => {
      const result = await request(path);
      expect(result).toBe(githubResult);
    });

    it('Fetches the result using the given path', async () => {
      await request(path);
      expect(fakeFetch).toHaveBeenCalledWith(apiUrl + path);
    });
  
    it('Fetches the result using the given path and parameters', async () => {
      await request(path, { q:'test', stars: 10 });
      expect(fakeFetch).toHaveBeenCalledWith(apiUrl + path + '?q=test&stars=10');
    });
  });
});