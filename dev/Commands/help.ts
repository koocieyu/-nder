import Discord from "discord.js";
import { setCD } from "../Utils/setCooldown";

export const options = {
  name: "help",
  description: "Helps you get around this bot",
  category: "Useful",
  aliases: ["help", "halp", "hmm"],
  cooldown: 10,
  ownerOnly: false,
  usages: [
    {
      description: "",
      example: ""
    }
  ],

  run: (Client: Discord.Client, message: Discord.Message, args: string[]) => {
    message.reply("ai dat help fra").then(() => {
      setCD("help", message.author.id);
    });
  }
};
