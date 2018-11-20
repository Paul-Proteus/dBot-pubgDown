const tweets = require('./util/scrapeUtility.js');

async () => {
  let msg = await scraper.scrapeTwitter();
  msg = msg[0];
  let msgStr = JSON.stringify(msg);    // await console.log(msg[0]);

}