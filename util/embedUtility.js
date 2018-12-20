const { scrapeDownDetector, scrapeTwitter } = require('./scrapeUtility.js');
const Discord = require('discord.js');
let lineColor;

/**
 *  Builds out the Twitter embed object that is presented on Discord.
 */
const buildTwitterEmbed = async () => {

  let twitterData = await scrapeTwitter();

  // Generate information object for first 3 tweets from @PUBG_help
  let tweet1 = twitterData[0]['tweetText'].slice(0,256);
  let timestamp1 = twitterData[0]['timestamp'];
  let tweet2 = twitterData[1]['tweetText'].slice(0,256);
  let timestamp2 = twitterData[1]['timestamp'];
  let tweet3 = twitterData[2]['tweetText'].slice(0,256);
  let timestamp3 = twitterData[2]['timestamp'];
  

  const twitterEmbed = new Discord.RichEmbed()
    .setAuthor("@PUBG_help", "https://pbs.twimg.com/profile_images/1037799759086477312/w1RbS8PC_bigger.jpg", "https://twitter.com/pubg_help?lang=en")
    .setColor(lineColor)
    .setFooter("PUBG DOWN! Created with love by JonnyRav3n", )
    .setTimestamp()
    .addField(timestamp1, tweet1, true)
    .addBlankField()
    .addField(timestamp2, tweet2 ,true )
    .addBlankField()
    .addField(timestamp3,tweet3, true)
    .setTimestamp()

    return twitterEmbed;
};

/**
 *  Builds out the DownDetector embed object that is presented on Discord.
 */
const buildDDEmbed = async () => {
  let emoji = ``;

  let ddData = await scrapeDownDetector();
  downDetectorMessage = JSON.stringify(ddData[0]).replace(/(\\n)+(\s+)/gm,'');
  downDetectorReports = ddData[1];

  // Colors and Emoji toggle based on server status
  const toggleEmoji = () => {
    if ( downDetectorMessage === `"No problems at Player Unknown's Battlegrounds"`) {
      emoji = 'https://www.emoji.co.uk/files/apple-emojis/smileys-people-ios/95-ok-hand-sign.png'
      lineColor = 0x00AE86;
    } else {
      emoji = `https://www.emoji.co.uk/files/apple-emojis/smileys-people-ios/92-thumbs-down-sign.png`;
      lineColor = '#ff0000' 
    };
  };

  toggleEmoji();

  const downDetectorEmbed = await new Discord.RichEmbed()
    .setAuthor("DownDetector.com", "https://res-1.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1488694543/l7ztdetll1eyuj10fdof.png", "https://downdetector.com/status/playbattlegrounds")
    .setColor(lineColor)
    .addField(`${downDetectorMessage}`,`---`, false)
    .addField('# of down reports in last 2 Hours...', `${downDetectorReports}-->(fewer than 50 is generally a good sign)`, true)
    .setThumbnail(`${emoji}`)
    return downDetectorEmbed;
};

module.exports = {
  buildDDEmbed,
  buildTwitterEmbed
}