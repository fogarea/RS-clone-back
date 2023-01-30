import * as dotenv from "dotenv";
dotenv.config();

export const server = {
  PORT: process.env.PORT,
  CORS: {
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"]
  }
};

export const DB = {
  MONGO: {
    URL: process.env.MONGO_URL,
    SETTINGS: {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  }
};
