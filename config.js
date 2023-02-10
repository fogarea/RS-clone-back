import * as dotenv from "dotenv";
dotenv.config();

export const server = {
  PORT: process.env.PORT,
  CORS: {
    origin: ["http://localhost:3000", "https://elijah-i.github.io"],
    credentials: true,
    preflightContinue: true,
    exposedHeaders: ["X-Access-Token"],
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"]
  }
};

export const DB = {
  MONGO_CFG: {
    URL: process.env.MONGO_URL,
    SETTINGS: {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  }
};

export const JWT = {
  SECRET: {
    ACCESS: process.env.JWT_SECRET_ACCESS,
    REFRESH: process.env.JWT_SECRET_REFRESH
  },
  LIFE: {
    ACCESS: process.env.JWT_LIFETIME_ACCESS,
    REFRESH: process.env.JWT_LIFETIME_REFRESH
  }
};
