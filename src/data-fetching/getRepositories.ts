// import { request } from "@octokit/request";
import { GithubRepository, RepositoryEntry } from '~/types';
import request, { RequestFunction } from '~/data-fetching/request';



interface GithubRepositoryRequest {
  total_count: number;
  incomplete_results: boolean;
  items: GithubRepository[]
}

export type getRepositoriesFunction = (q: string, per_page: number) => Promise<RepositoryEntry[]>;



export function createGetRepositories(request: RequestFunction): getRepositoriesFunction {
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