import axios from "axios";
import settings from "../../settings";
import Decimal from "decimal.js";
import { logger } from "../../utils/logger";
import { IRate } from "../../models/Rate";
import * as Boom from "@hapi/boom";

const { FIXER_API_URL, FIXER_API_KEY } = settings;
const FIXER_GET_RATES_URL = `${FIXER_API_URL}/latest?access_key=${FIXER_API_KEY}`;

const freeSubscriptionDummyData = {
  success: true,
  timestamp: 1665167644,
  base: "EUR",
  date: "2022-10-07",
  rates: {
    AED: 3.579762,
    AFN: 84.789483,
    ALL: 116.272191,
    AMD: 394.279564,
    ANG: 1.755383,
    AOA: 428.004816,
    ARS: 145.387584,
    AUD: 1.529521,
    AWG: 1.756694,
    AZN: 1.660668,
    BAM: 1.944403,
    BBD: 1.966654,
    BDT: 100.879098,
    BGN: 1.951681,
    BHD: 0.367803,
    BIF: 1997.904637,
    BMD: 0.974588,
    BND: 1.391586,
    BOB: 6.730358,
    BRL: 5.075072,
    BSD: 0.974031,
    BTC: 5.0201733e-5,
    BTN: 80.217508,
    BWP: 12.969481,
    BYN: 2.470197,
    BYR: 19101.917501,
    BZD: 1.963373,
    CAD: 1.336706,
    CDF: 1992.057463,
    CHF: 0.969466,
    CLF: 0.033159,
    CLP: 914.952996,
    CNY: 6.935205,
    COP: 4502.604585,
    CRC: 618.162124,
    CUC: 0.974588,
    CUP: 25.826572,
    CVE: 109.982598,
    CZK: 24.461214,
    DJF: 173.204097,
    DKK: 7.438287,
    DOP: 52.213572,
    DZD: 136.865806,
    EGP: 19.159032,
    ERN: 14.618814,
    ETB: 51.267087,
    EUR: 1,
    FJD: 2.252906,
    FKP: 0.842625,
    GBP: 0.879375,
    GEL: 2.724012,
    GGP: 0.842625,
    GHS: 10.184821,
    GIP: 0.842625,
    GMD: 54.190828,
    GNF: 8532.515026,
    GTQ: 7.689843,
    GYD: 203.764624,
    HKD: 7.650377,
    HNL: 24.140914,
    HRK: 7.527426,
    HTG: 118.343209,
    HUF: 424.696428,
    IDR: 14887.508223,
    ILS: 3.449933,
    IMP: 0.842625,
    INR: 80.689135,
    IQD: 1422.897936,
    IRR: 41225.056991,
    ISK: 140.51642,
    JEP: 0.842625,
    JMD: 149.358794,
    JOD: 0.691021,
    JPY: 141.625616,
    KES: 117.831351,
    KGS: 79.249669,
    KHR: 4025.047244,
    KMF: 489.121204,
    KPW: 877.128908,
    KRW: 1387.579254,
    KWD: 0.302171,
    KYD: 0.811668,
    KZT: 459.391499,
    LAK: 16202.519649,
    LBP: 1483.322709,
    LKR: 355.512371,
    LRD: 149.745761,
    LSL: 17.464982,
    LTL: 2.877704,
    LVL: 0.589519,
    LYD: 4.863563,
    MAD: 10.674175,
    MDL: 18.920279,
    MGA: 4103.01425,
    MKD: 61.258459,
    MMK: 2045.412838,
    MNT: 3142.501334,
    MOP: 7.874841,
    MRO: 347.927615,
    MUR: 44.191253,
    MVR: 15.067494,
    MWK: 992.621142,
    MXN: 19.512808,
    MYR: 4.519654,
    MZN: 62.208296,
    NAD: 17.464978,
    NGN: 422.698513,
    NIO: 35.06603,
    NOK: 10.443467,
    NPR: 128.352635,
    NZD: 1.736511,
    OMR: 0.375249,
    PAB: 0.974031,
    PEN: 3.86668,
    PGK: 3.435459,
    PHP: 57.504085,
    PKR: 217.333374,
    PLN: 4.859353,
    PYG: 6905.83525,
    QAR: 3.548511,
    RON: 4.935218,
    RSD: 117.342918,
    RUB: 60.205188,
    RWF: 1015.520308,
    SAR: 3.663507,
    SBD: 7.94946,
    SCR: 13.335463,
    SDG: 557.464454,
    SEK: 10.935517,
    SGD: 1.39712,
    SHP: 1.342401,
    SLL: 15837.049279,
    SOS: 553.082052,
    SRD: 26.89911,
    STD: 20171.996207,
    SVC: 8.522397,
    SYP: 2448.680962,
    SZL: 17.464971,
    THB: 36.670325,
    TJS: 9.852057,
    TMT: 3.411057,
    TND: 3.188888,
    TOP: 2.374632,
    TRY: 18.108267,
    TTD: 6.617484,
    TWD: 30.920551,
    TZS: 2272.738675,
    UAH: 35.973983,
    UGX: 3719.750015,
    USD: 0.974588,
    UYU: 39.929191,
    UZS: 10793.558302,
    VND: 23278.025485,
    VUV: 115.938773,
    WST: 2.656315,
    XAF: 652.12465,
    XAG: 0.048343,
    XAU: 0.000574,
    XCD: 2.633872,
    XDR: 0.756653,
    XOF: 644.202746,
    XPF: 118.900014,
    YER: 243.890908,
    ZAR: 17.678828,
    ZMK: 8772.461655,
    ZMW: 15.418659,
    ZWL: 313.816818,
  },
};
interface IConstructor {
  subscriptionType: SubscriptionTypes;
  useDummyData: boolean;
}
export type SubscriptionTypes = "free" | "starter" | "pro" | "enterprise";
interface IFixerRatesRequest {
  base: string;
  symbol: string[];
}
interface IFixerResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: IFixerRates;
}
interface IFixerRates {
  [key: string]: number;
}

