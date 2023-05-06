function normalizeNumber(num) {
  if (typeof num !== "number") throw Error("Incorrect number type");

  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function validateTypes(values = {}) {
  const { strings = {}, numbers = {} } = values;
  if (typeof strings !== "object" && typeof numbers !== "number")
    throw Error("Params must be objects");

  const stringValues = Object.values(strings);
  for (const value of stringValues) {
    if (typeof value !== "string") return false;
  }
  const numberValues = Object.values(numbers);
  for (const value of numberValues) {
    if (typeof value !== "number") return false;
  }
  return true;
}

function calculatePriceAfterTaxes(priceNoTaxes, taxPercentage) {
  if (typeof priceNoTaxes !== "number" || typeof taxPercentage !== "number")
    throw Error("Incorrect number type");

  const priceAfterTaxes = priceNoTaxes * (1 + taxPercentage / 100);
  return normalizeNumber(priceAfterTaxes);
}

function validationValue(ok = false, msg = "") {
  return { ok, msg };
}

export {
  normalizeNumber,
  validateTypes,
  calculatePriceAfterTaxes,
  validationValue,
};
