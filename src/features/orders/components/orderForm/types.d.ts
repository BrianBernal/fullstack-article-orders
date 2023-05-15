import { TArticle } from "@/models/article";
import { TArticleRefs, TOrder } from "@/models/order";

type TOrderArticle = {
  article: TArticle;
  quantity: number;
};

type TOrderForm = {
  title?: string;
  subtitle?: string;
  orderData?: TOrder;
  onSubmitHandler: (art: TArticleRefs[], orderId?: string) => void;
  onCancelHandler?: () => void;
  priceAfterTaxes?: number;
};

export type { TOrderArticle, TOrderForm };
