const Discord = require('discord.js');
const bot = new Discord.Client();
const auth = require('./auth.json');
const prefix = '_';
const { scrapeDownDetector, scrapeTwitter } = require('./util/scrapeUtility.js');

bot.on('ready', (e) => {
  console.log(`Logged in as ${bot.user.tag}!`)
});

bot.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  // const buildTwitterEmbed = async () => {

  // };

  // const buildDDEmbed = async () => {

  // };

  const sendErrorReport = async () => {
    //let twitter = await Scraper.twitter();
    let downDetector = await scrapeDownDetector();

    //msg = twitter[0];
    msg2 = JSON.stringify(downDetector).replace(/(\\n)+(\s+)/gm,'');
    //let msgStr = JSON.stringify(msg2);    // await console.log(msg[0]);
    await message.channel.send(msg2);
  }
  
  if (command === 'down') {
    await sendErrorReport();
    }

});

bot.login(auth.token);