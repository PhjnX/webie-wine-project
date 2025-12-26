// src/pages/ShopPage.tsx
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaCartPlus,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { PRODUCTS_DATA } from "../data/mockData";

const CATEGORIES = [
  { id: "all", label: "All Spirits" },
  { id: "whiskey", label: "Whiskey" },
  { id: "red-wine", label: "Red Wine" },
  { id: "white-wine", label: "White Wine" },
  { id: "champagne", label: "Champagne" },
  { id: "vodka", label: "Vodka" },
  { id: "gin", label: "Gin" },
  { id: "rum", label: "Rum" },
];

const ITEMS_PER_PAGE = 12;

export default function ShopPage() {
  const navigate = useNavigate();

  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(100000000); 
  const [sortOption, setSortOption] = useState("default"); 
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let data = PRODUCTS_DATA;

    if (filterCategory !== "all") {
      data = data.filter((p) => p.category === filterCategory);
    }

    if (searchQuery) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    data = data.filter((p) => p.price <= priceRange);

    if (sortOption === "price-asc") {
      data = [...data].sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      data = [...data].sort((a, b) => b.price - a.price);
    }

    return data;
  }, [filterCategory, searchQuery, priceRange, sortOption]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filterCategory, searchQuery, priceRange, sortOption]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black">
      <Header />

      <div className="relative pt-32 pb-12 bg-linear-to-b from-[#111] to-[#050505] border-b border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">
            The Cellar Collection
          </h1>
          <p className="text-white/50 text-sm">
            Khám phá hơn 100+ loại rượu thượng hạng
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        <aside
          className={`lg:w-1/4 lg:block ${
            isMobileFilterOpen ? "block" : "hidden"
          }`}
        >
          <div className="sticky top-24 space-y-10">
            <div>
              <h3 className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs mb-4">
                Search
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Find your bottle..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              </div>
            </div>

            {/* CATEGORIES */}
            <div>
              <h3 className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs mb-4">
                Categories
              </h3>
              <div className="flex flex-col gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilterCategory(cat.id)}
                    className={`text-left text-sm py-2 px-3 rounded transition-all flex justify-between items-center group ${
                      filterCategory === cat.id
                        ? "bg-[#D4AF37] text-black font-bold"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {cat.label}
                    {filterCategory === cat.id && <FaCheck size={10} />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs mb-4">
                Max Price
              </h3>
              <input
                type="range"
                min="500000"
                max="10000000"
                step="500000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
              <div className="flex justify-between text-xs text-white/50 mt-2">
                <span>0 ₫</span>
                <span className="text-[#D4AF37] font-bold">
                  {priceRange.toLocaleString()} ₫
                </span>
              </div>
            </div>
          </div>
        </aside>

        <main className="lg:w-3/4">
          {/* TOOLBAR */}
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4 bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
            <p className="text-white/50 text-sm">
              Showing{" "}
              <span className="text-white font-bold">
                {currentProducts.length}
              </span>{" "}
              of {filteredProducts.length} products
            </p>

            <div className="flex items-center gap-4">
              <button
                className="lg:hidden flex items-center gap-2 text-xs font-bold uppercase hover:text-[#D4AF37]"
                onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
              >
                <FaFilter /> Filter
              </button>

              <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                <span className="text-xs text-white/40 uppercase hidden sm:inline">
                  Sort by:
                </span>
                <div className="relative group">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="bg-transparent text-sm font-bold text-white focus:outline-none cursor-pointer appearance-none pr-6"
                  >
                    <option value="default" className="bg-[#111]">
                      Featured
                    </option>
                    <option value="price-asc" className="bg-[#111]">
                      Price: Low to High
                    </option>
                    <option value="price-desc" className="bg-[#111]">
                      Price: High to Low
                    </option>
                  </select>
                  <FaSortAmountDown className="absolute right-0 top-1/2 -translate-y-1/2 text-[#D4AF37] text-xs pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 min-h-[500px]">
            <AnimatePresence mode="popLayout">
              {currentProducts.length > 0 ? (
                currentProducts.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    <div className="relative bg-[#0a0a0a] border border-white/10 h-[360px] rounded-sm overflow-hidden hover:border-[#D4AF37] transition-all duration-300">
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <div className="absolute w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-[75%] object-contain drop-shadow-xl group-hover:scale-110 group-hover:-rotate-2 group-hover:-translate-y-2 transition-transform duration-500 ease-out"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://www.thecocktaildb.com/images/ingredients/Scotch.png";
                          }}
                        />
                      </div>

                      <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button className="w-full bg-[#D4AF37] text-black font-bold uppercase text-[10px] py-4 hover:bg-white transition-colors flex items-center justify-center gap-2 tracking-widest">
                          <FaCartPlus /> Add to Cart
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 text-center px-2">
                      <h3 className="text-lg font-serif text-white group-hover:text-[#D4AF37] transition-colors leading-tight mb-2 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-white/50 text-sm font-medium tracking-wide">
                        {item.price.toLocaleString()} ₫
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <div className="text-6xl mb-4">🍷</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    No products match
                  </h3>
                  <button
                    onClick={() => {
                      setFilterCategory("all");
                      setSearchQuery("");
                      setPriceRange(100000000);
                    }}
                    className="text-[#D4AF37] border-b border-[#D4AF37] text-sm"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-16 gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-white hover:border-[#D4AF37] disabled:opacity-30 disabled:hover:border-white/10"
              >
                <FaChevronLeft size={10} />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 border flex items-center justify-center text-sm font-bold transition-colors ${
                    currentPage === i + 1
                      ? "bg-[#D4AF37] border-[#D4AF37] text-black"
                      : "border-white/10 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-white hover:border-[#D4AF37] disabled:opacity-30 disabled:hover:border-white/10"
              >
                <FaChevronRight size={10} />
              </button>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
