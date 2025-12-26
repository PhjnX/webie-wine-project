import { motion, type Variants } from "framer-motion";
import { FaWineGlassAlt, FaAward, FaUsers, FaGlobe } from "react-icons/fa";
import Bee from "../assets/images/bee.jpg";

const IMAGES = {
  hero: "https://www.boroli.it/wp-content/uploads/2024/09/colori_bottiglie_vino.webp",
  story:
    "https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?q=80&w=1000&auto=format&fit=crop",
  founder:
    "https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?q=80&w=1000&auto=format&fit=crop",
};

const STATS = [
  { id: 1, number: "25", label: "YEARS EXPERIENCE", icon: <FaWineGlassAlt /> },
  { id: 2, number: "1.5k", label: "PREMIUM LABELS", icon: <FaGlobe /> },
  { id: 3, number: "50k", label: "HAPPY CLIENTS", icon: <FaUsers /> },
  { id: 4, number: "12", label: "GLOBAL AWARDS", icon: <FaAward /> },
];

const VALUES = [
  {
    title: "AUTHENTICITY",
    subtitle: "ORIGIN",
    desc: "100% authentic, sourced directly from renowned vineyards.",
    img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "PRESERVATION",
    subtitle: "STORAGE",
    desc: "24/7 standard cellar storage, preserving the original flavor.",
    img: "https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "EXPERIENCE",
    subtitle: "SOMMELIER",
    desc: "Expert Sommeliers ready to guide your palate journey.",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
  },
];
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const imageReveal: Variants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[#050505] min-h-screen text-[#E0E0E0] font-serif selection:bg-[#D4AF37] selection:text-black overflow-hidden">
      <style>{`
        .font-serif {
          font-family: var(--font-serif), "Times New Roman", serif; 
        }
        .text-gold {
          color: #D4AF37; 
        }
        .border-gold {
          border-color: #D4AF37;
        }
      `}</style>

      <div className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-full h-full"
          >
            <img
              src={IMAGES.hero}
              alt="Vineyard"
              className="w-full h-full object-cover opacity-40"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-[#050505] z-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-[#050505] via-[#050505]/80 to-transparent z-10"></div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-20 text-center px-4 max-w-4xl pb-20"
        >
          <motion.p
            variants={fadeInUp}
            className="text-gold text-sm tracking-[0.4em] uppercase mb-6 font-bold"
          >
            Est. 1998
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl text-gold uppercase tracking-widest mb-8 leading-tight drop-shadow-2xl"
          >
            Our Heritage
          </motion.h1>
          <motion.div variants={fadeInUp}>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-8 opacity-80"></div>
          </motion.div>
          <motion.p
            variants={fadeInUp}
            className="text-white/80 text-lg uppercase tracking-[0.2em] max-w-2xl mx-auto font-light"
          >
            Where passion meets perfection
          </motion.p>
        </motion.div>
      </div>

      <section className="relative z-20 -mt-24 md:-mt-32 container mx-auto px-6 pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={imageReveal}
            className="w-full lg:w-1/2"
          >
            <div className="bg-[#050505] p-2 border border-white/10 shadow-2xl shadow-black/80">
              <div className="relative overflow-hidden aspect-4/5 border border-white/5">
                <img
                  src={IMAGES.story}
                  alt="Our Story"
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={staggerContainer}
            className="w-full lg:w-1/2 flex flex-col justify-end lg:pt-32 xl:pt-40"
          >
            <motion.div
              variants={fadeInUp}
              className="w-12 h-0.5 bg-gold mb-6"
            ></motion.div>
            <motion.span
              variants={fadeInUp}
              className="text-gold text-[10px] md:text-xs tracking-[0.4em] uppercase block mb-3 font-bold"
            >
              The Journey
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl text-white uppercase mb-8 leading-none"
            >
              Curating <br />
              <span className="text-gold font-serif italic tracking-wider">
                Excellence
              </span>
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="space-y-6 text-white/60 text-base leading-relaxed font-light text-justify pr-0 lg:pr-10"
            >
              <p>
                Webie Cellar didn't begin with spreadsheets. It started with a
                fateful trip to Bordeaux in 1998. There, amidst the vast
                vineyards, we understood that wine is a living art form.
              </p>
              <p>
                For over two decades, from a humble shop in District 1, we have
                upheld our mission: Not just selling wine, but sharing the
                stories behind every cork.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="mt-10 pt-8 border-t border-white/10 flex items-center gap-5"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border border-gold/40 p-[2px]">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={Bee}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                    alt="Mr. Webie Cellar"
                  />
                </div>
              </div>
              <div>
                <p className="text-white text-base uppercase tracking-widest font-bold">
                  Mr. Webie Cellar
                </p>
                <p className="text-gold text-[10px] tracking-[0.2em] uppercase opacity-80 mt-1">
                  Founder & Sommelier
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 border-y border-white/5 bg-[#080808]">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
          >
            {STATS.map((item) => (
              <motion.div key={item.id} variants={fadeInUp}>
                <div className="text-gold text-3xl flex justify-center mb-6 opacity-80">
                  {item.icon}
                </div>
                <h3 className="text-4xl lg:text-5xl text-white font-medium mb-2">
                  {item.number}
                  <span className="text-gold text-2xl align-top">+</span>
                </h3>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <span className="text-gold uppercase tracking-[0.2em] text-xs font-bold block mb-4">
            Our Philosophy
          </span>
          <h2 className="text-4xl md:text-5xl text-white uppercase tracking-wider">
            Core Values
          </h2>
          <div className="w-24 h-px bg-white/10 mx-auto mt-6"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {VALUES.map((val, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-[#0b0b0b] border border-white/5 p-1 group hover:border-gold/30 transition-all duration-500"
            >
              <div className="relative h-72 w-full overflow-hidden bg-black mb-8">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all z-10"></div>
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={val.img}
                  alt={val.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700"
                />
              </div>

              <div className="px-8 pb-10 text-center">
                <h4 className="text-gold text-[10px] tracking-[0.3em] uppercase mb-4 opacity-80">
                  {val.subtitle}
                </h4>
                <h3 className="text-2xl text-white uppercase mb-4 group-hover:text-gold transition-colors tracking-wide">
                  {val.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed font-sans font-light">
                  {val.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="pb-24 container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInUp}
          className="relative border border-white/10 bg-[#080808] p-16 md:p-24 text-center overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20 mix-blend-screen">
            <motion.img
              initial={{ scale: 1 }}
              whileInView={{ scale: 1.1 }}
              transition={{ duration: 3 }}
              src="https://images.unsplash.com/photo-1551751299-1b51cab2694c?q=80&w=2000&auto=format&fit=crop"
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-[#080808] via-transparent to-[#080808]"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-gold text-[10px] font-bold px-3 py-1 border border-gold uppercase tracking-widest mb-8 inline-block">
              Exclusive Access
            </span>
            <h2 className="text-4xl md:text-6xl text-white uppercase mb-8 tracking-wide">
              Ready to{" "}
              <span className="text-gold italic font-serif">Taste?</span>
            </h2>
            <p className="text-white/60 mb-10 text-lg font-light tracking-wide max-w-xl mx-auto">
              Join us at the cellar and experience the finest selection.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gold text-black px-12 py-4 text-xs uppercase tracking-[0.25em] font-bold hover:bg-white transition-all duration-300"
            >
              Visit Shop Catalog
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
