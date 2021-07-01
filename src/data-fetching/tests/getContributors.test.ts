import { GithubContributor, ContributorEntry } from '~/types';
import * as contributorCache from '~/store/contributorCache';

import { createGetContributors, getContributorsFunction } from '../getContributors';



const githubResult: GithubContributor[] = [
  {
    "login": "bpasero",
    "id": 900690,
    "avatar_url": "https://avatars.githubusercontent.com/u/900690?v=4",
    "html_url": "https://github.com/bpasero"
  },
  {
    "login": "jrieken",
    "id": 1794099,
    "avatar_url": "https://avatars.githubusercontent.com/u/1794099?v=4",
    "html_url": "https://github.com/jrieken",
  },
  {
    "login": "joaomoreno",
    "id": 22350,
    "avatar_url": "https://avatars.githubusercontent.com/u/22350?v=4",
    "html_url": "https://github.com/joaomoreno",
  }
];

const mappedResult: ContributorEntry[] = [
  {
    "login": "bpasero",
    "id": 900690,
    "avatar": "https://avatars.githubusercontent.com/u/900690?v=4",
    "github": "https://github.com/bpasero"
  },
  {
    "login": "jrieken",
    "id": 1794099,
    "avatar": "https://avatars.githubusercontent.com/u/1794099?v=4",
    "github": "https://github.com/jrieken",
  },
  {
    "login": "joaomoreno",
    "id": 22350,
    "avatar": "https://avatars.githubusercontent.com/u/22350?v=4",
    "github": "https://github.com/joaomoreno",
  }
];



describe('data-fetching/getContributors', () => {
  let getContributors: getContributorsFunction;
  let fakeRequest: jest.Mock<Promise<any>>;

  const repo = 'some/repository';

  beforeAll(() => {
    fakeRequest = jest.fn().mockReturnValue(Promise.resolve(githubResult));
    getContributors = createGetContributors(fakeRequest);
  });

  beforeEach(() => {
    fakeRequest.mockClear();
  })

  it('Retrieves the contributors from the given repository', async () => {
    const result = await getContributors(repo);
    expect(result).toEqual(mappedResult);
  });

  it('Takes into account the maximum entry count', async () => {
    await getContributors(repo, 10);

    expect(fakeRequest).toHaveBeenCalledWith(
      `/repos/${repo}/contributors`,
      expect.objectContaining({ per_page: 10 })
    );
  });
  
  it('Stores contributors in cache', async () => {
    const cacheSpy = jest.spyOn(contributorCache, 'addContributors');

    await getContributors(repo, 10);

    expect(cacheSpy).toHaveBeenCalledWith(repo, mappedResult);

    cacheSpy.mockRestore();
  });
});