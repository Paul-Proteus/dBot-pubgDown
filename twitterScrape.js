const cheerio = require('cheerio');
const request = require('request-promise');
// Just changed request to promise based library -- everything will be broken until refactored

request('https://twitter.com/pubg_help', (error, response, html) => {
  const parsedResults = [];
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      // Todo: Optimize to only scrape first 3 posts
      $('.js-stream-item').each((i, element) => {

        const tweet = $(element).children('.tweet').children('.content');

        const twitterHandle = '@PUBG_help';
        const tweetText = tweet.children('.js-tweet-text-container').children('p.TweetTextSize').text();
        const timeStamp = tweet.children('.stream-item-header').children('small.time').children('.tweet-timestamp').text();
        const twitterLogo = tweet.children('.stream-item-header').children('a.account-group').children('img.avatar').attr('src');

        // Todo: Clean up timestamp
        // isNan(timeStamp.split('')[0]) ?
        //     timeStamp = timeStamp.split('').splice(0,2).join('') :
        //     timeStamp

        const metaData = {
          post: i + 1,
          twitterHandle: twitterHandle,
          twitterLogo: twitterLogo,
          timestamp: timeStamp,
          tweetText: tweetText
        };
        parsedResults.push(metaData)
      });
    };
    return parsedResults;
  });

module.exports = {
  scrapeTwitter
};