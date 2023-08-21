import { NavLink, redirect } from "react-router-dom";
const Navbar = () => {
  const logout = () => {
    localStorage.clear();
    redirect("/login");
  };
  return (
    <>
      <div className="navbar bg-gray-100">
        <div className="navbar-start">
          <div className="dropdown z-10">
            <label tabIndex="0" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/">Homepage</NavLink>
              </li>
              <li>
                <NavLink to="/category">Category</NavLink>
              </li>
              <li>
                <NavLink to="/addadmin">Register Admin</NavLink>
              </li>
              <li>
                <NavLink to="/login" onClick={logout}>
                  Sign out
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <h1 className="text-3xl font-bold text-center text-blue-400 py-4">
            Welcome Admin of <span className="text-black">HACK</span>
          </h1>
        </div>
        <div className="navbar-end"></div>
      </div>
    </>
  );
};

export default Navbar;
