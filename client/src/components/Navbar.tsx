import { Outlet, Link } from "react-router-dom";
import useToken from "../utils/useToken";

const Navbar = () => {
  const { token, setToken } = useToken();

  return (
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
                  <span onClick={() => setToken("")}>Logout</span>
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
};

export default Navbar;
