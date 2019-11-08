import Discord, { Client, Message } from "discord.js";
import { Under } from "../main";
import { db as commands } from "../Databases/Commands";
import { db as botdb } from "../Databases/Cooldowns";

export function runEvent(Client: Client, message: Message) {
  let msgContent = message.content;
  const botPrefix = Under.getPrefix();
  const regexPrefix = new RegExp(
    `^((<@(${Client.user.id}+)> ){1}|(${botPrefix}){1})`
  );

  const foundPrefix = regexPrefix.exec(msgContent);

  if (!foundPrefix) return;

  msgContent = msgContent.split(foundPrefix[0]).join("");

  let args = msgContent.split(/ +/);
  let command = args.shift().toLowerCase();

  let foundCommand = false;

  commands.get("commands").forEach(cmd => {
    if (cmd.aliases.includes(command)) {
      foundCommand = true;

      //TODO: Handle options

      if (cmd.cooldown) {
        let getCooldown = botdb
          .prepare(`SELECT ${cmd.name} from cooldowns where id=?`)
          .get(message.author.id);

        if (!getCooldown) cmd.run(Client, message, args);
      }
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
