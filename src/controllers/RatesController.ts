import Hapi from "@hapi/hapi";
import providers from "../providers";

const Provider = providers("fixer");
const provider = new Provider({
  subscriptionType: "free",
  useDummyData: true,
});

class RatesController {
  async createRates(request: Hapi.Request) {
    try {
      const rates = provider.getRates(request);
      return rates;
    } catch (e) {
      throw e;
    }
  }
}

export default RatesController;
