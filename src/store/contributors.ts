import { reactive } from 'vue';

import getContributors from '~/data-fetching/getContributors';



export const contributorStore = reactive({
  contributors: [] as string[],
  current: '',
  loading: false,
  loadingDetails: false,
  max: 30
})


export const setMaxContributors = (max: number) => {
  contributorStore.max = max;
}

export const setCurrentContributor = (username: string) => {
  contributorStore.current = username;
}

export const setContributors = (newContributors: string[]) => {
  contributorStore.contributors = newContributors;
};

export function isLoading(isCurrentlyLoading: boolean) {
  contributorStore.loading = isCurrentlyLoading;
}

export function isLoadingDetails(isCurrentlyLoading: boolean) {
  contributorStore.loadingDetails = isCurrentlyLoading;
}

export async function loadContributors(repoName: string, max: number) {
  isLoading(true);
  const contributors = await getContributors(repoName, max);
  setContributors(contributors.map((c) => c.login));
  isLoading(false);
}