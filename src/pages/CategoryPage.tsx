import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCartPlus,
  FaFilter,
  FaSortAmountDown,
  FaWineGlassAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { PRODUCTS_DATA } from "../data/mockData";

import RedWineBanner from "../assets/images/redwine_banner.jpg";
import WhiskeyBanner from "../assets/images/whiskey_banner.jpg";
import WineBanner from "../assets/images/all_wine_banner.jpg";
import WhiteWineBanner from "../assets/images/white_wine.jpg";
import ChampagneWineBanner from "../assets/images/champagnewine_banner.jpg";
import VodkaWineBanner from "../assets/images/vodkawine_banner.jpg";

const ITEMS_PER_PAGE = 10;

const CATEGORY_INFO: Record<
  string,
  { title: string; desc: string; banner: string }
> = {
  "all-products": {
    title: "Grand Collection",
    desc: "Explore Webie Cellar's entire treasure trove of premium flavors. From ancient wine cellars to strong wines full of personality.",
    banner: WineBanner,
  },
  "red-wine": {
    title: "Red Wines",
    desc: "Explore the rich, seductive world of red wines from Bordeaux to Napa Valley.",
    banner: RedWineBanner,
  },
  "white-wine": {
    title: "White Wines",
    desc: "Explore the fresh, crisp world of renowned Chardonnay and Sauvignon Blanc grapes.",
    banner: WhiteWineBanner,
  },
  champagne: {
    title: "Fine Champagne",
    desc: "The symbol of celebration and high-class luxury from the Champagne region of France.",
    banner: ChampagneWineBanner,
  },
  whiskey: {
    title: "Premium Whiskey",
    desc: "From smoky Scottish Single Malts to sweet American Bourbons.",
    banner: WhiskeyBanner,
  },
  cognac: {
    title: "Exquisite Cognac",
    desc: "The noble spirit aged for years in French oak barrels.",
    banner:
      "https://images.unsplash.com/photo-1615887023516-9b6bcd559e87?q=80&w=1600&auto=format&fit=crop",
  },
  vodka: {
    title: "Luxury Vodka",
    desc: "Absolute purity, perfect for every classy cocktail.",
    banner: VodkaWineBanner,
  },
  rum: {
    title: "Caribbean Rum",
    desc: "The flavors of the sea and tropical islands.",
    banner:
      "https://images.unsplash.com/photo-1614313511387-1436a4480ebb?q=80&w=1600&auto=format&fit=crop",
  },
  default: {
    title: "Our Collections",
    desc: "A curated selection of the world's finest flavors.",
    banner:
      "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?q=80&w=1600&auto=format&fit=crop",
  },
};

const QUICK_CATEGORIES = [
  { id: "all-products", name: "All" },
  { id: "red-wine", name: "Red Wine" },
  { id: "white-wine", name: "White Wine" },
  { id: "champagne", name: "Champagne" },
  { id: "whiskey", name: "Whiskey" },
  { id: "vodka", name: "Vodka" },
  { id: "rum", name: "Rum" },
];

export default function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo(0, 0);
  }, [slug]);

  const isViewAll = slug === "all-products";
  const info = CATEGORY_INFO[slug as string] || CATEGORY_INFO["default"];

  const allFilteredProducts = isViewAll
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter((p) => p.category === slug);

  const totalItems = allFilteredProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

  const currentProducts = allFilteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);

    const gridElement = document.getElementById("product-grid-start");
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black">
      <div className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={info.banner}
            alt={info.title}
            className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-[#050505]"></div>
        </div>

        <div className="relative z-10 text-center px-4 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-4"
          >
            <FaWineGlassAlt className="text-[#D4AF37] text-3xl" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-medium mb-4 tracking-tight"
          >
            {info.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 max-w-xl mx-auto font-light leading-relaxed text-lg"
          >
            {info.desc}
          </motion.p>
        </div>
      </div>

      <div
        id="product-grid-start"
        className="top-[70px] md:top-20 z-40 bg-[#050505]/95 backdrop-blur border-b border-white/5 transition-all shadow-lg shadow-black/50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <div className="flex gap-2">
                {QUICK_CATEGORIES.map((cat) => (
                  <NavLink
                    key={cat.id}
                    to={`/collections/${cat.id}`}
                    className={({ isActive }) =>
                      `whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                        isActive || (isViewAll && cat.id === "all-products")
                          ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                          : "bg-transparent text-white/60 border-white/10 hover:border-white/30 hover:text-white"
                      }`
                    }
                  >
                    {cat.name}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-6 border-t border-white/5 md:border-none pt-4 md:pt-0">
              <p className="text-white/50 text-xs font-light">
                Showing{" "}
                <span className="text-[#D4AF37] font-bold">
                  {totalItems > 0 ? indexOfFirstItem + 1 : 0}
                </span>{" "}
                -{" "}
                <span className="text-[#D4AF37] font-bold">
                  {Math.min(indexOfLastItem, totalItems)}
                </span>{" "}
                of <span className="text-white font-bold">{totalItems}</span>{" "}
                Products
              </p>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-[#D4AF37] transition-colors">
                  <FaFilter /> Filter
                </button>
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-[#D4AF37] transition-colors">
                  <FaSortAmountDown /> Sort
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-16">
        {currentProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {currentProducts.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <div className="relative bg-[#0f0f0f] border border-white/5 h-[360px] rounded-sm overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500">
                    <div className="absolute top-3 left-3 z-20">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-white/40 border border-white/10 px-2 py-1 rounded-sm bg-black/50 backdrop-blur-sm">
                        {item.category}
                      </span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <div className="absolute w-32 h-32 bg-[#D4AF37]/20 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-[80%] object-contain drop-shadow-xl group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-500 ease-out z-10"
                      />
                    </div>

                    <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="w-full bg-[#D4AF37] text-black font-bold uppercase text-[10px] py-4 hover:bg-white transition-colors flex items-center justify-center gap-2 tracking-widest"
                      >
                        <FaCartPlus /> Quick Add
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 px-1">
                    <h3 className="text-base font-serif text-white group-hover:text-[#D4AF37] transition-colors leading-tight mb-1 truncate">
                      {item.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="text-white/60 text-sm font-medium">
                        {item.price.toLocaleString()}{" "}
                        <span className="text-xs">₫</span>
                      </p>
                      <div className="w-6 h-px bg-white/10 group-hover:bg-[#D4AF37] transition-colors"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-20 flex justify-center items-center gap-3">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all ${
                    currentPage === 1
                      ? "border-white/10 text-white/20 cursor-not-allowed"
                      : "border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  }`}
                >
                  <FaChevronLeft size={12} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full border text-xs font-bold transition-all ${
                        currentPage === page
                          ? "bg-[#D4AF37] border-[#D4AF37] text-black"
                          : "bg-transparent border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all ${
                    currentPage === totalPages
                      ? "border-white/10 text-white/20 cursor-not-allowed"
                      : "border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  }`}
                >
                  <FaChevronRight size={12} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/5">
            <h3 className="text-2xl font-serif text-white mb-2">
              Collection Empty
            </h3>
            <p className="text-white/50 mb-6">
              Chưa có sản phẩm nào trong danh mục này.
            </p>
            <Link
              to="/collections/all-products"
              className="px-6 py-2 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all font-bold uppercase text-xs tracking-widest"
            >
              View All Collection
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
