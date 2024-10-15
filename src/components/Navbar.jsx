import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="py-4 max-w-5xl mx-auto">
      <div className="flex justify-between h-16 mx-auto">
        <Link
          rel="noopener noreferrer"
          to="/"
          aria-label="Back to homepage"
          className="flex items-center py-2"
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
                `flex items-center px-4 -mb-1 border-b-2 ${
                  isActive ? "text-violet-600 border-violet-600" : ""
                }`
              }
            >
              Wishlist
            </NavLink>
          </li>
        </ul>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex justify-end p-4 md:hidden"
        >
          {!isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M4 22h-4v-4h4v4zm0-12h-4v4h4v-4zm0-8h-4v4h4v-4zm3 0v4h17v-4h-17zm0 12h17v-4h-17v4zm0 8h17v-4h-17v4z" />
            </svg>
          )}
        </button>
      </div>
      <div
        className={`md:hidden w-full rounded-md overflow-hidden  ${
          isOpen ? "animate-expand" : "animate-collapse"
        }`}
      >
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
          <li>
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block py-2 px-3 ${
                  isActive ? "text-white bg-violet-600 rounded" : ""
                }`
              }
              aria-current="page"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/wishlist"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block py-2 px-3 ${
                  isActive ? "text-white bg-violet-600 rounded" : ""
                }`
              }
            >
              Wishlist
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
