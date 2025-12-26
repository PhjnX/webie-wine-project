import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import RedWine from "../assets/images/redwine.png";
import Whiskey from "../assets/images/whiskey.png";
import Champagne from "../assets/images/champagne.png";

const CATEGORIES = [
  {
    id: 1,
    title: "Red Wines",
    subtitle: "Bordeaux & Burgundy",
    image: RedWine,
    glow: "bg-red-500/20", 
  },
  {
    id: 2,
    title: "Premium Whiskey",
    subtitle: "Single Malt Scotch",
    image: Whiskey,
    glow: "bg-amber-500/20", 
  },
  {
    id: 3,
    title: "Fine Champagne",
    subtitle: "Sparkling Excellence",
    image: Champagne,
    glow: "bg-yellow-200/20", 
  },
];

export default function CategoryShowcase() {
  return (
    <section className="bg-[#080808] py-24 border-b border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.4em] mb-3 block text-left"
          >
            Our Collections
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-white font-medium text-left"
          >
            Curated Categories
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="group relative h-[550px] bg-white/3 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 hover:bg-white/[0.05] transition-all duration-500"
            >
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[60px] opacity-30 group-hover:opacity-60 transition-opacity duration-700 ${cat.glow}`}
              ></div>

              <div className="absolute inset-0 flex items-center justify-center pb-12">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="h-[75%] w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] transform group-hover:scale-110 group-hover:-translate-y-4 transition-all duration-700 ease-out z-10"
                />
              </div>

              <div className="absolute bottom-0 left-0 w-full p-8 z-20 bg-linear-to-t from-[#050505] via-[#050505]/80 to-transparent pt-20">
                <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-2 block opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {cat.subtitle}
                </span>

                <div className="flex justify-between items-end border-b border-white/10 pb-4 group-hover:border-[#D4AF37]/50 transition-colors duration-500">
                  <h3 className="text-2xl font-serif text-white group-hover:text-[#D4AF37] transition-colors duration-300">
                    {cat.title}
                  </h3>
                  <div className="text-white/50 group-hover:text-[#D4AF37] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300">
                    <FaArrowRight className="-rotate-45" size={14} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
