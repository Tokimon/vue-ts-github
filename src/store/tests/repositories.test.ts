import { RepositoryEntry } from '~/types';

import {
  LoadRepositoriesFunction,
  repositoryStore,
  setMaxRepositories,
  setCurrentRepository,
  setRepositories,
  isLoading,
  loadRepositories,
  createLoadRepositories
} from '../repositories';

describe('store/topic', () => {
  const repositories: RepositoryEntry[] = [
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

  describe('.setMaxRepositories', () => {
    it('Sets the "max" value', () => {
      setMaxRepositories(20);
      expect(repositoryStore.max).toBe(20);
    });
  });

  describe('.setCurrentRepository', () => {
    it('Sets the "current" value', () => {
      setCurrentRepository('some/repo');
      expect(repositoryStore.current).toBe('some/repo');
    });
  });

  describe('.setRepositories', () => {
    it('Sets the "repositories" to the given list', () => {
      setRepositories(repositories);
      expect(repositoryStore.repositories).toEqual(repositories);
    });
  });

  describe('.isLoading', () => {
    it('Sets the "loading" value', () => {
      isLoading(true);
      expect(repositoryStore.loading).toBe(true);
    });
  });

  describe('.loadRepositories', () => {
    let fakeGetRepositories: jest.Mock<Promise<RepositoryEntry[]>>;
    let loadRepositories: LoadRepositoriesFunction;
    const topic = 'typescript';

    beforeAll(() => {
      fakeGetRepositories = jest.fn().mockReturnValue(Promise.resolve(repositories));
      loadRepositories = createLoadRepositories(fakeGetRepositories);
    });

    beforeEach(() => {
      fakeGetRepositories.mockClear();
      setRepositories([]);
      isLoading(false);
    });

    it('Set loading to "true"', () => {
      loadRepositories(topic);
      expect(repositoryStore.loading).toBe(true);
    });

    it('Set the repositories to the result of the "getRepositories"', async () => {
      await loadRepositories(topic);
      expect(repositoryStore.repositories).toEqual(repositories);
    });
    
    it('Set loading to "false", once done', async () => {
      await loadRepositories(topic);
      expect(repositoryStore.loading).toBe(false);
    });
  });
});