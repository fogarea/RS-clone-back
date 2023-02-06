// imports
import cors from "cors";
import express from "express";
import cookies from "cookie-parser";

import "./model/provider.js";

import { server } from "./config.js";
import Routing from "./routing/index.js";

// create new Express app with JSON support
const app = express();

// enable json
app.use(express.json());

// handle CORS
app.use(cors(server.CORS));

// parse cookies
app.use(cookies());

// create routes
app.use("/auth", Routing.auth);
app.use("/api", Routing.posts);

// tmp DB fill routers
app.use("/api", Routing.program);
app.use("/api", Routing.training);

// listen server on port: server.PORT
app.listen(server.PORT, () => console.log(`SERVER STARTED ON PORT ${server.PORT}`));
