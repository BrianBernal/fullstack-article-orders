import { TNewArticle } from "@/models/article";

type TArticleForm = {
  title: string;
  subtitle?: string;
  initialData?: TNewArticle | undefined;
  onSubmitHandler: (art: TNewArticle) => void;
  onCancelHandler?: () => void;
  priceAfterTaxes?: number;
};

type TInputs = {
  name: string;
  description: string;
  priceNoTaxes: number;
  taxPercentage: number;
  stock: number;
};

export type { TArticleForm, TInputs };
