import sql from "better-sqlite3";
import { db as cmds } from "./Commands";

export let db = sql("bot.sqlite");
export function load() {
  if (!db.open) throw new Error("The cooldowns database is not open!");
}

export function loadAfter() {
  try {
    db.prepare("SELECT * FROM cooldowns").get();
  } catch (err) {
    db.prepare("CREATE TABLE cooldowns(id TEXT NOT NULL PRIMARY KEY)").run();
    console.log("Created table 'cooldowns'");
  }

  cmds.get("commands").forEach(command => {
    try {
      db.prepare(`SELECT ${command.name} FROM cooldowns`).get();
    } catch (err) {
      db.prepare(`ALTER TABLE cooldowns ADD COLUMN ${command.name} TEXT`).run();
      console.log(`Created column for the ${command.name} command`);
    }
  });
}
