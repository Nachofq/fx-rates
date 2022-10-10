import Hapi from "@hapi/hapi";
import Joi from "joi";

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
    options: {
      handler: (request) => ratesController.createRates(request),
      validate: {
        payload: Joi.object({
          pairs: Joi.array()
            .items(Joi.string())
            .default([
              "EURUSD",
              "EURARS",
              "USDARS",
              "EURBRL",
              "USDBRL",
              "BRLARS",
              "ARSEUR",
            ])
            .required()
            .description("Pairs"),
        }),
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "400": {
              description: "BadRequest",
            },
          },
          payloadType: "json",
        },
      },
      description: "Create Pairs",
      notes:
        "Create FX rates by fetching a third party provider. Rates will be created (or updated if already exist)",
      tags: ["api"],
    },
  });

  server.route({
    method: "PATCH",
    path: "/add-markup",
    options: {
      handler: (request) => ratesController.addMarkup(request),
      validate: {
        payload: Joi.object({
          pairs: Joi.array()
            .items(Joi.object({ pair: Joi.string(), fee: Joi.number() }))
            .default([
              { pair: "EURUSD", fee: 0.01 },
              { pair: "EURARS", fee: 0.01 },
              { pair: "USDARS", fee: 0.04 },
              { pair: "EURBRL", fee: 0.03 },
              { pair: "USDBRL", fee: 0.01 },
              { pair: "BRLARS", fee: 0.01 },
              { pair: "ARSEUR", fee: 0.04 },
            ])
            .required()
            .description("Pairs"),
        }),
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "400": {
              description: "BadRequest",
            },
          },
          payloadType: "json",
        },
      },
      description: "Markup Pairs",
      notes: "Updates fees for already existing FX pairs",
      tags: ["api"],
    },
  });

  server.route({
    method: "GET",
    path: "/get-rates",
    options: {
      handler: (request) => ratesController.getRates(request),
      validate: {
        query: Joi.object({
          pairs: Joi.string()
            .default("EURUSD,EURARS,USDARS,EURBRL,USDBRL,BRLARS,ARSEUR")
            .required()
            .description("Pairs"),
        }),
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "400": {
              description: "BadRequest",
            },
          },
          payloadType: "json",
        },
      },
      description: "Get Pairs",
      notes: "Get fees for already existing FX pairs",
      tags: ["api"],
    },
  });
};

export default routes;
