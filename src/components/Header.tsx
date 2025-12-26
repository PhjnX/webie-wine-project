import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FaShoppingBag,
  FaSearch,
  FaBars,
  FaChevronDown,
  FaUser,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // Import Context
import LoginModal from "./LoginModal"; // Import Modal

const MENU_ITEMS = {
  wines: [
    { name: "Red Wine", path: "/collections/red-wine" },
    { name: "White Wine", path: "/collections/white-wine" },
    { name: "Champagne", path: "/collections/champagne" },
  ],
  spirits: [
    { name: "Whiskey", path: "/collections/whiskey" },
    { name: "Vodka", path: "/collections/vodka" },
    { name: "Gin", path: "/collections/gin" },
    { name: "Rum", path: "/collections/rum" },
  ],
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isCollectionsActive = location.pathname.includes("/collections");

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-md border-white/10 py-4 shadow-2xl"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link
            to="/"
            className="group flex items-center gap-4 select-none z-50"
          >
            <div className="relative w-11 h-11 flex items-center justify-center">
              <div className="absolute inset-0 border-[1.5px] border-[#D4AF37] rotate-45 transition-transform duration-700 group-hover:rotate-0"></div>
              <span className="font-['Cinzel'] text-xl font-semibold text-[#D4AF37] relative z-10 transition-transform duration-700 -rotate-45 group-hover:rotate-0">
                W
              </span>
            </div>

            {/* TEXT PART */}
            <div className="flex flex-col justify-center">
              <h1 className="font-['Cinzel'] text-3xl font-normal text-white tracking-widest leading-none transition-colors group-hover:text-[#D4AF37]">
                WEBIE
              </h1>
              <div className="flex items-center justify-between w-full mt-1">
                <span className="h-px w-3 bg-[#D4AF37]/50"></span>
                <span className="font-['Montserrat'] text-[9px] font-medium text-[#D4AF37] tracking-[0.3em] uppercase">
                  CELLAR
                </span>
                <span className="h-px w-3 bg-[#D4AF37]/50"></span>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${
                  isActive
                    ? "text-[#D4AF37]"
                    : "text-white hover:text-[#D4AF37]"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${
                  isActive
                    ? "text-[#D4AF37]"
                    : "text-white hover:text-[#D4AF37]"
                }`
              }
            >
              About
            </NavLink>

            <div className="group relative py-4">
              <button
                className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${
                  isCollectionsActive
                    ? "text-[#D4AF37]"
                    : "text-white hover:text-[#D4AF37]"
                }`}
              >
                Collections{" "}
                <FaChevronDown
                  size={8}
                  className="group-hover:rotate-180 transition-transform"
                />
              </button>

              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-[#0a0a0a] border border-white/10 rounded-xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9)] opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 backdrop-blur-xl">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0a0a0a] border-t border-l border-white/10 rotate-45"></div>

                <div className="grid grid-cols-2 gap-12 relative z-10">
                  <div>
                    <h3 className="text-[#D4AF37] font-serif text-lg mb-4 border-b border-white/10 pb-2">
                      Fine Wines
                    </h3>
                    <div className="flex flex-col gap-3">
                      {MENU_ITEMS.wines.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.path}
                          className={({ isActive }) =>
                            `text-sm font-light flex items-center gap-2 group/link transition-all hover:translate-x-1 ${
                              isActive
                                ? "text-white font-medium"
                                : "text-white/60 hover:text-white"
                            }`
                          }
                        >
                          <span className="w-1 h-1 bg-[#D4AF37] rounded-full opacity-0 group-hover/link:opacity-100 transition-opacity"></span>
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[#D4AF37] font-serif text-lg mb-4 border-b border-white/10 pb-2">
                      Premium Spirits
                    </h3>
                    <div className="flex flex-col gap-3">
                      {MENU_ITEMS.spirits.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.path}
                          className={({ isActive }) =>
                            `text-sm font-light flex items-center gap-2 group/link transition-all hover:translate-x-1 ${
                              isActive
                                ? "text-white font-medium"
                                : "text-white/60 hover:text-white"
                            }`
                          }
                        >
                          <span className="w-1 h-1 bg-[#D4AF37] rounded-full opacity-0 group-hover/link:opacity-100 transition-opacity"></span>
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                  <Link
                    to="/collections/all-products"
                    className="text-[10px] uppercase tracking-widest text-[#D4AF37] hover:underline underline-offset-4"
                  >
                    View All Products
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <div className="flex items-center gap-6 md:gap-8 text-white">
            <button className="hover:text-[#D4AF37] transition-colors">
              <FaSearch size={18} />
            </button>

            {user ? (
              // Đã đăng nhập: Hiện Avatar + Nút Logout
              <div className="flex items-center gap-3 group relative">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D4AF37] p-[1px] cursor-pointer hover:scale-110 transition-transform">
                  <img
                    src={user.avatar || "https://ui-avatars.com/api/?name=User"}
                    alt={user.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <button
                  onClick={logout}
                  className="text-[10px] uppercase tracking-widest hover:text-[#D4AF37] transition-colors border-l border-white/20 pl-3"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="hover:text-[#D4AF37] transition-colors"
              >
                <FaUser size={18} />
              </button>
            )}

            <Link
              to="/order"
              className="group relative flex items-center gap-2 hover:text-[#D4AF37] transition-colors"
            >
              <FaShoppingBag size={18} />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#D4AF37] text-black text-[9px] font-bold flex items-center justify-center rounded-full">
                2
              </span>
            </Link>
            <button className="md:hidden">
              <FaBars size={22} />
            </button>
          </div>
        </div>
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
