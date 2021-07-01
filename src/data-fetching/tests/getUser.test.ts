import { GithubUser, Contributor } from '~/types';

import { createGetUser, getUserFunction } from '../getUser';



const githubResult: GithubUser = {
  "login": "bpasero",
  "id": 900690,
  "avatar_url": "https://avatars.githubusercontent.com/u/900690?v=4",
  "html_url": "https://github.com/bpasero",
  "name": "Benjamin Pasero",
  "company": "Microsoft",
  "blog": "http://code.visualstudio.com",
  "location": "Zurich, Switzerland",
  "followers": 1205,
  "email": null,
  "hireable": null,
};

const mappedResult: Contributor = {
  "login": "bpasero",
  "id": 900690,
  "avatar": "https://avatars.githubusercontent.com/u/900690?v=4",
  "github": "https://github.com/bpasero",
  "name": "Benjamin Pasero",
  "company": "Microsoft",
  "blog": "http://code.visualstudio.com",
  "location": "Zurich, Switzerland",
  "followers": 1205,
  "email": null,
  "hireable": false,
};



describe('data-fetching/getUser', () => {
  let getUser: getUserFunction;
  let fakeRequest: jest.Mock<Promise<any>>;

  const user = 'tokimon';

  beforeAll(() => {
    fakeRequest = jest.fn().mockReturnValue(Promise.resolve(githubResult));
    getUser = createGetUser(fakeRequest);
  });

  beforeEach(() => {
    fakeRequest.mockClear();
  })

  it('Retrieves and formats the complete user information', async () => {
    const result = await getUser(user);
    expect(result).toEqual(mappedResult);
  });

  it('Retrieves the information for the given user', async () => {
    await getUser(user);
    expect(fakeRequest).toHaveBeenCalledWith('/users/' + user);
  });
});