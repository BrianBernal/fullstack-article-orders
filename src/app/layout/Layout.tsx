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
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default Layout;