type ParsedPairs = {
  [key: string]: { [key: string]: number };
};

export default class FixerProvider {
  subscriptionType: SubscriptionTypes;
  useDummyData: boolean;

  constructor({ subscriptionType, useDummyData }: IConstructor) {
    this.subscriptionType = subscriptionType;
    this.useDummyData = useDummyData;
  }

  // Public Methods
  async getRates(pairs: string[]) {
    const parsedPairs = this.parsePairs(pairs);
    await this.fetchPairsRates(parsedPairs);
    const result = this.convertToSchemaShape(parsedPairs);
    logger.info(result);
    return result;
  }

  // Private Methods
  private parsePairs(pairs: string[]) {
    let aux = Array.from(
      new Set(
        pairs.map((x) => x.toUpperCase()).sort((a, b) => a.localeCompare(b))
      )
    );
    let result: ParsedPairs = {};
    aux.forEach((pair) => {
      return (result[pair.slice(0, 3)] = {
        ...result[pair.slice(0, 3)],
        [pair.slice(3)]: -1,
      });
    });
    return result;
  }

  private async fetchPairsRates(parsedPairs: ParsedPairs) {
    let fixerResponse: IFixerResponse | undefined;
    if (this.subscriptionType === "free") {
      if (this.useDummyData) {
        fixerResponse = freeSubscriptionDummyData;
      } else {
        const axiosResponse = await axios.get(FIXER_GET_RATES_URL);
        fixerResponse = axiosResponse.data as IFixerResponse;
      }
      this.calcRatesFromFreeSubscription({ fixerResponse, parsedPairs });
    } else {
      // const axiosResponse = await axios.get(
      //   `${FIXER_GET_RATES_URL}&base=${base}&symbols=${symbols}`
      // );
      // fixerResponse = axiosResponse.data;
      logger.error("Paid subscription not implemented");
      throw Boom.notImplemented("Paid subscription not implemented");
    }
  }

  private calcRatesFromFreeSubscription({
    fixerResponse,
    parsedPairs,
  }: {
    fixerResponse: IFixerResponse;
    parsedPairs: ParsedPairs;
  }) {
    const baseCurrencies = Object.keys(parsedPairs);
    baseCurrencies.forEach((baseCurrency) => {
      const targetCurrencies = Object.keys(parsedPairs[baseCurrency]);

      // EUR is base default currency, no need to calculate
      if (baseCurrency === "EUR") {
        targetCurrencies.forEach((targetCurrency) => [
          (parsedPairs[baseCurrency][targetCurrency] =
            fixerResponse.rates[targetCurrency]),
        ]);
        return;
      }

      // EUR as targetCurrency, 1/rate
      targetCurrencies.forEach((targetCurrency) => {
        if (targetCurrency === "EUR") {
          parsedPairs[baseCurrency][targetCurrency] = Decimal.pow(
            fixerResponse.rates[baseCurrency],
            -1
          ).toNumber();
          return;
        }

        // Non EUR currencies, NNNMMM = EURMMM / EURNNN
        parsedPairs[baseCurrency][targetCurrency] = Decimal.div(
          fixerResponse.rates[targetCurrency],
          fixerResponse.rates[baseCurrency]
        ).toNumber();
      });
    });
  }

  private convertToSchemaShape(parsedPairs: ParsedPairs) {
    const result: IRate[] = [];
    const baseCurrencies = Object.keys(parsedPairs);
    baseCurrencies.forEach((baseCurrency) => {
      const targetCurrencies = Object.keys(parsedPairs[baseCurrency]);
      targetCurrencies.forEach((targetCurrency) => {
        result.push({
          pair: baseCurrency + targetCurrency,
          base: baseCurrency,
          target: targetCurrency,
          rate: parsedPairs[baseCurrency][targetCurrency],
        });
      });
    });
    return result;
  }
}
