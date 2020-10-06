# echo-bot

A simple bot that echoes messages from one discord channel to another discord channel.

## Building

This project runs exclusively on Docker. Once you have run a `docker build -t echo-bot .`, you will get a runnable image.

## Running

This bot needs some configuration to work properly. The required configuration is done through environment variables or a `.env` file. The format of the file as well as the required variables are included below.

```
ECHO_LISTEN_CHANNEL_IDS=channel_id1,channel_id2
ECHO_LISTEN_REGEX=regular_expression_to_filter_messages
ECHO_ECHO_CHANNEL_ID=echo_channel_id
ECHO_TOKEN=discord_token
ECHO_MENTION_ROLE_ID=a_role_id_to_mention_while_echoing
```

These variables can be set using either the `-e` flag in the `docker run` command or put in a `.env` file and be used through the `--env-file` command. For ease of use, we are going to use a `.env` file. Once these variables are set properly, run `docker run -it --env-file <path_to_dot_env_file> --name <container_name> echo-bot:latest` to start this bot up.
