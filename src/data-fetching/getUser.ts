// import { request } from "@octokit/request";

import request, { RequestFunction } from '~/data-fetching/request';
import { GithubUser, Contributor } from "~/types";



export type getUserFunction = (username: string) => Promise<Contributor>;


/**
 * A `getUser` factory. Mainly here to help with testing so we don't have to mock the HTTP calls,
 * but only the function that is tasked with fetching the data.
 * 
 * @param request - The function to fetch the data.
 */
export function createGetUser(request: RequestFunction): getUserFunction {
  /**
   * Get the user data for the given user name from Github, and returns the data correctly formatted.
   * 
   * @param username - The contributor user name
   */
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
      hireable,
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

export default createGetUser(request)