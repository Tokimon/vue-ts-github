// import { request } from "@octokit/request";
import { GithubRepository, RepositoryEntry } from '~/types';
import request, { RequestFunction } from '~/data-fetching/request';



interface GithubRepositoryRequest {
  total_count: number;
  incomplete_results: boolean;
  items: GithubRepository[]
}

export type getRepositoriesFunction = (q: string, per_page: number) => Promise<RepositoryEntry[]>;


/**
 * A `getRepositories` factory. Mainly here to help with testing so we don't have to mock the HTTP calls,
 * but only the function that is tasked with fetching the data.
 * 
 * @param request - The function to fetch the data.
 */
export function createGetRepositories(request: RequestFunction): getRepositoriesFunction {
   /**
   * Searches repositories from a given text and returns the list in the correct format.
   * 
   * @param a - The query to search for
   * @param per_page - The number of results to fetch per page
   */
  return async function getRepositories(q, per_page = 30) {
    const result = await request<GithubRepositoryRequest>(`/search/repositories`, {
      sort: 'stars',
      order: 'desc',
      q,
      per_page,
      type: 'public'
    });
  
    return result.items.map(({ html_url, name, full_name, stargazers_count, owner, id }) => ({
      id,
      github: html_url,
      name,
      fullName: full_name,
      avatar: owner.avatar_url,
      stars: stargazers_count
    }));
  }
}

export default createGetRepositories(request);