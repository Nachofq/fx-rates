import * as dotenv from "dotenv";
dotenv.config();

const settings = {
  PORT: process.env.CHALLENGE_PORT,
  HOST: process.env.CHALLENGE_HOST,
  FIXER_API_URL: process.env.FIXER_API_URL,
  FIXER_API_KEY: process.env.FIXER_API_KEY,
  MONGODB_URL: process.env.MONGODB_URL,
  MONGODB_DATABASE: process.env.MONGODB_DATABASE,
};

export default settings;
