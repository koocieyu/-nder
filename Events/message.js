import Discord from "discord.js";
import { Under } from "../main.js";
import { db as commands } from "../Databases/Commands";

/**
 * @param {Discord.Client} Client
 * @param {Discord.Message} message
 */
export function runEvent(Client, message) {
  let msgContent = message.content;
  const botPrefix = Under.getPrefix();
  const regexPrefix = new RegExp(
    `^((<@(${Client.user.id}+)> ){1}|(${botPrefix}){1})`
  );

  const foundPrefix = regexPrefix.exec(msgContent);

  if (!foundPrefix) return;

  msgContent = msgContent.split(foundPrefix[0]).join("");
  console.log(msgContent);

  let args = msgContent.split(/ +/);
  let command = args.shift().toLowerCase();
  console.log(command);

  let foundCommand = false;

  commands.get("commands").forEach(cmd => {
    if (cmd.aliases.includes(command)) {
      cmd.run(Client, message, args);

      foundCommand = true;

      //TODO: Handle options
    }
  });

  if (!foundCommand) {
    message.channel.send({
      embed: new Discord.RichEmbed()
        .setTitle("Got stuck?")
        .setDescription("Type in `_ help` in order to get started!")
        .setColor("#11f7a4")
    });
  }
}
