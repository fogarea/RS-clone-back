// imports
import express from "express";
import { server } from "./config.js";
import dataBase from "./model/index.js";
import Routing from "./routing/index.js";

// create new Express app with JSON support
const app = express();
app.use(express.json());

// create routes
Routing.main.create(app);
Routing.posts.create(app);

// listen server on port: server.PORT
app.listen(server.PORT, () =>
  console.log(`SERVER STARTED ON PORT ${server.PORT}`)
);
