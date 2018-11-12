const Discord = require('discord.js');
const bot = new Discord.Client();
const auth = require('./auth.json');
const prefix = '_';
const scraper = require('./twitterScrape.js');

bot.on('ready', (e) => {
  console.log(`Logged in as ${bot.user.tag}!`)
});

bot.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  const sendErrorReport = async () => {
    let msg = await scraper.scrapeTwitter();
    msg = msg[0];
    let msgStr = JSON.stringify(msg);    // await console.log(msg[0]);
    await message.channel.send(msgStr);
  }
  
  if (command === 'down') {
    await sendErrorReport();
    }

});

bot.login(auth.token);