function normalizeNumber(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function calculatePriceAfterTaxes(priceNoTaxes: number, taxPercentage: number) {
  const priceAfterTaxes = priceNoTaxes * (1 + taxPercentage / 100);
  return normalizeNumber(priceAfterTaxes);
}

export { normalizeNumber, calculatePriceAfterTaxes };
