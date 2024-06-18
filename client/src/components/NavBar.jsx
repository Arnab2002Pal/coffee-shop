import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaStore } from "react-icons/fa";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed w-full z-30 bg-teal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-white">
              CoffeeShop
            </a>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 space-x-4 text-white cursor-pointer hover:border-b-2 hover:border-solid flex flex-row justify-center items-center">
                <Link to={"/register"}>Register Your Store</Link>
                <FaStore />
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-transparent inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className={`${isOpen ? "hidden" : "block"} inline-flex`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  className={`${isOpen ? "block" : "hidden"} inline-flex`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden ${isOpen ? "block hover:bg-teal-700" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-white flex justify-center items-center">
          <Link to={"/register"}>Register Your Store</Link>
          <FaStore />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
