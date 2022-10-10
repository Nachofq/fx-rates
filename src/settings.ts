import * as dotenv from "dotenv";

if (process.env.NODE_ENV !== "production")
  dotenv.config({
    path: ".env",
  });

const settings = {
  PORT: process.env.CHALLENGE_PORT || process.env.PORT,
  HOST: process.env.CHALLENGE_HOST || process.env.HOST,
  FIXER_API_URL: process.env.FIXER_API_URL,
  FIXER_API_KEY: process.env.FIXER_API_KEY,
  MONGODB_URL: process.env.MONGODB_URL,
  MONGODB_DATABASE: process.env.MONGODB_DATABASE,
  MONGODB_OPTIONS: process.env.MONGODB_OPTIONS,
};

export default settings;
