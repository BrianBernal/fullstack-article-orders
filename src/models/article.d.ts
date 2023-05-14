type TArticle = {
  stock: number;
  detail: {
    ref: string;
    name: string;
    description: string;
    priceNoTaxes: number;
    taxPercentage: number;
  };
};

type TNewArticle = {
  name: string;
  description: string;
  priceNoTaxes: number;
  taxPercentage: number;
  stock: number;
};

type TEditedArticle = TNewArticle & {
  ref: string;
};

export type { TArticle, TNewArticle, TEditedArticle };
