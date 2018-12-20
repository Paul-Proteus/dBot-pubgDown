const Discord = require('discord.js');
const bot = new Discord.Client();
const auth = require('./auth.json');
const prefix = '_';
const { buildDDEmbed, buildTwitterEmbed } = require('./util/embedUtility.js');

bot.on('ready', (e) => {
  console.log(`Logged in as ${bot.user.tag}!`)
});

bot.on('message', async message => {
  
  
  // Edge case if users try to access bot via mentioning
  if (message.content.startsWith('@pubgdown') || message.content.startsWith('@pubgdown!')) {
    message.channel.send( '```My prefix is _ \n\n_check : Check if servers are down```');
  };

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
  };
  
  /**
   * Command list 
   */

  if (command === 'check') {
    await sendReport();
  };
  
  if (command === 'help' || command === 'info') {
    message.channel.send('```My prefix is _\n\nI only do one thing and I do it well...\n\n _check : Check if servers are down\n\n_help: This is the help screen (lol)``` ')
  };

});

bot.login(auth.token);