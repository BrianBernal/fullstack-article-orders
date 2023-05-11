import { Link } from "react-router-dom";

function LanguageSelector() {
  return (
    <div className="relative ml-3">
      <div>
        <button
          type="button"
          className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span className="sr-only">Open user menu</span>
          <Link
            to=""
            className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
            aria-current="page"
          >
            LANGUAGE
          </Link>
        </button>
      </div>
      <div
        className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabIndex={-1}
      >
        <Link
          to=""
          className="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabIndex={-1}
          id="user-menu-item-0"
        >
          English
        </Link>
        <Link
          to=""
          className="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabIndex={-1}
          id="user-menu-item-1"
        >
          Spanish
        </Link>
      </div>
    </div>
  );
}

export default LanguageSelector;
