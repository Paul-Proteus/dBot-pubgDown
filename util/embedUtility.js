const {
  scrapeDownDetector,
  scrapeTwitter
} = require('./scrapeUtility.js');
const Discord = require('discord.js');



const buildTwitterEmbed = () => {

  const embed = new Discord.RichEmbed()
    .setTitle("This is your title, it can hold 256 characters")
    .setAuthor("Author Name", "https://i.imgur.com/lm8s41J.png")
    /*
     * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
     */
    .setColor(0x00AE86)
    .setDescription("This is the main body of text, it can hold 2048 characters.")
    .setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
    .setImage("http://i.imgur.com/yVpymuV.png")
    .setThumbnail("http://i.imgur.com/p2qNFag.png")
    /*
     * Takes a Date object, defaults to current date.
     */
    .setTimestamp()
    .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
    .addField("This is a field title, it can hold 256 characters",
      "This is a field value, it can hold 1024 characters.")
    /*
     * Inline fields may not display as inline if the thumbnail and/or image is too big.
     */
    .addField("Inline Field", "They can also be inline.", true)
    /*
     * Blank field, useful to create some space.
     */
    .addBlankField(true)
    .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);

};

const buildDDEmbed = async () => {
  let emoji = ``;

  let ddData = await scrapeDownDetector();
  downDetectorMessage = JSON.stringify(ddData[0]).replace(/(\\n)+(\s+)/gm,'');
  downDetectorReports = ddData[1];


  const toggleEmoji = () => {
    if ( downDetectorMessage === `"No problems at Player Unknown's Battlegrounds"`) {
      emoji = ':+1:'
    } else {
      emoji = `:boom:`;
    };
  };

  toggleEmoji();


  const embed = await new Discord.RichEmbed()
    .setAuthor("DownDetector.com", "https://res-1.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1488694543/l7ztdetll1eyuj10fdof.png", "https://downdetector.com/status/playbattlegrounds")
    .setTimestamp()
    .addField(`${downDetectorMessage}`,`${emoji}`, false)
    .addField('# of reports in last 2 Hours...', `${downDetectorReports}`)


    return embed;
};

module.exports = {
  buildDDEmbed
}