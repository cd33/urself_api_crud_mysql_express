import { FC } from "react";
import { Outlet, Link } from "react-router-dom";

const Navbar: FC<{ token: string }> = ({ token }) => (
  <div>
    <nav>
      <ul className="topnav">
        {token ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="right">
              <a href="/">
                <span onClick={() => localStorage.removeItem("token")}>
                  Logout
                </span>
              </a>
            </li>
          </>
        ) : (
          <>
            <li className="right">
              <Link to="/login">Login</Link>
            </li>
            <li className="right">
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
    <div className="wrapper">
      <Outlet />
    </div>
  </div>
);

export default Navbar;
