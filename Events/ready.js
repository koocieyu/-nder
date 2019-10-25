import Discord from "discord.js";

/**
 * @param {Discord.Client} Client
 */
export function runEvent(Client) {
  console.log(Client.guilds.size);
}
