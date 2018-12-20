const Discord = require('discord.js');
const bot = new Discord.Client();
const auth = require('./auth.json');
const prefix = '_';
const { scrapeDownDetector, scrapeTwitter } = require('./util/scrapeUtility.js');
const { buildDDEmbed, buildTwitterEmbed } = require('./util/embedUtility.js');

bot.on('ready', (e) => {
  console.log(`Logged in as ${bot.user.tag}!`)
});

bot.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  const sendReport = async () => {
    ddEmbed = await buildDDEmbed();
    twitterEmbed = await buildTwitterEmbed();
    await message.channel.send(ddEmbed);
    await message.channel.send(twitterEmbed);
  }
  
  if (command === 'down') {
    await sendReport();
    }

});

bot.login(auth.token);