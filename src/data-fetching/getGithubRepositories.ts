import type { RepositoryEntry, ContributorEntry } from '~/types';

import getContributors from '~/data-fetching/getContributor';
import getRepositories from '~/data-fetching/getRepositories';



interface SearchGithubSettings {
  maxRepos: number;
  maxContributors: number;
}

interface createGetGithubRepositoriesOptions {
  getRepositories: typeof getRepositories;
  getContributors: typeof getContributors;
}



export function createGetGithubRepositories(getRepositories, getContributors }: createGetGithubRepositoriesOptions) {
  return async function getGithubRepositories(topic: string, { maxRepos, maxContributors }: SearchGithubSettings) {
    const repositories = await getRepositories(topic, maxRepos);
  
    const newRepos = await Promise.all(
      repositories.map(async (repo): Promise<RepositoryEntry> => {
        const { html_url, name, full_name, stargazers_count, owner, id } = repo;
        const contributors = await getContributors(name, owner.login, maxContributors);
  
        return {
          id,
          github: html_url,
          name: full_name,
          avatar: owner.avatar_url,
          stars: stargazers_count,
          contributors: contributors
            .map(({ name, login, id, avatar_url, html_url, contributions }): ContributorEntry => ({
              login,
              name,
              id,
              avatar: avatar_url,
              github: html_url,
              contributions
            }))
        };
      })
    );
  
    return newRepos;
  };
}


export default createGetGithubRepositories({ getRepositories, getContributors });
