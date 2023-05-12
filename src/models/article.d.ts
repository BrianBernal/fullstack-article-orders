type TArticle = {
  stock: number;
  detail: {
    ref?: string;
    name: string;
    description: string;
    priceNoTaxes: number;
    taxPercentage: number;
  };
};

export { TArticle };
