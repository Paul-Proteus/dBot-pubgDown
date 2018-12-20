const cheerio = require('cheerio');
const rp = require('request-promise');

/**
 * scrapeTwitter() has no parameters. It uses Cheerio to scrape @PUBG_help twitter posts.
 * @returns {Array} --> Array has objects created out of key information from scraped tweets
 * @example 
 * // --> [metaData1, metaData2, metaData3]
 * metaData = {
          post: 1,
          twitterHandle: '@PUBG_help',
          twitterLogo: 'https://pbs.twimg.com/profile_images/1037799759086477312/w1RbS8PC_bigger.jpg',
          timestamp: '19 hours ago',
          tweetText: 'PC Players: Live servers will enter maintenance for 4 hours at Nov 20 4:30pm PST / Nov 21 1:30am CET / Nov 21 9:30am KST'
        }
 * 
 */
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
        let timeStamp = tweet.children('.stream-item-header').children('small.time').children('.tweet-timestamp').text();
        const twitterLogo = tweet.children('.stream-item-header').children('a.account-group').children('img.avatar').attr('src');

        
        // removes the duplicate hour from the twitter timestamp
        if (timeStamp.length > 10) {
          let re = /(?:h)[\d]{1,3}/gm;
          timeStamp = timeStamp.replace(re,'');
        }
        console.log('tweet -->', tweet);

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
      console.error(err);
    })
};

/**
 * scrapeDownDetector() has no parameters. It uses Cheerio to scrape PUBG data from DownDetector.com 
 * @returns {String} --> String stating whether PUBG is down or not.
 * @example 
 *  --> "No problems at Player Unknown's Battlegrounds"
 */
scrapeDownDetector = () => {
  const options = {
    uri: 'https://downdetector.com/status/playbattlegrounds',
    transform: function (body) {
      return cheerio.load(body);
    }
  };

  return rp(options)
    .then($ => {
      const parsedResults = [];
      let re = /(?:value: )[\d]{1,3}/gm
      let data = $('script')[13].children[0].data.match(re);
      
      let errorData = data.reduce((acc,curr, i) => {
        if (i >= data.length-8) {
          curr = curr.replace(/value: /gm, '');
          curr = Number(curr);
          return acc + curr
        } else {
          return 0
        }
      });
      parsedResults.push($('.alert').text());
      parsedResults.push(errorData);

      return parsedResults;
    })
    .catch(err => {
      console.error(err);
    })

};

module.exports = {
  scrapeTwitter,
  scrapeDownDetector
};