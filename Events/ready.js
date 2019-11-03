import Discord from "discord.js";
import filesystem from "fs";

/**
 * @param {Discord.Client} Client
 */
export function runEvent(Client) {
  filesystem.readdir("./Databases/", (error, files) => {
    if (error) throw new Error(error);

    files.forEach(file => {
      const { load } = require(`../Databases/${file}`);

      load();
    });
  });
  console.log(Client.guilds.size);
}
