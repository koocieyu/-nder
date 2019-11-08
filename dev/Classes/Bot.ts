import { Client } from "discord.js";
import filesystem from "fs";

export default class {
  options: optionsI;
  botClient: Client;
  constructor(options: optionsI) {
    this.options = options;
    this.botClient = new Client();
  }

  Client(): Client {
    return this.botClient;
  }

  getPrefix(): string {
    return this.options.prefix;
  }

  start(): void {
    loadEvents(this.Client());
    this.Client().login(this.options.token);
  }
}

function loadEvents(Client: Client) {
  filesystem.readdir("./transpiled/Events/", (error, eventFiles) => {
    if (error) throw console.log(error);
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

interface optionsI {
  prefix: string;
  token: string;
  id: string;
}
