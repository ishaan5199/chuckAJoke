const Discord = require("discord.js");
const fetch = require("node-fetch");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const config = require('dotenv').config();
const token = process.env.TOKEN;

const getJoke = async () => {
    const response = await fetch(`http://api.icndb.com/jokes/random`);
    const data = await response.json();
    return data.value.joke;

}

client.on("ready", () => {
    console.log(`Logged in as : ${client.user.tag}`)
});

client.on("message", async (msg) => {
    if(msg.author.bot) return;

    /* msg.channel.send() //for no tag */

    if((msg.content).search("joke") !== -1 && (msg.content).startsWith("#")){
        cont = (msg.content).split(" ");
        const joke = await getJoke();
        const actual = cont[1] ? joke.replace("Chuck Norris", cont[1]) : joke;
        msg.reply(actual);
    }
    
}) ;

client.login(token);
