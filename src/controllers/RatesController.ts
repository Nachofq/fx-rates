import Hapi from "@hapi/hapi";
import providers from "../providers";
import mongoose from "mongoose";
require("../models/Rate");

const Provider = providers("fixer");
const provider = new Provider({
  subscriptionType: "free",
  useDummyData: true,
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
        dblog: {
          nMatched: result.nMatched,
          nUpserted: result.nUpserted,
          nModified: result.nModified,
        },
      };
    } catch (e) {
      throw e;
    }
  }
}

export default RatesController;
