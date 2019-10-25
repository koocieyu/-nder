import Discord from "discord.js";

/**
 * @param {Discord.Client} Client
 * @param {Discord.Message} message
 */
export function runEvent(Client, message) {
  if (message.content == "_")
    message.channel.send({
      embed: new Discord.RichEmbed()
        .setFooter("hello I'm Ūnder! oh no not another bot")
        .addField("Guilds count", Client.guilds.size)
        .setColor("#11f7a4")
    });
}
