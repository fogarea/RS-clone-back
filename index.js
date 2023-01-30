// imports
import cors from "cors";
import express from "express";

import "./model/index.js";

import { server } from "./config.js";
import Routing from "./routing/index.js";

// create new Express app with JSON support
const app = express();

// enable json
app.use(express.json());

// handle CORS
app.use(cors(server.CORS));

// create routes
app.use("/api", Routing.posts);

// listen server on port: server.PORT
const port = process.env.PORT || server.PORT;
app.listen(port, () => console.log(`SERVER STARTED ON PORT ${port}`));
