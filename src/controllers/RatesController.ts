import Hapi from "@hapi/hapi";
import providers from "../providers";
import mongoose from "mongoose";
import { calculateFeeAmount, calculateMarkedUpRate } from "../lib/RatesLib";
import { IRate } from "../models/Rate";
import { logger } from "../utils/logger";
import * as Boom from "@hapi/boom";
import { validateMarkupPairs, validatePairs } from "../utils/validator";
require("../models/Rate");

const Provider = providers("fixer");
const provider = new Provider({
  subscriptionType: "free",
  useDummyData: true,
});

const Rate = mongoose.model("Rate");

// Interfaces
export interface IPayloadCreateRates {
  pairs: string[];
}

export interface IPayloadAddMarkup {
  pairs: { pair: string; fee: number }[];
}

class RatesController {
  async createRates(request: Hapi.Request) {
    try {
      // Validation
      const payload = request.payload as IPayloadCreateRates;
      if (!payload || !payload.pairs || !Array.isArray(payload.pairs))
        throw Boom.badRequest(
          `Expected payload format: { pairs:[EURUSD,EURARS,...] }`
        );
      const pairsErrors = validatePairs(payload);
      if (pairsErrors.length !== 0)
        throw Boom.badRequest(`Some pairs are invalid: ${pairsErrors}`);

      // Logic
      const rates = await provider.getRates(payload.pairs);
      const result = await Rate.bulkWrite(
        // Upserting
        rates.map((rate) => ({
          updateOne: {
            filter: { pair: rate.pair },
            update: { $set: { ...rate } },
            upsert: true,
          },
        }))
      );
      // Result
      return {
        rates,
        dblog: { ...result },
      };
    } catch (e: any) {
      logger.error(e);
      if (e.isBoom) throw e;
      throw Boom.badImplementation(JSON.stringify(e));
    }
  }

  async addMarkup(request: Hapi.Request) {
    try {
      // Validation
      const payload = request.payload as IPayloadAddMarkup;
      if (!payload || !payload.pairs || !Array.isArray(payload.pairs))
        throw Boom.badRequest(
          `Expected payload format: { pairs:[ { pair: EURUSD, fee: 0.01 }, ... ] }`
        );

      const pairsErrors = validateMarkupPairs(payload);
      if (pairsErrors.length !== 0)
        throw Boom.badRequest(
          `Some pairs are invalid: ${JSON.stringify(pairsErrors)}`
        );

      const result = await Rate.bulkWrite(
        // Upserting
        payload.pairs.map((rate) => ({
          updateOne: {
            filter: { pair: rate.pair },
            update: { $set: { fee: rate.fee } },
          },
        }))
      );
      return {
        dblog: { ...result },
      };
    } catch (e: any) {
      logger.error(e);
      if (e.isBoom) throw e;
      throw Boom.badImplementation(JSON.stringify(e));
    }
  }

  async getRates(request: Hapi.Request) {
    try {
      // Validation
      const query = request.query;
      if (!query || !query.pairs)
        throw Boom.badRequest(
          `Expected payload format: ?pairs=EURUSD,EURARS }`
        );
      const pairs = query.pairs;
      const pairsSplitted = pairs.split(",");
      const pairsErrors = validatePairs({ pairs: pairsSplitted });
      if (pairsErrors.length !== 0)
        throw Boom.badRequest(`Some pairs are invalid: ${pairsErrors}`);

      const result = (await Rate.find({
        pair: { $in: pairsSplitted },
      }).lean()) as IRate[];

      result.forEach((rate, index) => {
        if (!rate.fee) return;
        result[index].feeAmount = calculateFeeAmount(rate.rate, rate.fee);
        result[index].markedUpRate = calculateMarkedUpRate(rate.rate, rate.fee);
        return;
      });

      return {
        result,
      };
    } catch (e: any) {
      logger.error(e);
      if (e.isBoom) throw e;
      throw Boom.badImplementation(JSON.stringify(e));
    }
  }
}

export default RatesController;
