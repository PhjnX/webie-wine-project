import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCartPlus,
  FaRegHeart,
  FaEye,
} from "react-icons/fa";

import { PRODUCTS_DATA } from "../data/mockData";

export default function BestSellers() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const bestSellers = PRODUCTS_DATA.slice(0, 12);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-[#050505] py-24 border-b border-white/5 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.4em] mb-2 block">
              Best Choice
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white font-medium">
              Top Selling Spirits
            </h2>
          </motion.div>

          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 border border-white/10 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-all active:scale-95"
            >
              <FaChevronLeft size={14} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 border border-white/10 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-all active:scale-95"
            >
              <FaChevronRight size={14} />
            </button>
          </motion.div>
        </div>

        <motion.div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto pb-16 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {bestSellers.map((item) => (
            <motion.div
              key={item.id}
              className="group min-w-[280px] md:min-w-[300px] snap-start relative cursor-pointer"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <div className="relative bg-[#0a0a0a] border border-white/10 h-[420px] flex flex-col justify-between overflow-hidden transition-all duration-500 group-hover:border-[#D4AF37]">
                <div className="flex justify-between items-start p-5 z-20">
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest border border-white/10 px-2 py-1 group-hover:text-[#D4AF37] group-hover:border-[#D4AF37] transition-colors">
                    {item.category}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="text-white/40 hover:text-red-500 transition-colors z-30"
                  >
                    <FaRegHeart />
                  </button>
                </div>

                <div className="absolute inset-0 flex items-center justify-center -top-5">
                  <div className="absolute w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[65%] object-contain drop-shadow-xl z-10 transition-all duration-700 ease-out 
                               group-hover:scale-110 group-hover:-translate-y-4 group-hover:rotate-3"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://www.thecocktaildb.com/images/ingredients/Scotch.png";
                    }}
                  />
                </div>

                <div className="relative z-20 bg-linear-to-t from-black via-black/95 to-transparent p-5 pt-12 mt-auto">
                  <div className="translate-y-4 group-hover:translate-y-[-50px] transition-transform duration-500 ease-out">
                    <h3 className="text-white font-serif text-xl leading-tight mb-1 group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-white/50 font-medium text-sm">
                      {item.price.toLocaleString()}
                      <span className="text-[10px] align-top ml-1">₫</span>
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full px-4 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${item.id}`);
                      }}
                      className="flex-1 bg-white/5 backdrop-blur-md text-white border border-white/20 font-bold uppercase text-[10px] tracking-widest py-3 flex items-center justify-center gap-2 hover:bg-white hover:text-black hover:border-white transition-all rounded-sm"
                    >
                      <FaEye /> Detail
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Added ${item.name} to cart!`);
                      }}
                      className="flex-1 bg-[#D4AF37] text-black border border-[#D4AF37] font-bold uppercase text-[10px] tracking-widest py-3 flex items-center justify-center gap-2 hover:bg-white hover:text-black hover:border-white transition-all rounded-sm"
                    >
                      <FaCartPlus /> Add
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
