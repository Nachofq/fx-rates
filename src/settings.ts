import * as dotenv from "dotenv";
dotenv.config();

const settings = {
  PORT: process.env.CHALLENGE_PORT,
  HOST: process.env.CHALLENGE_HOST,
  FIXER_API_URL: process.env.FIXER_API_URL,
  FIXER_API_KEY: process.env.FIXER_API_KEY,
};

export default settings;
