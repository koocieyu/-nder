import Discord, { Client, Message, RichEmbed } from "discord.js";
import { Under } from "../main";
import { db as commands } from "../Databases/Commands";
import { db as botdb } from "../Databases/Cooldowns";
import moment from "moment";

require("dotenv").config();

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
          .prepare(
            `SELECT ${cmd.name} from cooldowns where id=${message.author.id}`
          )
          .get();

        if (getCooldown) {
          if (getCooldown[cmd.name]) {
            if (
              moment().diff(getCooldown[cmd.name], "seconds") < cmd.cooldown
            ) {
              return message.channel.send({
                embed: new RichEmbed()
                  .setFooter("This command is on cooldown!")
                  .setTitle("Command is on cooldown!")
              });
            }
          }
        } else {
          let insertUser = botdb.prepare(
            "INSERT into cooldowns (id) VALUES (?)"
          );

          insertUser.run(message.author.id);
        }
      }

      if (cmd.ownerOnly && message.author.id != process.env.OWNER_ID)
        return message.channel.send({
          embed: new RichEmbed()
            .setColor("#11f7a4")
            .setFooter(
              "This command is available only for the owner of this bot."
            )
            .setTitle("Owner only command!")
        });

      cmd.run(Client, message, args);
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
