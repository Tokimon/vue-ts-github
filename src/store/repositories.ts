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

export async function loadRepositories(topic: string, max: number) {
  isLoading(true);
  const repositories = await getRepositories(topic, max);
  setRepositories(repositories);
  isLoading(false);
}
