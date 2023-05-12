import { TArticle } from "@/models/article";

type TArticleRow = {
  article: TArticle;
  editAction: (art: TArticle) => void;
};

export type { TArticleRow };
