import { TOrderDataRow } from "@/models/order";

type TOrderRow = {
  orderData: TOrderDataRow;
  editAction: (orderData: TOrderDataRow) => void;
};

function OrderRow({ orderData, editAction }: TOrderRow) {
  const { id, priceBeforeTaxes, totalPrice } = orderData;

  const editHandler = () => {
    editAction(orderData);
  };

  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex gap-x-4 w-64">
        <div className="min-w-0 flex-auto">
          <p className="mt-1 text-xs leading-5 text-gray-500"># {id}</p>
        </div>
      </div>
      <div className="sm:flex sm:flex-col sm:items-end">
        <p className="mt-1 text-xs leading-5 text-gray-500">
          Price before taxes: $ {priceBeforeTaxes}
        </p>
        <p className="text-sm leading-6 text-gray-900">Total: $ {totalPrice}</p>
      </div>
      <div className="sm:flex sm:flex-col sm:items-end">
        <button
          type="button"
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          onClick={editHandler}
        >
          Edit
        </button>
      </div>
    </li>
  );
}

export default OrderRow;
