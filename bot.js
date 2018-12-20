const Discord = require('discord.js');
const bot = new Discord.Client();
const auth = require('./auth.json');
const prefix = '_';
const { buildDDEmbed, buildTwitterEmbed } = require('./util/embedUtility.js');

bot.on('ready', (e) => {
  console.log(`Logged in as ${bot.user.tag}!`)
});

bot.on('message', async message => {
  
  // Ignore bots and messages that don't start with prefix
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // Our standard argument/command name definition.
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