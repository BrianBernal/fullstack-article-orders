import { TNewArticle } from "@/models/article";

type TArticleForm = {
  title: string;
  subtitle?: string;
  initialData?: TNewArticle;
  onSubmitHandler: (art: TNewArticle) => void;
  onCancelHandler?: () => void;
};

type TInputs = {
  name: string;
  description: string;
  priceNoTaxes: number;
  taxPercentage: number;
  stock: number;
};

export type { TArticleForm, TInputs };
