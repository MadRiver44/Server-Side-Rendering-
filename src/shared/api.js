import fetch from 'isomorphic-fetch'

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI
// a URI is a more broad definition of a URL

export function fetchPopularRepos(language = 'all') {
  const encodedURI = encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`,
  )

  return fetch(encodedURI)
    .then(data => data.json())
    .then(repos => repos.items)
    .catch(error => {
      console.warn(error)
      return null
    })
}
