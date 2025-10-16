import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Leaf } from "lucide-react";
import supabase from "../supabaseClient";

// Translations
const translations = {
  en: {
    navItems: [
      { name: "Home", path: "/" },
      { name: "Scan", path: "/scan" },
      { name: "Dashboard", path: "/dashboard" },
      { name: "History", path: "/history" },
      { name: "Schemes", path: "/schemes" },
      { name: "Market-Analysis", path: "/market" },
    ],
    login: "Login",
    signup: "Signup",
    profile: "Profile",
    logout: "Logout",
    getStarted: "Get Started",
    footer: {
      quickLinks: "Quick Links",
      connect: "Connect",
      email: "Email",
      phone: "Phone",
      address: "123 Green Lane, Agro City",
    },
  },
  kn: {
    navItems: [
      { name: "ಮನೆ", path: "/" },
      { name: "ಸ್ಕ್ಯಾನ್", path: "/scan" },
      { name: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", path: "/dashboard" },
      { name: "ಇತಿಹಾಸ", path: "/history" },
      { name: "ಯೋಜನೆಗಳು", path: "/schemes" },
      { name: "ಮಾರ್ಕೆಟ್ ವಿಶ್ಲೇಷಣೆ", path: "/market" },
    ],
    login: "ಲಾಗಿನ್",
    signup: "ಸೈನ್ ಅಪ್",
    profile: "ಪ್ರೊಫೈಲ್",
    logout: "ಲಾಗ್ ಔಟ್",
    getStarted: "ಪ್ರಾರಂಭಿಸಿ",
    footer: {
      quickLinks: "ವೇಗದ ಲಿಂಕ್‌ಗಳು",
      connect: "ಸಂಪರ್ಕಿಸಿ",
      email: "ಇಮೇಲ್",
      phone: "ದೂರವಾಣಿ",
      address: "123 ಗ್ರೀನ್ ಲೇನ್, ಅಗ್ರೋ ನಗರ",
    },
  },
};

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState("en");
  const t = translations[lang];
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Detect current route

  // Supabase auth listener
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  const toggleLang = () => setLang(lang === "en" ? "kn" : "en");

  return (
    <div className="bg-gray-950 min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 shadow-[0_4px_15px_rgba(0,0,0,0.3)] sticky top-0 z-50 border-b-2 border-grey-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Leaf className="text-green-500 w-6 h-6" />
              <span className="text-xl font-semibold text-white">CERESAI</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {t.navItems.map((item, idx) => (
                <NavLink
                  key={idx}
                  to={item.path}
                  className={({ isActive }) =>
                    `font-medium transition-colors ${
                      isActive
                        ? "text-green-400 border-b-2 border-green-500 pb-1"
                        : "text-gray-400 hover:text-green-400"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Auth / Profile */}
            <div className="hidden md:flex items-center space-x-4">
              {!user ? (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    {t.login}
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-transform hover:scale-105"
                  >
                    {t.signup}
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => navigate("/profile")} className="text-gray-400 hover:text-green-400 transition-colors" > <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> </svg> </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-transform hover:scale-105"
                  >
                    {t.logout}
                  </button>
                </>
              )}
              {/* Language Toggle */}
              <button
                onClick={toggleLang}
                className="text-gray-400 hover:text-green-400 transition-colors ml-2"
              >
                {lang === "en" ? "ಕನ್ನಡ" : "EN"}
              </button>
            </div>

            {/* Mobile Menu Button */}
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

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-2 space-y-2 pb-4 border-b border-gray-700 bg-gray-900">
              {t.navItems.map((item, idx) => (
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
                {!user ? (
                  <>
                    <button
                      onClick={() => {
                        navigate("/login");
                        setIsOpen(false);
                      }}
                      className="text-gray-300 hover:text-green-400 transition-colors"
                    >
                      {t.login}
                    </button>
                    <button
                      onClick={() => {
                        navigate("/register");
                        setIsOpen(false);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-transform"
                    >
                      {t.getStarted}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setIsOpen(false);
                      }}
                      className="text-gray-300 hover:text-green-400 transition-colors"
                    >
                      {t.profile}
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      {t.logout}
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    toggleLang();
                    setIsOpen(false);
                  }}
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  {lang === "en" ? "ಕನ್ನಡ" : "EN"}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Page Content */}
      <main>
  {location.pathname === "/" || location.pathname === "/scan"
    ? React.cloneElement(children, { lang })
    : children}
</main>


      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 mt-20 border-t border-green-800">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="text-green-500 w-6 h-6" />
              <span className="text-xl font-semibold text-green-400">
                CERESAI
              </span>
            </div>
            <div className="text-sm">
              <p>
                {t.footer.email}:{" "}
                <a
                  href="mailto:support@ceresai.com"
                  className="hover:text-green-400"
                >
                  support@ceresai.com
                </a>
              </p>
              <p>{t.footer.phone}: +1 234 567 890</p>
              <p>{t.footer.address}</p>
            </div>
          </div>

          <div className="flex flex-col space-y-2 text-sm">
            <h5 className="font-semibold text-white mb-2">
              {t.footer.quickLinks}
            </h5>
            {t.navItems.map((item, idx) => (
              <NavLink
                key={`footer-${idx}`}
                to={item.path}
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="flex flex-col space-y-4">
            <h5 className="font-semibold text-white">{t.footer.connect}</h5>
            <div className="flex space-x-6">
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.59-2.46.69a4.22 4.22 0 001.85-2.33 8.27 8.27 0 01-2.65 1.02A4.15 4.15 0 0016.1 4a4.16 4.16 0 00-4.17 4.17c0 .33.04.65.11.96A11.79 11.79 0 013 5.16a4.17 4.17 0 001.29 5.56 4.09 4.09 0 01-1.89-.52v.05a4.16 4.16 0 003.34 4.08 4.23 4.23 0 01-1.88.07 4.18 4.18 0 003.9 2.9A8.36 8.36 0 012 19.54a11.79 11.79 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.68v-.53A8.36 8.36 0 0024 5.5a8.19 8.19 0 01-2.36.65 4.12 4.12 0 001.82-2.27z" />
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