const cheerio = require('cheerio');
const rp = require('request-promise');


const scrapeTwitter = () => {
  const options = {
    uri: 'https://twitter.com/pubg_help',
    transform: function (body) {
      return cheerio.load(body);
    }
  };

  return rp(options)
    .then($ => {
      const parsedResults = [];

      $('.js-stream-item').each((i, element) => {
        const tweet = $(element).children('.tweet').children('.content');

        const twitterHandle = '@PUBG_help';
        const tweetText = tweet.children('.js-tweet-text-container').children('p.TweetTextSize').text();
        const timeStamp = tweet.children('.stream-item-header').children('small.time').children('.tweet-timestamp').text();
        const twitterLogo = tweet.children('.stream-item-header').children('a.account-group').children('img.avatar').attr('src');

        const metaData = {
          post: i + 1,
          twitterHandle: twitterHandle,
          twitterLogo: twitterLogo,
          timestamp: timeStamp,
          tweetText: tweetText
        };
        parsedResults.push(metaData)
      })
      return parsedResults;
    })
    .catch(err => {
      console.error('Error Happened...', err);
    })
};

scrapeDownDetector = () => {
  const options = {
    uri: 'https://downdetector.com/status/playbattlegrounds',
    transform: function (body) {
      return cheerio.load(body);
    }
  };

  return rp(options)
    .then($ => {
      return $('.alert').text();
    })
    .catch(err => {
      console.error('Error Happened...', err);
    })

};

module.exports = {
  scrapeTwitter,
  scrapeDownDetector
};