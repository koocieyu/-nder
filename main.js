import Bot from "./Classes/Bot";

require("dotenv").config();

const Under = new Bot({
  token: process.env.TOKEN
});

Under.start();
