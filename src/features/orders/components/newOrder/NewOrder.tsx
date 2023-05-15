// libraries
import { useState } from "react";

// models
import { TArticleRefs } from "@/models/order";

// redux
import { fetchNewOrderAction } from "../../state/orderSlice";
import { useAppDispatch } from "@/redux/hooks";

// components
import Modal from "@/components/modal/Modal";
import OrderForm from "../orderForm/OrderForm";

function NewOrder() {
  const dispatch = useAppDispatch();
  const [isOpenForm, setIsOpenForm] = useState(false);

  const onNewOrderHandler = () => {
    setIsOpenForm(true);
  };

  const saveOrder = (articleRefs: TArticleRefs[]) => {
    dispatch(fetchNewOrderAction({ articleRefs }));
  };

  const closeModalForm = () => {
    setIsOpenForm(false);
  };

  return (
    <>
      <Modal
        title="New Article"
        isOpen={isOpenForm}
        cancel={{
          handler: closeModalForm,
        }}
        hideActions
      >
        <OrderForm
          title="New Article"
          subtitle="lease fill the following fields to create a new Order"
          onSubmitHandler={saveOrder}
          onCancelHandler={closeModalForm}
        />
      </Modal>
      <button
        onClick={onNewOrderHandler}
        className="bg-cyan-800 hover:bg-cyan-950 text-white font-bold py-2 px-8 rounded-full fixed bottom-16 right-16"
      >
        Crete new Order +
      </button>
    </>
  );
}

export default NewOrder;
