type TOrderRow = {
  name: string;
  articleRef: string;
  priceBeforeTaxes: number;
  priceAfterTaxes: number;
  quantity?: number;
  deleteAction: (ref: string) => void;
};
function OrderArticleItem({
  name,
  articleRef,
  priceBeforeTaxes,
  priceAfterTaxes,
  quantiy,
  deleteAction,
}: TOrderRow) {
  //   const { detail } = article;
  //   const { name, description, priceNoTaxes } = detail;

  const deleteHandler = () => {
    deleteAction(articleRef);
  };

  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex gap-x-4 w-30 w-1/3">
        <div className="min-w-0 flex-auto">
          <span className="">{name}</span>
          <div className="flex justify-center mt-2">
            <span className="mr-2 text-sm leading-6 text-gray-900">
              Quantity:
            </span>
            <input className="w-14 p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600" />
          </div>
        </div>
      </div>
      <div className="sm:flex sm:flex-col sm:items-end">
        <p className="mt-1 text-xs leading-5 text-gray-500">
          Price before taxes: $ {priceBeforeTaxes}
        </p>
        <p className="text-sm leading-6 text-gray-900">
          Price after taxes: $ {priceAfterTaxes}
        </p>
      </div>
      <div className="sm:flex sm:flex-col sm:items-end">
        <button
          type="button"
          className="rounded-lg bg-red-700 bg-opacity-50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          onClick={deleteHandler}
        >
          X
        </button>
      </div>
    </li>
  );
}

export default OrderArticleItem;
