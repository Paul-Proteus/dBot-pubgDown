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

  let msg = await scraper.scrapeTwitter();

    if (command === 'down') {
      console.log(msg);
      message.channel.send(msg);
    }

});

bot.login(auth.token);