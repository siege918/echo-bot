const Discord = require("discord.js");
const client = new Discord.Client();

const {
    ECHO_LISTEN_CHANNEL_IDS,
    ECHO_LISTEN_REGEX,
    ECHO_ECHO_CHANNEL_ID,
    ECHO_TOKEN,
    ECHO_MENTION_ROLE_ID,
} = process.env;

const regex = new RegExp(ECHO_LISTEN_REGEX);
const listenChannels = ECHO_LISTEN_CHANNEL_IDS.split(/,\s?/);

client.on("ready", () => {
    console.log("Connected.");
    const echoChannel = client.channels.get(ECHO_ECHO_CHANNEL_ID);
    const rightNow = new Date();

    echoChannel.send(
        `Echo bot online and listening for messages\nLast restart - ${rightNow.toUTCString()}`
    );
});

client.on("message", async (message) => {
    try {
        if (!listenChannels.includes(message.channel.id)) {
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
            echoChannel.send(
                `Echoing for <@&${ECHO_MENTION_ROLE_ID}>: ${message.content}`
            );
        } else {
            echoChannel.send(`Echoing: ${message.content}`);
        }
    } catch (e) {}
});

client.login(ECHO_TOKEN);

process.on("SIGTERM", () => {
    client.destroy();
});
