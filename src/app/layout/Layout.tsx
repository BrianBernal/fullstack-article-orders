// libraries
import { Outlet } from "react-router-dom";

// components
import NavbarDesktop from "./navbar/desktop/Navbar";
import NavbarMobile from "./navbar/mobile/Navbar";

function Layout() {
  return (
    <>
      <nav className="bg-gray-800">
        <NavbarDesktop />
        <NavbarMobile />
      </nav>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 mb-8">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default Layout;
