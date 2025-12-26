import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white/60 border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-16 mb-16 gap-10">
          <div className="max-w-lg">
            <h3 className="text-[#D4AF37] font-bold uppercase tracking-[0.2em] text-xs mb-4">
              Newsletter
            </h3>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
              Unlock Exclusive Offers
            </h2>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/30"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[#D4AF37] hover:text-white transition-colors">
                <FaArrowRight />
              </button>
            </div>
          </div>

          <div className="hidden md:block text-right">
            <h2 className="font-serif text-5xl font-black text-white/10 tracking-widest uppercase select-none">
              Webie
              <br />
              Cellar
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <h4 className="text-white font-serif font-bold text-lg">
              About Us
            </h4>
            <p className="text-sm leading-relaxed font-light">
              Webie Cellar curates the finest spirits from around the globe. We
              believe in quality, heritage, and the art of tasting.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all"
              >
                <FaYoutube size={14} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6">
              Shop
            </h4>
            <ul className="space-y-4 text-sm font-light">
              <li>
                <Link
                  to="/order"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/whiskey"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Whiskey & Bourbon
                </Link>
              </li>
              <li>
                <Link
                  to="/wine"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Fine Wines
                </Link>
              </li>
              <li>
                <Link
                  to="/spirits"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Rare Spirits
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6">
              Support
            </h4>
            <ul className="space-y-4 text-sm font-light">
              <li>
                <Link
                  to="/faq"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6">
              Contact
            </h4>
            <div className="space-y-4 text-sm font-light">
              <p>
                57 Street 53, Quarter 22, Binh Trung Ward,
                <br />
                HCMC, Vietnam
              </p>
              <p className="text-[#D4AF37] font-bold text-lg font-serif">
                +84 969 838 467
              </p>
              <a
                href="mailto:support@webie.com"
                className="hover:text-[#D4AF37] transition-colors underline decoration-white/20 underline-offset-4"
              >
                support@webie.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-white/30">
          <p>&copy; 2025 Webie Cellar. All rights reserved.</p>
          <p className="text-[#D4AF37]">Drink Responsibly • 18+</p>
        </div>
      </div>
    </footer>
  );
}
