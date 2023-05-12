import { TNewArticle } from "@/models/article";

type TArticleForm = {
  title: string;
  subtitle?: string;
  initialData?: TNewArticle;
  onSave: (art: TNewArticle) => void;
  onCancel: () => void;
};

export type { TArticleForm };
