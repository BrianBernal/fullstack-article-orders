type TOrderArticleDetail = {
  ref: string;
  name: string;
  description: string;
  priceNoTaxes: number;
  taxPercentage: number;
  priceAfterTaxes: number;
};

type TOrderArticle = {
  quantity: number;
  detail: TOrderArticleDetail;
};
type TOrder = {
  id: string;
  articles: TOrderArticle[];
  totalWithoutTaxes: number;
  totalAfterTaxes: number;
};

type TNewOrder = {
  articleRefs: {
    quantity: number;
    ref: string;
  }[];
};

export type { TOrder, TNewOrder };
