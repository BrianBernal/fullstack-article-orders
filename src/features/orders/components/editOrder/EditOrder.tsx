// models
import { TArticleRefs } from "@/models/order";

// redux
import { closeShowDetail, fetchEditOrderAction } from "../../state/orderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// components
import Modal from "@/components/modal/Modal";
import OrderForm from "../orderForm/OrderForm";
import { orderEditionData } from "../../state/selectors";

function EditOrder() {
  const dispatch = useAppDispatch();
  const { selectedOrder, isDetailShown } = useAppSelector(orderEditionData);

  if (!selectedOrder) {
    return <></>;
  }

  const saveEditedOrder = (articleRefs: TArticleRefs[], id = "") => {
    dispatch(fetchEditOrderAction({ articleRefs, id }));
    dispatch(closeShowDetail());
    closeModalForm();
  };

  const closeModalForm = () => {
    dispatch(closeShowDetail());
  };

  return (
    <>
      <Modal
        title="New Article"
        isOpen={isDetailShown}
        cancel={{
          handler: closeModalForm,
        }}
        hideActions
      >
        <OrderForm
          title="New Article"
          subtitle="lease fill the following fields to create a new Order"
          onSubmitHandler={saveEditedOrder}
          onCancelHandler={closeModalForm}
          orderData={selectedOrder}
        />
      </Modal>
    </>
  );
}

export default EditOrder;
