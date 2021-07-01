import { GithubRepository, RepositoryEntry } from '~/types';

import { createGetRepositories, getRepositoriesFunction } from '../getRepositories';



const githubResult: GithubRepository[] = [
  {
    "id": 41881900,
    "html_url": "https://github.com/microsoft/vscode",
    "name": "vscode",
    "full_name": "microsoft/vscode",
    "stargazers_count": 117911,
    "owner": {
      "login": "microsoft",
      "avatar_url": "https://avatars.githubusercontent.com/u/6154722?v=4"
    }
  },
  {
    "id": 133442384,
    "html_url": "https://github.com/denoland/deno",
    "name": "deno",
    "full_name": "denoland/deno",
    "stargazers_count": 76374,
    "owner": {
      "login": "denoland",
      "avatar_url": "https://avatars.githubusercontent.com/u/42048915?v=4"
    }
  },
  {
    "id": 24195339,
    "html_url": "https://github.com/angular/angular",
    "name": "angular",
    "full_name": "angular/angular",
    "stargazers_count": 74276,
    "owner": {
      "login": "angular",
      "avatar_url": "https://avatars.githubusercontent.com/u/139426?v=4"
    }
  }
];

const mappedResult: RepositoryEntry[] = [
  {
    "id": 41881900,
    "github": "https://github.com/microsoft/vscode",
    "name": "vscode",
    "fullName": "microsoft/vscode",
    "stars": 117911,
    "avatar": "https://avatars.githubusercontent.com/u/6154722?v=4"
  },
  {
    "id": 133442384,
    "github": "https://github.com/denoland/deno",
    "name": "deno",
    "fullName": "denoland/deno",
    "stars": 76374,
    "avatar": "https://avatars.githubusercontent.com/u/42048915?v=4"
  },
  {
    "id": 24195339,
    "github": "https://github.com/angular/angular",
    "name": "angular",
    "fullName": "angular/angular",
    "stars": 74276,
    "avatar": "https://avatars.githubusercontent.com/u/139426?v=4"
  }
];



describe('data-fetching/getRepositories', () => {
  let getRepositories: getRepositoriesFunction;
  let fakeRequest: jest.Mock<Promise<any>>;

  const topic = 'typescript';

  beforeAll(() => {
    fakeRequest = jest.fn().mockReturnValue(Promise.resolve({ items: githubResult }));
    getRepositories = createGetRepositories(fakeRequest);
  });

  beforeEach(() => {
    fakeRequest.mockClear();
  })

  it('Retrieves the repositories from the given topic', async () => {
    const result = await getRepositories(topic);
    expect(result).toEqual(mappedResult);
  });

  it('Takes into account the maximum entry count', async () => {
    await getRepositories(topic, 10);

    expect(fakeRequest).toHaveBeenCalledWith(
      '/search/repositories',
      expect.objectContaining({ q: topic, per_page: 10 })
    );
  });
});