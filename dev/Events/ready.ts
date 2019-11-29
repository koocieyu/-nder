import Discord from "discord.js";
import filesystem from "fs";

export function runEvent(Client) {
  console.log("Ready");
  filesystem.readdir("./transpiled/Databases/", (error, files) => {
    if (error) throw console.log(error);

    files.forEach(async file => {
      if (!file.endsWith(".js"))
        return console.log(file + " found in databases folder. (not .js file)");

      const db = require(`../Databases/${file}`);

      db.load();
    });
  });
}
