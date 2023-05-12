import Modal from "@/components/modal/Modal";
import ArticleForm from "../articleForm/ArticleForm";
import { useState } from "react";

function NewArticle() {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const onNewArticleHandler = () => {
    setIsOpenForm(true);
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
