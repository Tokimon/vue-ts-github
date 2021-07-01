import type { ContributorEntry, Contributor, ContributorItem } from '~/types';

import requestUser from '~/data-fetching/getUser';



interface ContributorCache {
  [name: string]: Contributor
}

interface ContributorRepoMapping {
  [repoName: string]: Set<string>
}



const _ContributorCache: ContributorCache = {};
const _ContributorRepoMapping: ContributorRepoMapping = {};



/**
 * Adds the contributor username to the set associated with the given repository
 * 
 * @param repoName - The full name of the repository (owner/repo - eg. microsoft/vscode).
 * @param username - Username of the contributor
 */
export function updateContributorRepoMapping(repoName: string, username: string) {
  let repoContributors = _ContributorRepoMapping[repoName];

  if (!repoContributors) {
    repoContributors = _ContributorRepoMapping[repoName] = new Set();
  }

  repoContributors.add(username);
}

/**
 * Makes sure that the contributor data has been stored under the contributor user name (derived from the given data).
 * 
 * @param contributor - The contributor data
 */
export function storeContributor(contributor: Contributor) {
  const { login } = contributor;

  if (!_ContributorCache[login]) {
    _ContributorCache[login] = contributor;
  }

  return _ContributorCache[login];
}

/**
 * Returns what ever is stored under the given username
 * 
 * @param username - The contributor user name
 */
export const getContributor = (username: string) => _ContributorCache[username];

/**
 * Stores the contributor in the contributor dictionary and add its name to the contributor list of the repository
 * 
 * @param repoName - The full name of the repository (owner/repo - eg. microsoft/vscode).
 * @param contributor - The initial contributor data 
 */
export function addContributor(repoName: string, contributor: ContributorEntry) {
  storeContributor(contributor as Contributor);
  updateContributorRepoMapping(repoName, contributor.login);
}

/**
 * Stores correctly each collaborator in the given collaborator list, in memory.
 * 
 * @param repoName - The full name of the repository (owner/repo - eg. microsoft/vscode).
 * @param contributor - The collection of initial contributor data
 */
export function addContributors(repoName: string, contributors: ContributorEntry[]) {
  contributors.forEach(addContributor.bind(null, repoName));
}

/**
 * Makes sure that the contributor data has been completed with the complete user information,
 * by requesting the user data and updating the cache, if needed.
 * 
 * @param username - The contributor user name
 */
export async function completeContributor(username: string): Promise<Contributor> {
  const currentContributor = _ContributorCache[username];

  if ('email' in currentContributor) { return currentContributor; }

  const user = await requestUser(username);
  
  const contributor: Contributor = _ContributorCache[username] = Object.assign({}, currentContributor, user);
  return contributor;
}
