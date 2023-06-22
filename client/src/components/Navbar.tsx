import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul className="topnav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="right">
            <Link to="/login">Login</Link>
          </li>
          <li className="right">
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
      <div className="wrapper">
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
