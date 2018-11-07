const cheerio = require('cheerio');
const request = require('request');

request('https://twitter.com/pubg_help', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    //const b = $(this)  
    const twitterHandle = '@PUBG_help';
    const timeStamp = $('div.content').children('.stream-item-header').children('small.time').children('.tweet-timestamp').text()
    const tweetText = $('div.content').children('.js-tweet-text-container').children('p').text();
    console.log(timeStamp);

    const metaData = {
      twitterHandle: twitterHandle,
      text: tweetText
    }
    
  };
});

