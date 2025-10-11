import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add this
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Scan", path: "/scan" },
    { name: "History", path: "/history" },
    { name: "About", path: "/about" },
   
  ];

  const handleLogout = () => {
    // Clear user session / token here
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-2xl font-extrabold text-green-600 tracking-wide">
                CERESAI
              </span>
            </div>

            {/* Navigation (Desktop) */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, idx) => (
                <NavLink
                  key={idx}
                  to={item.path}
                  className={({ isActive }) =>
                    `font-medium transition-colors ${
                      isActive
                        ? "text-green-600"
                        : "text-gray-700 hover:text-green-600"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Buttons (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="text-gray-700 hover:text-green-600 transition-colors"
                  >
                    Login
                  </button>
                  <button  onClick={() => navigate("/register")} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-transform hover:scale-105">
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/profile")}
                    className="text-gray-700 hover:text-green-600 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-500 transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-green-600 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-2 space-y-2 pb-4 border-b border-green-100">
              {navItems.map((item, idx) => (
                <NavLink
                  key={idx}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md font-medium transition-colors ${
                      isActive
                        ? "bg-green-100 text-green-600"
                        : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              {/* Mobile Right Buttons */}
              <div className="flex space-x-4 px-4 pt-2">
                {!isLoggedIn ? (
                  <>
                    <button
                      onClick={() => navigate("/login")}
                      className="text-gray-700 hover:text-green-600 transition-colors"
                    >
                      Login
                    </button>
                    <button   onClick={() => navigate("/register")} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-transform hover:scale-105">
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/profile")}
                      className="text-gray-700 hover:text-green-600 transition-colors"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-red-500 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Page Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-black text-gray-400 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">CERESAI</span>
          </div>

          <div>
            <p>Email: support@ceresai.com</p>
            <p>Phone: +1 234 567 890</p>
            <p>123 Green Lane, Agro City</p>
          </div>

          <div className="flex space-x-5">
            {["Twitter", "Facebook", "Instagram", "LinkedIn"].map((s, i) => (
              <a
                key={i}
                href="#"
                className="hover:text-green-400 transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm pb-4">
          © {new Date().getFullYear()} CERESAI. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Layout;
