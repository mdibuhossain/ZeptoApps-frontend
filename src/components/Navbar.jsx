import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/logo.svg";

function Navbar() {
  return (
    <header className="p-4">
      <div className="container flex justify-between h-16 mx-auto">
        <Link
          rel="noopener noreferrer"
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img src={Logo} alt="Logo" className="w-16 h-16" />
        </Link>
        <ul className="items-stretch hidden space-x-3 md:flex">
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-violet-600 border-violet-600 flex items-center px-4 -mb-1 border-b-2"
                  : "flex items-center px-4 -mb-1 border-b-2"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="wishlist"
              className={({ isActive }) =>
                isActive
                  ? "text-violet-600 border-violet-600 flex items-center px-4 -mb-1 border-b-2"
                  : "flex items-center px-4 -mb-1 border-b-2"
              }
            >
              Wishlist
            </NavLink>
          </li>
        </ul>
        <button className="flex justify-end p-4 md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
