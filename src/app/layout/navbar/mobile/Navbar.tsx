import { getNavLinkClass } from "@/utils/getNavLinkClass";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="md:hidden" id="mobile-menu">
      <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        <NavLink to="/articles" className={getNavLinkClass}>
          Articles
        </NavLink>
        <NavLink to="/orders" className={getNavLinkClass}>
          Orders
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
