import Discord, { RichEmbed as rich_embed } from "discord.js";
import { setCD as set_cooldown } from "../Utils/setCooldown";
import superagent from "superagent";

const cmd_messages = {
  err_fetching: err =>
    new rich_embed()
      .setColor("#FF240B")
      .setTitle("Error")
      .setDescription("```" + err + "```")
      .setFooter("Well that's unfortunate!"),

  joke: (joke_content: string, icon_url: string) =>
    new rich_embed().setColor("#ff930b").setFooter(joke_content, icon_url)
};

export const options = {
  name: "cnjoke",
  description: "Tells you a Chuck Norris joke.",
  category: "Fun",
  aliases: ["cnjoke", "chucknorris", "chucknorrisjoke"],
  cooldown: 60,
  ownerOnly: false,
  usages: [
    {
      description: "Tells you a Chuck Norris joke",
      example: "cnjoke"
    }
  ],

  run: (Client: Discord.Client, message: Discord.Message, args: string[]) => {
    superagent
      .get("https://api.chucknorris.io/jokes/random")
      .end((err, joke) => {
        if (err)
          return message.channel.send({
            embed: cmd_messages.err_fetching(err)
          });

        const joke_json = joke.body;

        return message.channel
          .send({
            embed: cmd_messages.joke(joke_json.value, joke_json.icon_url)
          })
          .then(() => set_cooldown("cnjoke", message.author.id));
      });
  }
};
