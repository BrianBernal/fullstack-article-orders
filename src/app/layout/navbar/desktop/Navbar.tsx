// libraries
import { NavLink } from "react-router-dom";

// utils
import { getNavLinkClass } from "@/utils/getNavLinkClass";

// components
import LanguageSelector from "./languageSelector/LanguageSelector";

function Navbar() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center">
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/articles" className={getNavLinkClass}>
                Articles
              </NavLink>
              <NavLink to="/orders" className={getNavLinkClass}>
                Orders
              </NavLink>
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
