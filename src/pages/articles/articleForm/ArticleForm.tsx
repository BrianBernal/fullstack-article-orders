// libraries
import { useForm, SubmitHandler } from "react-hook-form";

// types
import { TArticleForm } from "./types";

const DEFAULT_INITIAL_DATA_FORM = {
  name: "",
  description: "",
  priceNoTaxes: 0,
  taxPercentage: 0,
  stock: 0,
};

type Inputs = typeof DEFAULT_INITIAL_DATA_FORM;

function ArticleForm({
  title,
  subtitle,
  initialData = DEFAULT_INITIAL_DATA_FORM,
  onSubmitHandler,
  onCancelHandler,
}: TArticleForm) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: initialData });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onSubmitHandler(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
      <div className="">
        <div className="border-b border-gray-900/10 pb-8">
          <span className="text-base font-semibold leading-7 text-gray-900">
            {title}
          </span>
          <span className="mt-1 text-sm leading-6 text-gray-600 mb-8">
            {subtitle}
          </span>

          <div className="col-span-full">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Product Name
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("name", { required: true, maxLength: 20 })}
              />
              {errors.name && (
                <span className="mt-3 text-sm leading-6 text-red-700">
                  Required. Up to 20 characters.
                </span>
              )}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Description up to 100 characters..."
                  {...register("description", {
                    required: true,
                    maxLength: 100,
                  })}
                ></textarea>
              </div>
              {errors.description && (
                <span className="mt-3 text-sm leading-6 text-red-700">
                  Required. Up to 100 characters.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="border-gray-900/10 pb-2 mt-2">
          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="priceNoTaxes"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price before taxes
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("priceNoTaxes", {
                    required: true,
                    min: 1,
                    max: 1000000000,
                  })}
                />
                {errors.priceNoTaxes && (
                  <span className="mt-3 text-sm leading-6 text-red-700">
                    Must be a number major than 0
                  </span>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="taxPercentage"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tax (0 - 100)
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="number"
                  {...register("taxPercentage", {
                    required: true,
                    min: 1,
                    max: 99,
                  })}
                />
                {errors.taxPercentage && (
                  <span className="mt-3 text-sm leading-6 text-red-700">
                    Must be a number between 0 - 100
                  </span>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Stock
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("stock", {
                    required: true,
                    min: 1,
                    max: 100000,
                  })}
                />
                {errors.stock && (
                  <span className="mt-3 text-sm leading-6 text-red-700">
                    Must be a number major than 0
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
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
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default ArticleForm;
