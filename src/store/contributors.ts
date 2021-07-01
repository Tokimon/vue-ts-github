import { reactive } from 'vue';

import getContributors from '~/data-fetching/getContributors';



export type LoadContributorsFunction = (repoName: string) => void;



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


/**
 * A `loadContributors` factory. Mainly here to help with testing so we don't have to mock the HTTP calls,
 * but only the function that is tasked with fetching the data.
 * 
 * @param requestContributors - The function to fetch the repositories.
 */
export function createLoadContributors(requestContributors: typeof getContributors) {
  /**
   * Requests contributors from Github and updates the state with the usernames of the new contributor list
   * 
   * NOTE: Only the usernames are stored since the actual user data can change even though the list doesn't.
   * By using only the usernames, we can look up the data when listing the users and not having to update the entire list every time.
   * 
   * @param repoName - The full name of the repository (owner/repo - eg. microsoft/vscode).
   */
  return async function loadContributors(repoName: string) {
    isLoading(true);
    const contributors = await requestContributors(repoName, contributorStore.max);
    setContributors(contributors.map((c) => c.login));
    isLoading(false);
  }
}

export const loadContributors = createLoadContributors(getContributors);