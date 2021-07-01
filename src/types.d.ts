export interface ContributorEntry {
  id: number;
  login: string;
  avatar: string;
  github: string;
}

export interface Contributor extends ContributorEntry {
  name?: string | null;
  company?: string | null;
  email?: string | null;
  location?: string | null;
  blog?: string | null;
  followers?: number;
  hireable?: boolean;
}

export type ContributorItem = ContributorEntry | Contributor;

export interface RepositoryEntry {
  id: number;
  github: string;
  name: string;
  fullName: string;
  avatar: string;
  stars: number;
  contributors?: ContributorEntry[];
}

export interface GithubUser {
  id: number;
  login: string;
  name: string | null;
  company: string | null;
  email: string | null;
  location: string | null;
  followers: number;
  avatar_url: string;
  html_url: string;
  hireable: boolean | null;
  blog: string | null
}

export interface GithubContributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface GithubRepository {
  id: number;
  html_url: string;
  name: string;
  full_name: string;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  }
}
