import Hapi from "@hapi/hapi";

import GeneralPurposeController from "./controllers/GeneralPurposeController";
import RatesController from "./controllers/RatesController";

const routes = (server: Hapi.Server) => {
  const generalPurposeController = new GeneralPurposeController();
  const ratesController = new RatesController();

  server.route({
    method: "GET",
    path: "/",
    handler: generalPurposeController.health,
  });

  server.route({
    method: "POST",
    path: "/create-rates",
    handler: (request) => ratesController.createRates(request),
  });

  server.route({
    method: "PATCH",
    path: "/add-markup",
    handler: (request) => ratesController.addMarkup(request),
  });
};

export default routes;
