import Header from "@/components/header/Header";
import { useGetArticles } from "@/hooks/useServices";

function Articles() {
  const { response, loading } = useGetArticles();
  const { data: articles } = response;

  return (
    <>
      <Header title="Article List" />
      <ul role="list" className="divide-y divide-gray-300 max-w-lg mx-auto">
        {loading && "loading..."}
        {!response.ok && !loading && <p>Articles not found.</p>}
        {articles?.map((art) => {
          const { detail, stock } = art;
          const { description, name, priceNoTaxes, ref } = detail;
          return (
            <li key={ref} className="flex justify-between gap-x-6 py-5">
              <div className="flex gap-x-4 w-64">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {name}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {description}
                  </p>
                </div>
              </div>
              <div className="sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  Price before taxes
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  $ {priceNoTaxes}
                </p>
              </div>
              <div className="sm:flex sm:flex-col sm:items-end">
                <button
                  type="button"
                  className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  Edit
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Articles;
