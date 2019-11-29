import bsqlite3 from "better-sqlite3";
import moment from "moment";

export function setCD(commandname: string, userid: string): void {
  const sql = bsqlite3("bot.sqlite");
  const insertCooldown = sql.prepare(
    `UPDATE cooldowns SET ${commandname}=? WHERE id=?`
  );

  insertCooldown.run(moment().toISOString(), userid);
  console.log("Set cooldown!");
}
