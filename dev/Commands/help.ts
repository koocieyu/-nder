import Discord from "discord.js";

export const options = {
  name: "help",
  description: "Helps you get around this bot",
  category: "Useful",
  aliases: ["help", "halp", "hmm"],
  cooldown: 10,
  ownerOnly: true,
  usages: [
    {
      description: "",
      example: ""
    }
  ],

  run: (Client, message, args) => {
    message.reply("ai dat help fra");
  }
};
