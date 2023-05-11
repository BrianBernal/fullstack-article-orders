import { useState } from "react";

function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const handleLanguage = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative ml-3">
      <button
        className="text-sm leading-6 text-white hover:bg-gray-500 p-1 rounded-md"
        onClick={handleLanguage}
      >
        Language <span>&darr;</span>
      </button>
      {isOpen && (
        <ul
          className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          <button className="hover:bg-gray-100 w-full">
            <li className="block px-4 py-2 text-sm text-gray-700">English</li>
          </button>
          <button className="hover:bg-gray-100 w-full">
            <li className="block px-4 py-2 text-sm text-gray-700">Spanish</li>
          </button>
        </ul>
      )}
    </div>
  );
}

export default LanguageSelector;
