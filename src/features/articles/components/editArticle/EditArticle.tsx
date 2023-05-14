// libraries

// models
import { TEditedArticle, TNewArticle } from "@/models/article";

// redux
import {
  closeShowDetail,
  fetchEditArticleAction,
} from "../../state/articleSlice";
import { articleEditionData } from "../../state/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// components
import Modal from "@/components/modal/Modal";
import ArticleForm from "../articleForm/ArticleForm";

function EditArticle() {
  const dispatch = useAppDispatch();
  const { selectedArticle, isDetailShown } = useAppSelector(articleEditionData);

  if (!selectedArticle) {
    return <></>;
  }

  const detail = selectedArticle?.detail;
  const stock = selectedArticle?.stock;

  const { name, description, priceNoTaxes, ref, taxPercentage } = detail;

  const initialForm = {
    name,
    description,
    priceNoTaxes,
    taxPercentage,
    stock,
  };

  const saveArticle = ({
    name,
    description,
    priceNoTaxes,
    taxPercentage,
    stock,
  }: TNewArticle) => {
    const modifiedArticle: TEditedArticle = {
      ref,
      name,
      description,
      priceNoTaxes,
      taxPercentage,
      stock,
    };

    dispatch(fetchEditArticleAction(modifiedArticle));
    dispatch(closeShowDetail());
    closeModalForm();
  };

  const closeModalForm = () => {
    dispatch(closeShowDetail());
  };

  return (
    <>
      <Modal
        title="Edit Article"
        isOpen={isDetailShown}
        cancel={{ handler: closeModalForm }}
        hideActions
      >
        <ArticleForm
          title=""
          subtitle="Please fill the following fields to edit the Article"
          onSubmitHandler={saveArticle}
          onCancelHandler={closeModalForm}
          initialData={initialForm}
        />
      </Modal>
    </>
  );
}

export default EditArticle;
