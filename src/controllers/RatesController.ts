import Hapi from "@hapi/hapi";
import providers from "../providers";
import mongoose from "mongoose";
import { calculateFeeAmount, calculateMarkedUpRate } from "../lib/RatesLib";
import { IRate } from "../models/Rate";
import { logger } from "../utils/logger";
require("../models/Rate");

const Provider = providers("fixer");
const provider = new Provider({
  subscriptionType: "free",
  useDummyData: false,
});

const Rate = mongoose.model("Rate");

class RatesController {
  async createRates(request: Hapi.Request) {
    try {
      const rates = await provider.getRates(request);
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
      return {
        rates,
        dblog: { ...result },
      };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async addMarkup(request: Hapi.Request) {
    try {
      const { pairs } = request.payload as {
        pairs: { [key: string]: number }[];
      };
      const result = await Rate.bulkWrite(
        // Upserting
        pairs.map((rate) => ({
          updateOne: {
            filter: { pair: rate.pair },
            update: { $set: { fee: rate.fee } },
          },
        }))
      );
      return {
        dblog: { ...result },
      };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getRates(request: Hapi.Request) {
    try {
      const { pairs } = request.query;
      const pairsSplitted = pairs.split(",");
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
        dblog: { ...result },
      };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}

export default RatesController;
