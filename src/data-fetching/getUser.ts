// import { request } from "@octokit/request";

import request, { RequestFunction } from '~/data-fetching/request';
import { GithubUser, Contributor } from "~/types";



export type getUsersFunction = (username: string) => Promise<Contributor>;



export function createGetUsers(request: RequestFunction): getUsersFunction {
  return async function getUser(username: string) {
    const {
      id,
      login,
      name,
      company,
      email,
      location,
      followers,
      avatar_url,
      html_url,
      hireable = false,
      blog
    } = await request<GithubUser>(`/users/${username}`);

    return {
      id,
      login,
      name,
      company,
      email,
      location,
      followers,
      avatar: avatar_url,
      github: html_url,
      hireable: !!hireable,
      blog
    };
  }
}

export default createGetUsers(request)