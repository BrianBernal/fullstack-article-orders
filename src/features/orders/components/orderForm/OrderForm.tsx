// libraries
import { useEffect, useState } from "react";

// models
import { TArticle } from "@/models/article";
import { TArticleRefs, TOrder } from "@/models/order";

// redux
import { fetchArticlesAction } from "@/features/articles/state/articleSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// components
import SelectList from "@/components/selectList/SelectList";
import OrderArticleItem from "./orderArticleItem/OrderArticleItem";
import notify from "@/utils/notify";

type TOrderArticle = {
  article: TArticle;
  quantity: number;
};

type TOrderForm = {
  title: string;
  subtitle?: string;
  orderData?: TOrder;
  onSubmitHandler: (art: TArticleRefs[], orderId?: string) => void;
  onCancelHandler?: () => void;
  priceAfterTaxes?: number;
};

function OrderForm({
  title,
  subtitle,
  orderData,
  onSubmitHandler,
  onCancelHandler,
}: TOrderForm) {
  const articles = useAppSelector((state) => state.articles.list);
  const dispatch = useAppDispatch();

  const getSelectorValues = () => {
    return articles.map(({ detail }) => ({
      name: detail.name,
      value: detail.ref,
    }));
  };

  const getInitialOrderArticleList = (): TOrderArticle[] => {
    if (!orderData) return [];

    const mapToArticle = orderData.articles.map((art) => {
      return {
        quantity: art.quantity,
        article: {
          detail: art.detail,
          stock: 0,
        },
      };
    });

    return mapToArticle;
  };

  const [selectorValues, setSelectorValues] = useState(getSelectorValues());
  const [selectedArticle, setSelectedArticle] = useState(selectorValues[0]);
  const [orderArticleList, setOrderArticleList] = useState<TOrderArticle[]>(
    getInitialOrderArticleList()
  );

  const totalBeforeTaxes = orderArticleList.reduce(
    (prev, curr) => prev + curr.article.detail.priceNoTaxes * curr.quantity,
    0
  );
  const totalAfterTaxes = orderArticleList.reduce(
    (prev, curr) => prev + curr.article.detail.priceAfterTaxes * curr.quantity,
    0
  );

  useEffect(() => {
    if (!selectedArticle) {
      dispatch(fetchArticlesAction());
    }
  }, [selectedArticle]);

  useEffect(() => {
    if (!selectedArticle && articles.length > 0) {
      const initialSelectorValues = getSelectorValues();
      setSelectorValues(initialSelectorValues);
      setSelectedArticle(initialSelectorValues[0]);
    }
  }, [articles.length]);

  if (!selectedArticle) {
    return <span className="block m-4">Loading articles...</span>;
  }

  const selectorArticleHandler = (
    newSelectedArticle: typeof selectedArticle
  ) => {
    setSelectedArticle(newSelectedArticle);
    const newArticle = articles.find(
      (art) => art.detail.ref === newSelectedArticle.value
    );
    if (newArticle) {
      setOrderArticleList((prevList) => [
        ...prevList,
        { article: newArticle, quantity: 1 },
      ]);
    }
    setSelectorValues((prev) =>
      prev.filter(({ value }) => value !== newArticle?.detail.ref)
    );
  };

  const removeArticleFromOrder = (ref: string) => {
    setOrderArticleList((prevArt) =>
      prevArt.filter((art) => art.article.detail.ref !== ref)
    );
    setSelectorValues((prevOptions) => {
      const removedArticle = articles.find(({ detail }) => detail.ref === ref);
      if (removedArticle) {
        const newOption = {
          name: removedArticle?.detail.name,
          value: removedArticle?.detail.ref,
        };
        return [...prevOptions, newOption];
      }
      return prevOptions;
    });
  };

  const updateItemQuantity = (ref: string, quantity: number) => {
    setOrderArticleList((prevArticleList) => {
      const listCopy = prevArticleList.slice();
      const modifiedArticle = listCopy.find(
        (art) => art.article.detail.ref === ref
      );
      if (!modifiedArticle) return listCopy;

      modifiedArticle.quantity = quantity;
      return listCopy;
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (orderArticleList.length <= 0) {
      notify.error("It is necessary to select at least one product");
      return;
    }
    let someQuantityIsZero = false;
    const articleRefs = orderArticleList.map(({ article, quantity }) => {
      const orderItemRef = {
        quantity,
        ref: article.detail.ref,
      };
      if (quantity <= 0) someQuantityIsZero = true;
      return orderItemRef;
    });
    if (someQuantityIsZero) {
      notify.error("Quantities must be major than 0");
      return;
    }
    onSubmitHandler(articleRefs, orderData?.id);
  };

  return (
    <form className="max-w-md" onSubmit={submitHandler}>
      <div className="border-b border-gray-900/10 pb-8">
        <span className="text-base font-semibold leading-7 text-gray-900 block">
          {title}
        </span>
        <span className="mt-1 text-sm leading-6 text-gray-600 mb-8 block">
          {subtitle}
        </span>

        <div className="col-span-full mt-2 flex items-center">
          <span className="inline-block mr-2">Select an Article: </span>
          <div className="inline-block w-auto grow">
            <SelectList
              items={selectorValues}
              selected={selectedArticle}
              setSelected={selectorArticleHandler}
            />
          </div>
        </div>
      </div>
      <ul className="divide-y divide-gray-300 max-w-lg mx-auto">
        {orderArticleList.map(({ article, quantity }) => {
          const { name, priceAfterTaxes, priceNoTaxes, ref } = article.detail;
          return (
            <OrderArticleItem
              key={ref}
              name={name}
              articleRef={ref}
              priceAfterTaxes={priceAfterTaxes}
              priceBeforeTaxes={priceNoTaxes}
              quantity={quantity}
              deleteAction={removeArticleFromOrder}
              updateItemQuantity={updateItemQuantity}
            />
          );
        })}
      </ul>
      <div className="border-t border-gray-900/10">
        <span className="text-base font-semibold leading-7 text-gray-900 block">
          Order Resume
        </span>
        <span className="mt-1 text-sm leading-6 text-gray-600 block">
          Total Before taxes: $ {totalBeforeTaxes}
        </span>
        <span className="mt-1 text-sm leading-6 text-gray-600 block">
          Total After taxes: $ {totalAfterTaxes}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        {onCancelHandler && (
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={onCancelHandler}
          >
            Cancel
          </button>
        )}
        <button
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit"
        >
          Finish and Save
        </button>
      </div>
    </form>
  );
}

export default OrderForm;
