import filesystem from "fs";
import { loadAfter } from "./Cooldowns";

export const db = new Map();
export function load() {
  let commands = [];

  filesystem.readdir("./transpiled/Commands/", (error, commandsNames) => {
    if (error) throw new Error("Error while reading commands!\n" + error);
    if (commandsNames.length == 0) throw new Error("No commands found!");

    commandsNames.forEach(commandName => {
      let command = require(`../Commands/${commandName}`);
      commands.push(command.options);
    });

    db.set("commands", commands);

    loadAfter();
  });
}
