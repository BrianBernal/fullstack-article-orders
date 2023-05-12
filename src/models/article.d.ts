type TArticle = {
  stock: number;
  detail: {
    ref?: string;
    name: string;
    description: string;
    priceNoTaxes: number;
    taxPercentage: number;
    stock: number;
  };
};

type TNewArticle = {
  name: string;
  description: string;
  priceNoTaxes: number;
  taxPercentage: number;
  stock: number;
};

export { TArticle, TNewArticle };
