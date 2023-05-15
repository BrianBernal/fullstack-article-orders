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

type TArticleRefs = {
  quantity: number;
  ref: string;
};

type TNewOrderPayload = {
  articleRefs: TArticleRefs[];
};

type TEditOrderPayload = {
  id: string;
  articleRefs: TArticleRefs[];
};
type TOrderDataRow = {
  id: string;
  priceBeforeTaxes: number;
  totalPrice: number;
};

export type {
  TOrder,
  TArticleRefs,
  TNewOrderPayload,
  TEditOrderPayload,
  TOrderDataRow,
};
