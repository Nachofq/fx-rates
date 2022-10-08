import Hapi from "@hapi/hapi";
import { Rate } from "antd";

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
};

export default routes;
