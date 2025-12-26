import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaCheck,
  FaStar,
  FaWineGlassAlt,
  FaWind,
  FaLeaf,
  FaGlobe,
  FaBoxOpen,
  FaPercentage,
  FaRulerVertical,
  FaArrowLeft,
  FaShareAlt,
} from "react-icons/fa";

import { PRODUCTS_DATA } from "../data/mockData";

import { useAuth } from "../context/AuthContext";
import LoginModal from "../components/LoginModal";

const VIEW_ANGLES = [
  { id: "full", label: "Full Body", scale: 1, x: "center", y: "center" },
  { id: "neck", label: "The Neck", scale: 2.5, x: "center", y: "top" },
  { id: "label", label: "The Label", scale: 2.2, x: "center", y: "40%" },
  { id: "body", label: "The Spirit", scale: 2.5, x: "center", y: "85%" },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth(); 
  const [showLoginModal, setShowLoginModal] = useState(false); 
  const [pendingOrder, setPendingOrder] = useState(false); 

  const [quantity, setQuantity] = useState(1);
  const [view, setView] = useState(VIEW_ANGLES[0]);

  const product = PRODUCTS_DATA.find((p) => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
    setView(VIEW_ANGLES[0]);
  }, [id]);

  useEffect(() => {
    if (user && pendingOrder) {
      navigate("/order"); 
      setPendingOrder(false); 
    }
  }, [user, pendingOrder, navigate]);

  // Handle Order Click
  const handleOrderClick = () => {
    if (user) {
      navigate("/order");
    } else {
      setPendingOrder(true);
      setShowLoginModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
    if (!user) setPendingOrder(false);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
        <h2 className="text-4xl font-serif text-[#D4AF37] mb-4">
          Product Not Found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="border border-[#D4AF37] text-[#D4AF37] px-8 py-3 uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all"
        >
          Return to Cellar
        </button>
      </div>
    );
  }

  const specs = product.specs || [
    { label: "Origin", value: "Unknown" },
    { label: "Region", value: "N/A" },
    { label: "ABV", value: "40%" },
    { label: "Volume", value: "750ml" },
  ];

  const tastingNotes = product.tastingNotes || [
    { title: "Nose", text: "Aromatic details updating..." },
    { title: "Palate", text: "Flavor profile updating..." },
    { title: "Finish", text: "Finish details updating..." },
  ];

  const getSpecIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes("origin")) return <FaGlobe />;
    if (l.includes("region")) return <FaBoxOpen />;
    if (l.includes("abv") || l.includes("alcohol")) return <FaPercentage />;
    return <FaRulerVertical />;
  };

  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "dec" && quantity > 1) setQuantity((prev) => prev - 1);
    if (type === "inc") setQuantity((prev) => prev + 1);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      <div className="fixed top-0 left-0 right-0 h-20 bg-linear-to-b from-black/80 to-transparent z-40 pointer-events-none"></div>

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          {/* BREADCRUMBS */}
          <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-4">
            <div className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-white/30 font-medium">
              <Link to="/" className="hover:text-[#D4AF37] transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                to={`/collections/${product.category}`}
                className="hover:text-[#D4AF37] transition-colors"
              >
                {product.category}
              </Link>
              <span>/</span>
              <span className="text-white truncate max-w-[150px] md:max-w-xs opacity-60">
                {product.name}
              </span>
            </div>

            <div className="flex gap-4">
              <button className="text-white/40 hover:text-white transition-colors">
                <FaShareAlt size={14} />
              </button>
              <button
                onClick={() => navigate(-1)}
                className="text-white/50 hover:text-[#D4AF37] flex items-center gap-2 text-[10px] uppercase tracking-widest transition-colors"
              >
                <FaArrowLeft /> Back
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
            <div className="w-full lg:w-1/2 flex flex-col gap-6 sticky top-32 self-start">
              <div className="relative h-[450px] md:h-[600px] w-full bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden group">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-[#D4AF37]/5 rounded-full blur-[100px] group-hover:bg-[#D4AF37]/10 transition-colors duration-1000"></div>

                <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
                  <motion.img
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: view.scale,
                      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    }}
                    src={product.image}
                    alt={product.name}
                    className="relative z-10 w-auto h-[85%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                    style={{ transformOrigin: `${view.x} ${view.y}` }}
                  />
                  <div className="absolute top-4 right-4 text-white/5 font-serif font-black text-6xl select-none z-0">
                    W
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={view.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="absolute bottom-6 left-6 z-20"
                  >
                    <span className="text-white/30 text-[9px] uppercase tracking-widest mr-2">
                      Focus:
                    </span>
                    <span className="text-[#D4AF37] font-bold uppercase text-[10px] tracking-widest border-b border-[#D4AF37]/50 pb-0.5">
                      {view.label}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {VIEW_ANGLES.map((angle) => (
                  <button
                    key={angle.id}
                    onClick={() => setView(angle)}
                    className={`group relative h-20 md:h-24 rounded-sm border transition-all duration-300 overflow-hidden ${
                      view.id === angle.id
                        ? "border-[#D4AF37] bg-white/5"
                        : "border-white/5 bg-transparent hover:border-white/20"
                    }`}
                  >
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity grayscale">
                      <img
                        src={product.image}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: `${angle.x} ${angle.y}` }}
                        alt="View"
                      />
                    </div>
                    <span
                      className={`relative z-10 text-[8px] md:text-[9px] font-bold uppercase tracking-widest ${
                        view.id === angle.id
                          ? "text-[#D4AF37]"
                          : "text-white/50"
                      }`}
                    >
                      {angle.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8 border-b border-white/5 pb-8"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-[#D4AF37] font-bold uppercase tracking-[0.25em] text-xs">
                    {product.subTitle}
                  </h3>
                  <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    <FaStar className="text-[#D4AF37] text-xs" />
                    <span className="font-bold text-white text-xs">
                      {product.rating || 4.8}
                    </span>
                    <span className="text-white/30 text-[10px]">
                      ({product.reviews || 12} reviews)
                    </span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-serif font-medium text-white mb-6 leading-[1.1]">
                  {product.name}
                </h1>

                <div className="flex flex-wrap items-end gap-4">
                  <span className="text-3xl md:text-4xl font-bold text-white">
                    {product.price.toLocaleString()}
                    <span className="text-xl text-[#D4AF37] ml-1">₫</span>
                  </span>
                  <span className="mb-2 text-[9px] font-bold text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-1 uppercase tracking-wider rounded-sm">
                    In Stock
                  </span>
                </div>
              </motion.div>

              <div className="prose prose-invert prose-sm max-w-none mb-8">
                <p className="text-white/70 leading-relaxed font-light text-base text-justify">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10">
                {specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 bg-[#0F0F0F] rounded-sm border border-white/5 hover:border-[#D4AF37]/30 transition-colors group"
                  >
                    <span className="text-[#D4AF37] opacity-50 group-hover:opacity-100 transition-opacity text-xl">
                      {getSpecIcon(spec.label)}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-white/30 uppercase tracking-widest mb-1">
                        {spec.label}
                      </span>
                      <span className="text-sm font-serif font-bold text-white tracking-wide">
                        {spec.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-12 bg-[#0F0F0F] p-8 rounded-sm border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-[#D4AF37]/10 to-transparent pointer-events-none"></div>
                <h3 className="font-serif text-xl mb-6 text-white border-l-2 border-[#D4AF37] pl-4">
                  Tasting Notes
                </h3>
                <div className="space-y-6">
                  {tastingNotes.map((note, idx) => (
                    <div key={idx} className="flex gap-5 items-start group">
                      <div className="mt-1 p-2.5 rounded-full bg-[#1a1a1a] border border-white/5 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                        {idx === 0 ? (
                          <FaWind size={12} />
                        ) : idx === 1 ? (
                          <FaWineGlassAlt size={12} />
                        ) : (
                          <FaLeaf size={12} />
                        )}
                      </div>
                      <div>
                        <span className="font-bold text-white block text-[10px] uppercase tracking-[0.2em] mb-1 group-hover:text-[#D4AF37] transition-colors">
                          {note.title}
                        </span>
                        <span className="text-white/60 text-sm font-light leading-relaxed">
                          {note.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto bg-[#111] p-1.5 rounded-lg border border-white/10 flex flex-col md:flex-row gap-2">
                <div className="flex items-center justify-between bg-black rounded px-4 py-3 md:w-32 border border-white/5">
                  <button
                    onClick={() => handleQuantity("dec")}
                    className="text-white/40 hover:text-white transition-colors p-1"
                  >
                    <FaMinus size={8} />
                  </button>
                  <span className="font-bold text-base text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantity("inc")}
                    className="text-white/40 hover:text-white transition-colors p-1"
                  >
                    <FaPlus size={8} />
                  </button>
                </div>

                <button className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/5 font-bold uppercase tracking-widest text-[10px] py-4 rounded transition-all flex items-center justify-center gap-2">
                  <FaShoppingCart size={12} /> Add to Cart
                </button>

                <button
                  onClick={handleOrderClick}
                  className="flex-[1.5] bg-[#D4AF37] hover:bg-white text-[#050505] font-bold uppercase tracking-widest text-[10px] py-4 rounded shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all flex items-center justify-center gap-2"
                >
                  Order Now <FaCheck size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <LoginModal isOpen={showLoginModal} onClose={handleCloseModal} />
    </div>
  );
}
