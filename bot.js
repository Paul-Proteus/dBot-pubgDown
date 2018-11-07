const Discord = require('discord.js');
const bot = new Discord.Client();
const auth = require('./auth.json');
const scrapeTwitter = require('scrape-twitter');
const fetch = require('node-fetch');
const prefix = '_';
const fs = require('fs');
// const file = fs.createWriteStream('/pubg-status.file');

// This was with require('discord.io')... 
  // var bot = new Discord.Client({
  //   token: auth.token,
  //   autorun: true
  // });

bot.on('ready', (e) => {
  console.log(`Logged in as ${bot.user.tag}!`)
});

bot.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  
  async function fetchTwitter() {
    let response = await fetch('https://aws.random.cat/meow');
    let data = await response.json()
    return data;
  }

  async function getPUBG() {
    console.log(file)
    //let response = await scrapeTwitter.getUserProfile('PUBG_help')
    // let data = await response.json();
    file.write(new scrapeTwitter.TimelineStream('PUBG_help'))
  }
   
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

    if (command === 'down') {
      await getPUBG();
      message.channel.send(fs.readFile('/pubg-status.file'));
    }

});

bot.login(auth.token);


    // args = args.splice(1);

    // const twitterAPICall = () => {
    // axios.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=PUBG_help&count=3')
    //   .then(response => response.json())
    //   .then(data = console.log(data))
    // };

    //   if (args === 'down'){
    //     let tweet = twitterAPICall();
    //     message.channelID.sendMessage(tweet)
    //   }


// bot.on('message', async (user,userID,channelID,message,e) => {
  
  // if (message.substring(0,1) == prefix) {
  //   let args = message.substring(1).split(/ +/);
  //   let cmd = args[0].toLowerCase();
    
  //   args = args.splice(1);
  //   switch(cmd) {
      
  //     //?ping
  //     case 'ping':
  //     bot.sendMessage({
  //       to: channelID,
  //       message: 'Pong!',
  //     });
  //     break;
  //     //?down
  //     case 'down':
  //     const { response } = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  //     const { data } =  console.log(response.json())
  //     bot.sendMessage({
  //       to: channelID,
  //       message: data
  //     });
  //     break;
  //   }
  // }
// });
