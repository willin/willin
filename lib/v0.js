const axios = require('axios');

module.exports = () =>
  axios
    .get('https://v0.chat/_nuxt/api/info.json')
    .then(({ data: { posts: postcount = 0, wordcount = 0 } = {} }) =>
      axios.get('https://v0.chat/_nuxt/api/archives.json').then(({ data: { posts } = {} }) => ({
        postcount,
        wordcount,
        posts
      }))
    )
    .catch(() => ({
      postcount: 0,
      wordcount: 0,
      posts: 0
    }));
