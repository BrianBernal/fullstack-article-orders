import SelectList from "@/components/selectList/SelectList";
import { fetchArticlesAction } from "@/features/articles/state/articleSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";

function orderForm() {
  const articles = useAppSelector((state) => state.articles.list);
  const dispatch = useAppDispatch();
  const selectorValues = articles.map(({ detail }) => ({
    name: detail.name,
    value: detail.ref,
  }));
  const [selectedArticle, setSelectedArticle] = useState(selectorValues[0]);

  useEffect(() => {
    if (!selectedArticle) {
      dispatch(fetchArticlesAction());
    }
  }, [selectedArticle]);

  useEffect(() => {
    if (!selectedArticle) {
      setSelectedArticle(selectorValues[0]);
    }
  }, [articles.length]);

  if (!selectedArticle)
    return <span className="block m-4">Loading articles...</span>;

  const selectorArticle = (art: typeof selectedArticle) => {
    setSelectedArticle(art);
  };

  return (
    <form className="max-w-md">
      <div>
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
                setSelected={selectorArticle}
              />
            </div>
          </div>
        </div>
      </div>

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
