import { TNewArticle } from "@/models/article";

type TArticleForm = {
  title: string;
  subtitle?: string;
  initialData?: TNewArticle;
  onSubmitHandler: (art: TNewArticle) => void;
  onCancelHandler?: () => void;
};

export type { TArticleForm };
