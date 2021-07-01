// import { request } from "@octokit/request";
import type { ContributorEntry, GithubContributor } from '~/types';

import request, { RequestFunction } from '~/data-fetching/request';
import * as contributorCache from '~/store/contributorCache';



export type getContributorsFunction = (fullRepoName: string, per_page?: number) => Promise<ContributorEntry[]>;


/**
 * A `getContributor` factory. Mainly here to help with testing so we don't have to mock the HTTP calls,
 * but only the function that is tasked with fetching the data.
 * 
 * @param request - The function to fetch the data.
 */
export function createGetContributors(request: RequestFunction): getContributorsFunction {
  /**
   * Requests contributors for a given repository, stores the contributors in memory for easy access
   * and returns the contributor list.
   * 
   * @param fullRepoName - The full name of the repository (owner/repo - eg. microsoft/vscode).
   * @param per_page - The number of results to fetch per page
   */
  return async function getContributors(fullRepoName, per_page = 30) {
    const result = await request<GithubContributor[]>(
      `/repos/${fullRepoName}/contributors`,
      {
        sort: 'contributions',
        order: 'desc',
        per_page
      }
    );

    const contributors: ContributorEntry[] = result
      .map(({ login, id, avatar_url, html_url }) => ({
        login,
        id,
        avatar: avatar_url,
        github: html_url
      }));

    contributorCache.addContributors(fullRepoName, contributors);
  
    return contributors;
  }
}

export default createGetContributors(request);