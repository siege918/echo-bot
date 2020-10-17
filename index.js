const Discord = require("discord.js");
const { existsSync, readFileSync } = require("fs");
const client = new Discord.Client();

const {
    ECHO_LISTEN_CHANNEL_IDS,
    ECHO_LISTEN_REGEX,
    ECHO_ECHO_CHANNEL_ID,
    ECHO_TOKEN,
    ECHO_MENTION_ROLE_ID,
    ECHO_CHANNELS_CONFIG,
} = process.env;

var channelConfigs = [];

if (!ECHO_CHANNELS_CONFIG) {
    const regex = new RegExp(ECHO_LISTEN_REGEX);
    const listenChannels = ECHO_LISTEN_CHANNEL_IDS.split(/,\s?/);

    channelConfigs.push({
        regex,
        listenChannels,
        echoChannel: ECHO_ECHO_CHANNEL_ID,
        mentionRole: ECHO_MENTION_ROLE_ID,
    });
} else {
    if (!existsSync(ECHO_CHANNELS_CONFIG)) {
        throw "Specified config file does not exist";
    }

    const readChannelConfigs = JSON.parse(
        readFileSync(ECHO_CHANNELS_CONFIG, "utf8")
    );

    channelConfigs = readChannelConfigs.map((val) => {
        return {
            ...val,
            regex: new RegExp(val.regex),
        };
    });
}

const tryEcho = (message, echoConfig) => {
    try {
        if (!echoConfig.listenChannels.includes(message.channel.id)) {
            return;
        }

        if (!message.content) {
            return;
        }

        if (!echoConfig.regex.test(message.content)) {
            return;
        }

        const echoChannel = client.channels.get(echoConfig.echoChannel);

        if (echoConfig.mentionRole) {
            echoChannel.send(
                `Echoing for <@&${echoConfig.mentionRole}>: ${message.content}`
            );
        } else {
            echoChannel.send(`Echoing: ${message.content}`);
        }
    } catch (e) {}
};

client.on("ready", () => {
    console.log("Connected.");
    const echoChannel = client.channels.get(ECHO_ECHO_CHANNEL_ID);
    const rightNow = new Date();

    echoChannel.send(
        `Echo bot online and listening for messages\nLast restart - ${rightNow.toUTCString()}`
    );
});

client.on("message", async (message) => {
    for (const echoConfig of channelConfigs) {
        tryEcho(message, echoConfig);
    }
});

client.login(ECHO_TOKEN);

process.on("SIGTERM", () => {
    client.destroy();
});
