import Decimal from "decimal.js";

export function calculateFeeAmount(rate: number, fee: number) {
  return Decimal.mul(rate, fee).toNumber();
}

export function calculateMarkedUpRate(rate: number, fee: number) {
  return Decimal.mul(rate, fee).add(rate).toNumber();
}
