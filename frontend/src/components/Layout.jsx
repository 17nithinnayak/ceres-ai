
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
     { name: "Scan", path: "/scan" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "History", path: "/history" },
    {name:"Schemes", path:"/schemes"},
    //  { name: "About", path: "/about" }
     {name:"Market-Analysis",path:"/market"}
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="bg-gray-950 min-h-screen">
      
<header className="bg-gray-800 shadow-[0_4px_15px_rgba(0,0,0,0.3)] sticky top-0 z-50 border-b-2 border-grey-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            <div
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Leaf className="text-green-500 w-6 h-6" />
              <span className="text-xl font-semibold text-white">
                CERESAI
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, idx) => (
                <NavLink
                  key={idx}
                  to={item.path}
                  className={({ isActive }) =>
                    `font-medium transition-colors ${
                      isActive
                        ? "text-green-400 border-b-2 border-green-500 pb-1" // Highlight current page with border
                        : "text-gray-400 hover:text-green-400"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
             
            <div className="hidden md:flex items-center space-x-4">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-transform hover:scale-105"
                  >
                    Signup
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/profile")}
                    className="text-gray-400 hover:text-green-400 transition-colors"
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
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-400 hover:text-green-400 focus:outline-none"
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

          {isOpen && (
            <div className="md:hidden mt-2 space-y-2 pb-4 border-b border-gray-700 bg-gray-900">
              {navItems.map((item, idx) => (
                <NavLink
                  key={idx}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md font-medium transition-colors ${
                      isActive
                        ? "bg-green-800 text-green-400"
                        : "text-gray-300 hover:bg-gray-800 hover:text-green-400"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              <div className="flex space-x-4 px-4 pt-2 border-t border-gray-800">
                {!isLoggedIn ? (
                  <>
                    <button
                      onClick={() => {navigate("/login"); setIsOpen(false);}}
                      className="text-gray-300 hover:text-green-400 transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {navigate("/register"); setIsOpen(false);}}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-transform"
                    >
                      Get Started
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {navigate("/profile"); setIsOpen(false);}}
                      className="text-gray-300 hover:text-green-400 transition-colors"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {handleLogout(); setIsOpen(false);}}
                      className="text-gray-300 hover:text-red-500 transition-colors"
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

      {/* Footer (Fixed Logo Position) */}
      <footer className="bg-gray-900 text-gray-400 mt-20 border-t border-green-800">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">
          
          {/* Footer Logo and contact info grouped */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="text-green-500 w-6 h-6" />
              <span className="text-xl font-semibold text-green-400">
                CERESAI
              </span>
            </div>
            <div className="text-sm">
                <p>Email: <a href="mailto:support@ceresai.com" className="hover:text-green-400">support@ceresai.com</a></p>
                <p>Phone: +1 234 567 890</p>
                <p>123 Green Lane, Agro City</p>
            </div>
          </div>


          {/* Navigation Links for Footer (optional but good practice) */}
          <div className="flex flex-col space-y-2 text-sm">
            <h5 className="font-semibold text-white mb-2">Quick Links</h5>
            {navItems.map((item, idx) => (
                <NavLink
                    key={`footer-${idx}`}
                    to={item.path}
                    className="text-gray-400 hover:text-green-400 transition-colors"
                >
                    {item.name}
                </NavLink>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex flex-col space-y-4">
            <h5 className="font-semibold text-white">Connect</h5>
            <div className="flex space-x-6">
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  {/* Twitter/X icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.59-2.46.69a4.22 4.22 0 001.85-2.33 8.27 8.27 0 01-2.65 1.02A4.15 4.15 0 0016.1 4a4.16 4.16 0 00-4.17 4.17c0 .33.04.65.11.96A11.79 11.79 0 013 5.16a4.17 4.17 0 001.29 5.56 4.09 4.09 0 01-1.89-.52v.05a4.16 4.16 0 003.34 4.08 4.23 4.23 0 01-1.88.07 4.18 4.18 0 003.9 2.9A8.36 8.36 0 012 19.54a11.79 11.79 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.68v-.53A8.36 8.36 0 0024 5.5a8.19 8.19 0 01-2.36.65 4.12 4.12 0 001.82-2.27z" />
                  </svg>
                </a>

                <a
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  {/* Facebook icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5a3.5 3.5 0 013.7-3.9c1.06 0 2.2.18 2.2.18v2.4h-1.2a1.4 1.4 0 00-1.6 1.5V12H18l-.5 3h-2.9v7A10 10 0 0022 12z" />
                  </svg>
                </a>

                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  {/* Instagram icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3.5a5.5 5.5 0 105.5 5.5A5.51 5.51 0 0012 7.5zm0 9a3.5 3.5 0 113.5-3.5A3.5 3.5 0 0112 16.5zm4.75-8.88a1.12 1.12 0 11-1.12-1.12 1.12 1.12 0 011.12 1.12z" />
                  </svg>
                </a>

                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  {/* LinkedIn icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5A2.5 2.5 0 107.48 6 2.5 2.5 0 004.98 3.5zM3 8h4v13H3zM9 8h3.6v1.7h.05A3.95 3.95 0 0116 8c3.1 0 3.67 2 3.67 4.5V21h-4v-6.5c0-1.55-.03-3.55-2.17-3.55S11 12.77 11 14.4V21H7V8z" />
                  </svg>
                </a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-600 text-sm pb-4 border-t border-gray-800 pt-4">
          © {new Date().getFullYear()} CERESAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
