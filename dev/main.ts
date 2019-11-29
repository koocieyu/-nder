import Bot from "./Utils/Bot";

require("dotenv").config();

export const Under = new Bot({
  token: process.env.TOKEN,
  prefix: "_ ",
  id: process.env.CLIENT_ID
});

Under.start();
