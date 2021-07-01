import { reactive } from 'vue';

import type { RepositoryEntry } from '~/types';

import getRepositories from '~/data-fetching/getRepositories';



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
 * Requests repositories from Github from the given topic and updates the state with the new list of repositories
 * 
 * @param repoName - The full name of the repository (owner/repo - eg. microsoft/vscode).
 */
export async function loadRepositories(topic: string) {
  isLoading(true);
  const repositories = await getRepositories(topic, repositoryStore.max);
  setRepositories(repositories);
  isLoading(false);
}
