const cheerio = require('cheerio');
const request = require('request');

request('https://twitter.com/pubg_help', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    const parsedResults = [];

    //console.log('Test Stepper ==> \n', $('ol.stream-items').children('.js-stream-item'));
    //console.log($('ol.stream-items').children('.js-stream-item').children('.tweet').children('.content').children('.js-tweet-text-container').children('p.TweetTextSize').text())
    $('ol.stream-items').children('.js-stream-item').each((i, element) => {
      let tweetText = $(element).children('.tweet').children('.content').children('.js-tweet-text-container').children('p.TweetTextSize').text();

      //let timeStamp = $(this).children('.stream-item-header')//.children('small.time').children('.tweet-timestamp').text();
      //let tweetText = $(this).children('.js-stream-item').children('.tweet').children('.content').children('.js-tweet-text-container').children('p.TweetTextSize').text();

      let metaData = {
        post: i+1,
        text: tweetText
      };
      console.log(metaData);
      //parsedResults.push(metaData)
      //console.log(array);
    });
  };
  //console.log(parsedResults)
});

getBuiltInLa: (req, res, next) => {
  return new Promise((resolve, reject) => {
    request('https://www.builtinla.com/events', (err, res, html) => {
      if (err) {
        reject(err);
      }

      const $ = cheerio.load(html);
      const array = []
      $('.container').each((i, e) => {
        array[i] = {}
        array[i]['name'] = $(e).find('.title').text()
        array[i]['organized_by'] = $(e).find('.organized-by').text()
        array[i]['date'] = $(e).find('.date').text().replace(/(^.{3})(\w+)/, '$1 $2')
        array[i]['city'] = 'Los Angeles'
      })

      resolve(array.slice(1))
    })
  })
}