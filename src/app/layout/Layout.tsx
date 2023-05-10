// libraries
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/articles">Articles</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
        </ul>
      </nav>

      <hr />
      <Outlet />
    </div>
  );
}

export default Layout;
