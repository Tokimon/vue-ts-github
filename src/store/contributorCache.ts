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


export function updateContributorRepoMapping(repoName: string, contributorLogin: string) {
  let repoContributors = _ContributorRepoMapping[repoName];

  if (!repoContributors) {
    repoContributors = _ContributorRepoMapping[repoName] = new Set();
  }

  repoContributors.add(contributorLogin);
}

export function storeContributor(contributor: Contributor) {
  const { login } = contributor;

  if (!_ContributorCache[login]) {
    _ContributorCache[login] = contributor;
  }

  return _ContributorCache[login];
}

export const getContributor = (username: string) => _ContributorCache[username];

export function addContributor(repoName: string, contributor: ContributorEntry) {
  storeContributor(contributor as Contributor);
  updateContributorRepoMapping(repoName, contributor.login);
}

export function addContributors(repoName: string, contributors: ContributorEntry[]) {
  contributors.forEach(addContributor.bind(null, repoName));
}

export async function completeContributor(username: string): Promise<Contributor> {
  const currentContributor = _ContributorCache[username];

  if ('email' in currentContributor) { return currentContributor; }

  const user = await requestUser(username);
  
  const contributor: Contributor = _ContributorCache[username] = Object.assign({}, currentContributor, user);
  return contributor;
}
