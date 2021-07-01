# Github contributor search

## A word on the final solution
So... This assignment has turned out quite different than I had imagined and no where near as slick as I wanted it to be,
due to the limitations of the Github API. The API is limited to max 10 calls per minute (30 if you use an authenticated user).
But since contributors has to be retrieved based on a repository name and since the info on contributor is not the complete user
information, you have do another call to fetch the full information. So overall you are have to fetch the data in three steps:

1. Repositories
2. Contributors from each repository
3. Full user information for each contributor

Therefore, in order to get the most active contributors from the most popular repositories of a given topic I have ended up in
a solution like so:

1. Search a topic with a free text (the `topic` endpoint was not that useful)
2. Click on a listed repository to get a list of contributors
3. Complete the information of a contributor by clicking the person
   (NOTE: green name means they are hireable)

## The better solution
In the optimal world, in order to find the most active contributors on the most popular repositories of a given topic, I would have to:

1. Get the repositories for the topic and the top contributors.
2. Deduplicate the list of contributors and filter out any bots, keeping track of the number of repositories worked on and the total collaboration score.
3. Compare contributors and give them a ranking score depending on number of repositories and total collaboration score.
4. Display a list of contributors with complete user data and a list of repositories they have worked on (from the initial search) and the score for each.

## Final notes
I did try to see if the GraphQL API was more helpful, but that didn't yield much better results. Maybe there are some GraphQL combinations that would enable you to get more precise data, that I am unfamiliar with, but couldn't immediately find a good solution. So I decided to use good old REST for the final solution.
To ease the work with typescript regarding the actual data you get from the API I wanted to use `@octokit/request`, but it kept failing in my final build, so I had to drop it and use fetch and add some simple interface types with the data that I actually used.

## Initial setup
### 1. Install
```
  npm i
```

### 2. Run tests
```
  npm t
```

### 3. Launch application
```
  npm run dev
```
## Time usage

| Task | Time spend |
|------|------------|
| **Preparation** | **2.5 h** |
| - Reading and understanding assignment | 0.5 h |
| - Setting up project (Jest, TypeScript, Vite, etc.) | 1 h |
| - Leaning the basics of VueJS | 1 h |
| - Exploring/understanding Github API | 2 h |
||
| **Building the solution** | **19 h** |
| - Build base components | 3 h |
| - Understanding VueJS reactive states (through trial and error) | 3 h |
| - Conceptualizing solution | 2 h |
| - Structuring and building final components | 5 h |
| - Adding documentation comments | 1 h |
| - Adding tests | 4 h |
| - Writing solution description | 1 h |
||
| **Total** | **21.5 h** |

## What to improve ?

Apart from the fact that the solution was exactly up the spec, for the reasons discussed above,
here are some areas that would need more attention if it were to be made production ready.

1. A deeper study on the subject of the Github API to find a way to implement the solution correctly
2. Write unit tests for the more complex Vue components
3. Add general error handling. I have currently not focused my time on this subject, as the project was already
   long enough. But error would need to be caught and treated correctly before it can go to production.
4. Have the Repository list re-render when you change the max number counters
5. Improve the functionality of the max number counters
6. Use SASS or Emotion for styling
7. Add theming (eg. dark theme)