// libraries
import { useState } from "react";

// models
import { TNewArticle } from "@/models/article";

// components
import Modal from "@/components/modal/Modal";
import ArticleForm from "../articleForm/ArticleForm";

function NewArticle() {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const onNewArticleHandler = () => {
    setIsOpenForm(true);
  };

  const saveArticle = (art: TNewArticle) => {
    console.log(art);
    // dispatch save y en el dispatcher actualizar la lista de articulos
    closeModalForm();
  };

  const closeModalForm = () => {
    setIsOpenForm(false);
  };

  return (
    <>
      <Modal
        title="New Article"
        isOpen={isOpenForm}
        setIsOpen={setIsOpenForm}
        hideActions
      >
        <ArticleForm
          title=""
          subtitle="Please fill the following fields to create a new Article"
          onSubmitHandler={saveArticle}
          onCancelHandler={closeModalForm}
        />
      </Modal>
      <button
        onClick={onNewArticleHandler}
        className="bg-cyan-800 hover:bg-cyan-950 text-white font-bold py-2 px-8 rounded-full fixed bottom-16 right-16"
      >
        Crete new article +
      </button>
    </>
  );
}

export default NewArticle;