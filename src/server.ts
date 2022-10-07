import Hapi from "@hapi/hapi";
import routes from "./routes";
import settings from "./settings";
import { logger } from "./utils/logger";
const { PORT, HOST } = settings;

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: HOST,
  });

  routes(server);

  await server.start();
  logger.info(`Server started on  ${server.info.uri}`);
};

init();
