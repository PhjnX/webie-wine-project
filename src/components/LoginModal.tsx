import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaSpinner, FaGoogle, FaFacebookF } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = await login(email, password);
    if (success) {
      onClose();
    } else {
      setError("Thông tin đăng nhập không chính xác.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <style>{`
            input:-webkit-autofill,
            input:-webkit-autofill:hover, 
            input:-webkit-autofill:focus, 
            input:-webkit-autofill:active{
                -webkit-box-shadow: 0 0 0 30px #0a0a0a inset !important;
                -webkit-text-fill-color: white !important;
                transition: background-color 5000s ease-in-out 0s;
            }
            .input-group input:focus ~ label,
            .input-group input:not(:placeholder-shown) ~ label {
              top: -12px;
              font-size: 9px;
              color: #D4AF37;
              opacity: 1;
            }
          `}</style>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050505]/90 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[900px] h-auto md:h-[500px] bg-[#0a0a0a] border border-[#D4AF37]/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] z-[70] flex overflow-hidden"
          >
            <div className="hidden md:block w-5/12 relative overflow-hidden">
              <img
                src="https://assets.hweb.wine/img/type/sparkling-wine-la-gi-20240105110828-e.jpg"
                alt="Wine Pouring"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50"></div>

              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent"></div>

              <div className="absolute bottom-10 left-0 right-0 text-center px-8 z-10">
                <div className="w-8 h-px bg-[#D4AF37] mx-auto mb-4"></div>
                <p className="font-serif text-[#E0E0E0] text-xl italic tracking-wide leading-relaxed drop-shadow-lg">
                  "Good wine is a necessity of life for me."
                </p>
                <p className="text-[#D4AF37] text-[9px] tracking-[0.2em] uppercase mt-3 opacity-90">
                  - Thomas Jefferson
                </p>
              </div>
            </div>

            <div className="w-full md:w-7/12 p-10 md:p-14 relative flex flex-col justify-center bg-[#0a0a0a]">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/20 hover:text-[#D4AF37] transition-colors"
              >
                <FaTimes size={18} />
              </button>

              <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl font-serif text-white mb-2 tracking-wide">
                  Member <span className="text-[#D4AF37] italic">Login</span>
                </h2>
                <p className="text-white/40 text-xs font-light tracking-wide">
                  Enter your details to access your private cellar.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="input-group relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 text-white py-2 focus:outline-none focus:border-[#D4AF37] transition-all placeholder-transparent text-sm font-light"
                    placeholder="Email"
                    required
                  />
                  <label className="absolute left-0 top-2 text-white/30 text-xs uppercase tracking-widest pointer-events-none transition-all duration-300">
                    Email Address
                  </label>
                </div>

                <div className="input-group relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 text-white py-2 focus:outline-none focus:border-[#D4AF37] transition-all placeholder-transparent text-sm font-light"
                    placeholder="Password"
                    required
                  />
                  <label className="absolute left-0 top-2 text-white/30 text-xs uppercase tracking-widest pointer-events-none transition-all duration-300">
                    Password
                  </label>
                  <a
                    href="#"
                    className="absolute right-0 top-2 text-[9px] text-white/20 hover:text-[#D4AF37] transition-colors uppercase tracking-wider"
                  >
                    Forgot?
                  </a>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-400 text-[10px] italic text-center"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-linear-to-r from-[#D4AF37] to-[#B38728] text-[#0a0a0a] font-bold uppercase tracking-[0.25em] py-4 text-[10px] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {isLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              <div className="mt-10 flex items-center justify-center gap-4 border-t border-white/5 pt-6">
                <span className="text-white/20 text-[10px]">
                  Or connect with
                </span>
                <div className="flex gap-3">
                  <button className="text-white/40 hover:text-white transition-colors">
                    <FaGoogle size={14} />
                  </button>
                  <button className="text-white/40 hover:text-white transition-colors">
                    <FaFacebookF size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
