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

/**
 * Requests contributors from Github and updates the state with the usernames of the new contributor list
 * 
 * NOTE: Only the usernames are stored since the actual user data can change even though the list doesn't.
 * By using only the usernames, we can look up the data when listing the users and not having to update the entire list every time.
 * 
 * @param repoName - The full name of the repository (owner/repo - eg. microsoft/vscode).
 */
export async function loadContributors(repoName: string) {
  isLoading(true);
  const contributors = await getContributors(repoName, contributorStore.max);
  setContributors(contributors.map((c) => c.login));
  isLoading(false);
}