const Discord = require("discord.js");
const client = new Discord.Client();

const {
    ECHO_LISTEN_CHANNEL_ID,
    ECHO_LISTEN_REGEX,
    ECHO_ECHO_CHANNEL_ID,
    ECHO_TOKEN,
    ECHO_MENTION_ROLE_ID
} = process.env;

const regex = new RegExp(ECHO_LISTEN_REGEX);

client.on("ready", () => {
    console.log("Connected.");
})

client.on("message", async (message) => {
    try {
        if (message.channel.id !== ECHO_LISTEN_CHANNEL_ID) {
            return;
        }

        if (!message.content) {
            return;
        }

        if (!regex.test(message.content)) {
            return;
        }

        const echoChannel = client.channels.get(ECHO_ECHO_CHANNEL_ID);

        if (ECHO_MENTION_ROLE_ID) {
            echoChannel.send(`Echoing for <@&${ECHO_MENTION_ROLE_ID}>: ${message.content}`);
        } else {
            echoChannel.send(`Echoing: ${message.content}`);
        }
    } catch (e) {

    }
});

client.login(ECHO_TOKEN);