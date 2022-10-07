import Hapi from "@hapi/hapi";

import GeneralPurposeController from "./controllers/GeneralPurposeController";

const routes = (server: Hapi.Server) => {
  const generalPurposeController = new GeneralPurposeController();

  server.route({
    method: "GET",
    path: "/",
    handler: generalPurposeController.health,
  });
};

export default routes;
