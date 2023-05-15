// libraries
import { useEffect, useState } from "react";

// models
import { TArticle } from "@/models/article";

// redux
import { fetchArticlesAction } from "@/features/articles/state/articleSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// components
import SelectList from "@/components/selectList/SelectList";
import OrderArticleItem from "./orderArticleItem/OrderArticleItem";

function orderForm() {
  const articles = useAppSelector((state) => state.articles.list);
  const dispatch = useAppDispatch();

  const getSelectorValues = () => {
    return articles.map(({ detail }) => ({
      name: detail.name,
      value: detail.ref,
    }));
  };

  const [selectorValues, setSelectorValues] = useState(getSelectorValues());
  const [selectedArticle, setSelectedArticle] = useState(selectorValues[0]);
  const [orderArticleList, setOrderArticleList] = useState<TArticle[]>([]);

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

  if (!selectedArticle)
    return <span className="block m-4">Loading articles...</span>;

  const selectorArticleHandler = (
    newSelectedArticle: typeof selectedArticle
  ) => {
    setSelectedArticle(newSelectedArticle);
    const newArticle = articles.find(
      (art) => art.detail.ref === newSelectedArticle.value
    );
    if (newArticle) {
      setOrderArticleList((prevList) => [...prevList, newArticle]);
    }
    setSelectorValues((prev) =>
      prev.filter(({ value }) => value !== newArticle?.detail.ref)
    );
  };

  const removeArticleFromOrder = (ref: string) => {
    setOrderArticleList((prevArt) =>
      prevArt.filter((art) => art.detail.ref !== ref)
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

  return (
    <form className="max-w-md">
      <div className="border-b border-gray-900/10 pb-8">
        <span className="text-base font-semibold leading-7 text-gray-900 block">
          {/* {title} */}
          New Article
        </span>
        <span className="mt-1 text-sm leading-6 text-gray-600 mb-8 block">
          {/* {subtitle} */}
          Please fill the following fields to create a new Order
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
      <ul role="list" className="divide-y divide-gray-300 max-w-lg mx-auto">
        {orderArticleList.map(({ detail }) => {
          const { name, priceAfterTaxes, priceNoTaxes, ref } = detail;
          return (
            <OrderArticleItem
              key={ref}
              name={name}
              articleRef={ref}
              priceAfterTaxes={priceAfterTaxes}
              priceBeforeTaxes={priceNoTaxes}
              quantity={1}
              deleteAction={removeArticleFromOrder}
            />
          );
        })}
      </ul>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        {/* {onCancelHandler && (
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={onCancelHandler}
          >
            Cancel
          </button>
        )} */}
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Finish and Save
        </button>
      </div>
    </form>
  );
}

export default orderForm;
