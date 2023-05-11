import { Link } from "react-router-dom";
import LanguageSelector from "./languageSelector/LanguageSelector";

function Navbar() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center">
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/articles"
                className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                aria-current="page"
              >
                Articles
              </Link>
              <Link
                to="/orders"
                className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                Orders
              </Link>
            </div>
          </div>
        </div>
        <div className="-mr-2 flex">
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
}
export default Navbar;
