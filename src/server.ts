import Hapi from "@hapi/hapi";
import mongoose from "mongoose";
import routes from "./routes";
import settings from "./settings";
import { logger } from "./utils/logger";

const { PORT, HOST, MONGODB_URL, MONGODB_DATABASE } = settings;

//load database
if (!MONGODB_URL) {
  logger.error("MONGODB_URL env missing");
} else {
  mongoose.connect(MONGODB_URL + MONGODB_DATABASE, function mongoConnect() {
    logger.info(`Connection with database ${MONGODB_DATABASE} succeeded`);
  });
}

const initServer = async () => {
  const server = Hapi.server({
    port: PORT,
    host: HOST,
  });

  routes(server);

  await server.start();
  logger.info(`Server started on  ${server.info.uri}`);
};

initServer();
