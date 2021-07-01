import { Contributor } from '~/types';

import {
  LoadContributorsFunction,
  contributorStore,
  setMaxContributors,
  setCurrentContributor,
  setContributors,
  isLoading,
  loadContributors,
  createLoadContributors
} from '../contributors';

describe('store/topic', () => {
  const contributors: Contributor[] = [
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

  const usernames = contributors.map((c) => c.login);

  describe('.setMaxContributors', () => {
    it('Sets the "max" value', () => {
      setMaxContributors(20);
      expect(contributorStore.max).toBe(20);
    });
  });

  describe('.setCurrentContributor', () => {
    it('Sets the "current" value', () => {
      setCurrentContributor('tokimon');
      expect(contributorStore.current).toBe('tokimon');
    });
  });

  describe('.setContributors', () => {
    it('Sets the "contributors" to the given username list', () => {
      setContributors(usernames);
      expect(contributorStore.contributors).toEqual(usernames);
    });
  });

  describe('.isLoading', () => {
    it('Sets the "loading" value', () => {
      isLoading(true);
      expect(contributorStore.loading).toBe(true);
    });
  });

  describe('.loadContributors', () => {
    let fakeGetContributors: jest.Mock<Promise<Contributor[]>>;
    let loadContributors: LoadContributorsFunction;
    const repo = 'microsoft/vscode';

    beforeAll(() => {
      fakeGetContributors = jest.fn().mockReturnValue(Promise.resolve(contributors));
      loadContributors = createLoadContributors(fakeGetContributors);
    });

    beforeEach(() => {
      fakeGetContributors.mockClear();
      setContributors([]);
      isLoading(false);
    });

    it('Set loading to "true"', () => {
      loadContributors(repo);
      expect(contributorStore.loading).toBe(true);
    });

    it('Set the contributors to the login values of the retrieved contributors', async () => {
      await loadContributors(repo);
      expect(contributorStore.contributors).toEqual(usernames);
    });
    
    it('Set loading to "false", once done', async () => {
      await loadContributors(repo);
      expect(contributorStore.loading).toBe(false);
    });
  });
});