import { VALID_CURRENCIES } from "../constants/validCurrencies";
import {
  IPayloadAddMarkup,
  IPayloadCreateRates,
} from "../controllers/RatesController";

export function validatePairs(input: IPayloadCreateRates) {
  const pairs = input.pairs;
  const invalidPairs: string[] = [];
  pairs.forEach((pair) => {
    if (pair.length !== 6) {
      invalidPairs.push(pair);
      return;
    }
    const baseCurrency = pair.slice(0, 3);
    const targCurrency = pair.slice(3);

    if (
      !VALID_CURRENCIES.includes(baseCurrency) ||
      !VALID_CURRENCIES.includes(targCurrency)
    ) {
      invalidPairs.push(pair);
      return;
    }
  });
  return invalidPairs;
}

export function validateMarkupPairs(input: IPayloadAddMarkup) {
  const pairs = input.pairs;
  const invalidPairs: { pair: string; fee: number }[] = [];
  pairs.forEach((element) => {
    if (!element.pair || !element.fee) {
      invalidPairs.push(element);
      return;
    }

    if (element.pair.length !== 6) {
      invalidPairs.push(element);
      return;
    }
    const baseCurrency = element.pair.slice(0, 3);
    const targCurrency = element.pair.slice(3);
    if (
      !VALID_CURRENCIES.includes(baseCurrency) ||
      !VALID_CURRENCIES.includes(targCurrency)
    ) {
      invalidPairs.push(element);
      return;
    }

    if (typeof element.fee !== "number") {
      invalidPairs.push(element);
      return;
    }
  });
  return invalidPairs;
}
