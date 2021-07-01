import { reactive } from 'vue';

import type { RepositoryEntry } from '~/types';

import getRepositories from '~/data-fetching/getRepositories';



export type LoadRepositoriesFunction = (topic: string) => void;


export const repositoryStore = reactive({
  repositories: [] as RepositoryEntry[],
  current: '',
  loading: false,
  max: 30
})

export const setMaxRepositories = (max: number) => {
  repositoryStore.max = max;
}

export const setCurrentRepository = (fullName: string) => {
  repositoryStore.current = fullName;
}

export const setRepositories = (newRepositories: RepositoryEntry[]) => {
  repositoryStore.repositories = newRepositories;
};

export function isLoading(isCurrentlyLoading: boolean) {
  repositoryStore.loading = isCurrentlyLoading;
}

/**
 * A `loadRepositories` factory. Mainly here to help with testing so we don't have to mock the HTTP calls,
 * but only the function that is tasked with fetching the data.
 * 
 * @param requestRepositories - The function to fetch the repositories.
 */
export function createLoadRepositories(requestRepositories: typeof getRepositories): LoadRepositoriesFunction {
  /**
   * Requests repositories from Github from the given topic and updates the state with the new list of repositories
   * 
   * @param repoName - The full name of the repository (owner/repo - eg. microsoft/vscode).
   */
  return async function loadRepositories(topic) {
    isLoading(true);
    const repositories = await requestRepositories(topic, repositoryStore.max);
    setRepositories(repositories);
    isLoading(false);
  }
}


export const loadRepositories = createLoadRepositories(getRepositories);