type TDetail = {
  ref: string;
  name: string;
  description: string;
  priceNoTaxes: number;
  taxPercentage: number;
  priceAfterTaxes: number;
};

type TArticle = {
  stock: number;
  detail: TDetail;
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
