import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="md:hidden" id="mobile-menu">
      <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        <Link
          to="/articles"
          className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
          aria-current="page"
        >
          Articles
        </Link>
        <Link
          to="/orders"
          className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
        >
          Orders
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
