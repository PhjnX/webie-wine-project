import { motion } from "framer-motion";

export default function ExclusiveOffer() {
  return (
    <section className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative bg-linear-to-r from-[#111] to-[#050505] border border-white/5 rounded-2xl overflow-hidden p-8 md:p-16 flex flex-col md:flex-row items-center gap-12"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
          <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

          <motion.div
            className="w-full md:w-1/2 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-[#D4AF37] text-black text-[10px] font-black uppercase px-3 py-1 tracking-widest mb-6 inline-block">
              Limited Edition
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-none">
              Johnnie Walker <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#D4AF37] to-[#8a6e1e]">
                Blue Label
              </span>
            </h2>
            <p className="text-white/60 mb-8 font-light leading-relaxed max-w-md">
              A rare masterpiece. Only one in 10,000 casks possesses the elusive
              quality required to craft the signature smoothness of Blue Label.
            </p>

            <div className="flex gap-6 mb-10">
              {[
                { val: "02", label: "Days" },
                { val: "14", label: "Hours" },
                { val: "35", label: "Mins" },
              ].map((t) => (
                <div key={t.label} className="text-center">
                  <div className="text-2xl font-serif text-white font-bold">
                    {t.val}
                  </div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest">
                    {t.label}
                  </div>
                </div>
              ))}
            </div>

            <button className="bg-transparent border border-[#D4AF37] text-[#D4AF37] px-8 py-3 uppercase text-xs font-bold tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all">
              Pre-Order Now
            </button>
          </motion.div>

          <div className="w-full md:w-1/2 flex justify-center relative z-10">
            <div className="absolute w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]"></div>

            <motion.img
              initial={{ opacity: 0, x: 50, rotate: 5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              src="https://www.thecocktaildb.com/images/ingredients/Blended%20Whiskey.png"
              alt="Blue Label"
              className="relative z-10 h-[350px] md:h-[450px] object-contain drop-shadow-[0_20px_50px_rgba(0,10,50,0.5)]"
              onError={(e) => {
                e.currentTarget.src =
                  "https://www.thecocktaildb.com/images/ingredients/Scotch.png";
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
