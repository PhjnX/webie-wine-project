// src/components/BrandStory.tsx
import { motion } from "framer-motion";

export default function BrandStory() {
  return (
    <section className="relative bg-linear-to-b from-[#121212] to-[#050505] py-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="relative group">
            <div className="absolute -top-4 -left-4 w-full h-full border border-[#D4AF37]/30 z-0 transition-all duration-500 group-hover:border-[#D4AF37]/60 group-hover:-top-6 group-hover:-left-6"></div>
            <img
              src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1470&auto=format&fit=crop"
              alt="Vintage Wine Cellar"
              className="relative z-10 w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out shadow-2xl"
            />
          </div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
            Est. 1989
          </span>

          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
            The Art of <br />{" "}
            <span className="italic text-[#D4AF37] font-serif">
              Timeless Taste
            </span>
          </h2>

          <p className="text-white/70 text-sm leading-relaxed mb-10 font-light">
            Tại Webie Cellar, chúng tôi không chỉ bán rượu, chúng tôi kể những
            câu chuyện. Mỗi chai rượu là một kiệt tác được tuyển chọn từ những
            hầm rượu lâu đời nhất Châu Âu, mang đến trải nghiệm thượng lưu.
          </p>

          <div className="mx-auto md:mx-0 w-48">
            <svg
              viewBox="0 0 200 60"
              className="w-full h-auto"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M10,40 C30,40 30,10 50,10 C70,10 60,50 80,50 C100,50 100,20 120,20 C140,20 130,45 150,45 C170,45 180,30 190,30"
                className="opacity-60"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
              />
              <text
                x="100"
                y="55"
                textAnchor="middle"
                stroke="none"
                fill="#D4AF37"
                fontSize="10"
                fontFamily="sans-serif"
                letterSpacing="0.2em"
                className="uppercase font-bold opacity-80"
              >
                Founder CEO
              </text>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
