import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay } from "react-icons/fa";

const SLIDES = [
  {
    id: 1,
    brand: "Jack Daniel's",
    name: "Old No. 7",
    year: "TENNESSEE",
    description:
      "Mellowed drop by drop through 10-feet of sugar maple charcoal, then matured in handcrafted barrels of our own making.",
    image:
      "https://www.thecocktaildb.com/images/ingredients/Jack%20Daniels.png",
    accentColor: "#d97706",
    textColor: "#fbbf24", 
    bgGradient: "from-[#271300] via-[#000000] to-[#000000]",
  },
  {
    id: 2,
    brand: "Rémy Martin",
    name: "Cognac VSOP",
    year: "FINE CHAMPAGNE",
    description:
      "The reference for VSOP cognac. The perfect harmony of powerful and elegant aromas.",
    image: "https://www.thecocktaildb.com/images/ingredients/Cognac.png",
    accentColor: "#991b1b",
    textColor: "#fca5a5", 
    bgGradient: "from-[#2a0a0a] via-[#000000] to-[#000000]",
  },
  {
    id: 3,
    brand: "Moët & Chandon",
    name: "Impérial",
    year: "BRUT",
    description:
      "Moët Impérial is the House's iconic champagne. Created in 1869, it embodies Moët & Chandon's unique style.",
    image: "https://www.thecocktaildb.com/images/ingredients/Champagne.png",
    accentColor: "#059669", 
    textColor: "#a7f3d0", 
    bgGradient: "from-[#021c10] via-[#000000] to-[#000000]",
  },
];


const FallbackBottle = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 100 300"
    className="h-full w-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
  >
    <path
      d="M30,0 L70,0 L70,20 Q70,40 85,50 L85,250 Q85,280 50,280 Q15,280 15,250 L15,50 Q30,40 30,20 Z"
      fill="none"
      stroke={color}
      strokeWidth="2"
    />
    <rect
      x="25"
      y="100"
      width="50"
      height="80"
      fill={color}
      fillOpacity="0.2"
      rx="2"
    />
    <text
      x="50"
      y="150"
      textAnchor="middle"
      fill="white"
      fontSize="10"
      fontFamily="serif"
      fontWeight="bold"
      transform="rotate(-90, 50, 150)"
    >
      PREMIUM SPIRIT
    </text>
  </svg>
);

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [current]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = SLIDES[current];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-linear-to-br from-[#1a1a1a] via-[#050505] to-black text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }} 
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className={`absolute inset-0 bg-linear-to-br ${activeSlide.bgGradient}`}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 select-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.h1
            key={current}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 0.15 }} 
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="text-[18vw] md:text-[25vw] font-black uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent font-serif"
          >
            {activeSlide.brand.split(" ")[0]}
          </motion.h1>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight,
            }}
            animate={{ y: 0, opacity: [0, 1, 0] }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 h-full relative z-20 flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 pt-20 md:pt-0 flex flex-col justify-center items-start pl-4 md:pl-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-white/50"></span>
                <span
                  style={{ color: activeSlide.textColor }}
                  className="text-sm font-bold tracking-[0.4em] uppercase"
                >
                  {activeSlide.brand}
                </span>
              </div>

              <h2 className="text-5xl md:text-8xl font-serif font-medium leading-[0.9] mb-6">
                {activeSlide.name} <br />
                <span
                  className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/50 to-transparent italic font-light text-4xl md:text-6xl"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
                >
                  {activeSlide.year}
                </span>
              </h2>

              <p className="text-white/80 text-base md:text-lg font-light max-w-md leading-relaxed mb-10 border-l-2 border-white/10 pl-6">
                {activeSlide.description}
              </p>

              <div className="flex items-center gap-6">
                <button className="relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-[#D4AF37] transition-colors duration-300">
                  Explore Now
                </button>
                <button className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors group">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
                    <FaPlay size={10} className="ml-1" />
                  </div>
                  <span className="text-white/70 group-hover:text-white transition-colors">
                    Watch Video
                  </span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-full md:w-1/2 h-full flex items-center justify-center relative select-none">
          <div className="absolute bottom-[20%] w-[200px] h-[30px] bg-black rounded-[100%] blur-xl opacity-60 z-10"></div>
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ backgroundColor: activeSlide.accentColor }}
            className="absolute bottom-[20%] w-[150px] h-[50px] rounded-[100%] blur-[50px] z-0"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="relative z-20 flex justify-center items-center h-[50vh] md:h-[70vh]"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 50,
                  damping: 20,
                  delay: 0.1,
                },
              }}
              exit={{
                opacity: 0,
                y: -20,
                filter: "blur(10px)",
                transition: { duration: 0.4 },
              }}
            >
              {!imgError ? (
                <motion.img
                  animate={{ y: [-10, 0, -10] }} 
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  src={activeSlide.image}
                  alt={activeSlide.name}
                  className="h-full object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                  onError={() => setImgError(true)}
                />
              ) : (
                <motion.div
                  animate={{ y: [-10, 0, -10] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-[70%] w-auto"
                >
                  <FallbackBottle color={activeSlide.textColor} />
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
        <motion.div
          key={current}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          style={{ backgroundColor: activeSlide.accentColor }}
          className="h-full"
        />
      </div>

      <div className="absolute bottom-8 right-8 text-right z-30">
        <p className="text-xs font-bold text-white/50">0{current + 1} / 03</p>
        <p className="text-xs font-bold text-white uppercase tracking-widest">
          {activeSlide.brand}
        </p>
      </div>
    </div>
  );
}
