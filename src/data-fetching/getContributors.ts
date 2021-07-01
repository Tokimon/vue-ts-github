// import { request } from "@octokit/request";
import type { ContributorEntry, GithubContributor } from '~/types';

import request, { RequestFunction } from '~/data-fetching/request';
import * as contributorCache from '~/store/contributorCache';



export type getContributorsFunction = (fullRepoName: string, per_page: number) => Promise<ContributorEntry[]>;



export function createGetContributors(request: RequestFunction): getContributorsFunction {
  return async function getContributors(fullRepoName, per_page = 30) {
    const result = await request<GithubContributor[]>(`/repos/${fullRepoName}/contributors`, {
      sort: 'contributions',
      order: 'desc',
      per_page
    });

    const contributors: ContributorEntry[] = result
      .map(({ name, login, id, avatar_url, html_url, contributions }) => ({
        login,
        name,
        id,
        avatar: avatar_url,
        github: html_url,
        contributions
      }));

    contributorCache.addContributors(fullRepoName, contributors);
  
    return contributors;
  }
}

export default createGetContributors(request);