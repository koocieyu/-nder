import Discord from "discord.js";
import filesystem from "fs";

export default class {
  constructor(options) {
    this.options = options;
    this.BotClient = new Discord.Client();

    if (!options) throw new Error("No configuration provided for the bot!");
    if (!options.token)
      throw new Error("No token was provided for the bot to start!");
  }

  Client() {
    return this.BotClient;
  }

  start() {
    loadEvents(this.Client());
    this.Client().login(this.options.token);
  }
}

function loadEvents(Client) {
  filesystem.readdir("./Events/", (error, eventFiles) => {
    if (error) throw new Error(error);
    if (eventFiles.length == 0)
      throw new Error("There are no events in the events folder!");

    eventFiles.forEach(eventFile => {
      const event = require(`../Events/${eventFile}`);
      const eventFileParts = eventFile.split(".");
      const eventName = eventFileParts[0];

      if (eventFileParts.length < 2 || eventFileParts[1] != "js")
        throw new Error("Unknown type of file in events folder");

      Client.on(eventName, (...args) => event.runEvent(Client, ...args));
    });
  });
}
