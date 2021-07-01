import { Contributor } from '~/types';

import {
  ContributorCache,
  CompleteContributorFunction,
  _ContributorCache,
  _ContributorRepoMapping,

  updateContributorRepoMapping,
  storeContributor,
  getContributor,
  getRepositoryContributors,
  addContributor,
  addContributors,
  createCompleteContributor
} from '../contributorCache';



function emptyObject(obj: Record<string, unknown>) {
  Object.keys(obj).forEach(key => {
    delete obj[key];
  });
}

describe('store/contributorCache', () => {
  afterEach(() => {
    emptyObject(_ContributorCache);
    emptyObject(_ContributorRepoMapping);
  });

  const repo = 'tokimon/awesome-repo';
  const login = 'tokimon';
  const contributor: Contributor = {
    id: 42,
    login,
    avatar: 'https://avatars.githubusercontent.com/u/367237',
    github: 'https://github.com/Tokimon/'
  }

  describe('.updateContributorRepoMapping', () => {
    it('Creates the entry from the given name', () => {
      updateContributorRepoMapping(repo, login);
      expect(_ContributorRepoMapping).toHaveProperty(repo);
    });

    it('Adds the username to the collection for the given repository', () => {
      updateContributorRepoMapping(repo, login);
      expect(_ContributorRepoMapping[repo].has(login)).toBe(true);
    });
  });

  describe('.storeContributor', () => {
    it('Creates the entry from the "login" property of the given contributor', () => {
      storeContributor(contributor);
      expect(_ContributorCache).toHaveProperty(login);
    });

    it('Does not override the given contributor if it already exists', () => {
      const updatedContributor = { ...contributor, name: 'John Doe' };
      
      storeContributor(contributor);
      storeContributor(updatedContributor);

      expect(_ContributorCache[login]).toEqual(contributor);
    });
  });

  describe('.getContributor', () => {
    it('Returns the contributor stored under the given name', () => {
      _ContributorCache[login] = contributor;
      expect(getContributor(login)).toBe(contributor);
    });

    it('Returns "undefined" when nothing is stored under the given name', () => {
      expect(getContributor(login)).toBe(undefined);
    });
  });

  describe('.getRepositoryContributors', () => {
    it('Returns the contributor logins stored under the given repository name', () => {
      updateContributorRepoMapping(repo, login);
      expect(getRepositoryContributors(repo)).toEqual(new Set([login]));
    });

    it('Returns "undefined" when nothing is stored under the given repository name', () => {
      expect(getRepositoryContributors(repo)).toBe(undefined);
    });
  });

  describe('.addContributor', () => {
    it('Adds the given contributor to the cache', () => {
      addContributor(repo, contributor);
      expect(getContributor(contributor.login)).toEqual(contributor);
    });

    it('Adds the contributor login to list for the given repository', () => {
      addContributor(repo, contributor);
      expect(getRepositoryContributors(repo)).toEqual(new Set([login]));
    });
  });

  describe('.addContributors', () => {
    const contributors = [
      contributor,
      { ...contributor, login: 'jenny' },
      { ...contributor, login: 'fisk' },
      { ...contributor, login: 'båthorn' }
    ];

    const logins = Object.values(contributors).map(({ login }) => login);

    const cache = logins.reduce((obj, login, i) => {
      obj[login] = contributors[i];
      return obj;
    }, {} as ContributorCache)

    it('Adds all contributors to the cache', () => {
      addContributors(repo, contributors);
      expect(_ContributorCache).toEqual(cache);
    });

    it('Adds the contributor login to list for the given repository', () => {
      addContributors(repo, contributors);
      expect(_ContributorRepoMapping[repo]).toEqual(new Set(logins));
    });
  });

  describe('.completeContributor', () => {
    let fakeGetUser: jest.Mock<Promise<Contributor>>;
    let completeContributor: CompleteContributorFunction;

    const contributorFull: Contributor = {
      ...contributor,
      name: 'Toke Voltelen',
      company: 'Malt',
      email: 'tvoltelen@malt.com',
      location: 'Lyon, France',
      blog: 'https://medium.com',
      followers: 12345678,
      hireable: true
    };

    beforeAll(() => {
      fakeGetUser = jest.fn().mockReturnValue(Promise.resolve(contributorFull));
      completeContributor = createCompleteContributor(fakeGetUser);
    });

    beforeEach(() => {
      fakeGetUser.mockClear();
    });

    it('"getUser" is not called when the contributor data is already complete', async () => {
      storeContributor(contributorFull);
      await completeContributor(login);
      expect(fakeGetUser).not.toHaveBeenCalled();
    });

    describe('When contributor is incomplete', () => {
      it('"getUser" is called with the given user name', async () => {
        storeContributor(contributor);
        await completeContributor(login);
        expect(fakeGetUser).toHaveBeenCalledWith(login);
      });

      it('Returns the completed contributor', async () => {
        storeContributor(contributor);
        const result = await completeContributor(login);
        expect(result).toEqual(contributorFull);
      });
  
      it('When contributor is missing, it is completed anyway', async () => {
        const result = await completeContributor(login);
        expect(result).toEqual(contributorFull);
      });
    });

  });
});