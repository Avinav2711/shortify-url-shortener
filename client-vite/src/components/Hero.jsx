import { motion } from "framer-motion";
import { FaRocket, FaChartLine, FaQrcode } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="text-center py-10 md:py-16">

      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6">
          🚀 Fast • Secure • Analytics
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Shorten URLs
          <br />
          <span className="text-cyan-400">
            Smarter.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto mt-6 text-lg text-slate-400 leading-8">
          Create beautiful short links, custom aliases,
          QR Codes and track clicks with an elegant,
          fast and secure URL Shortener.
        </p>

      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.5,
        }}
        className="flex flex-wrap justify-center gap-6 mt-10"
      >

        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4">
          <FaRocket className="text-cyan-400 text-2xl" />
          <span className="font-medium">
            Lightning Fast
          </span>
        </div>

        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4">
          <FaChartLine className="text-green-400 text-2xl" />
          <span className="font-medium">
            Analytics
          </span>
        </div>

        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4">
          <FaQrcode className="text-pink-400 text-2xl" />
          <span className="font-medium">
            QR Code
          </span>
        </div>

      </motion.div>

    </section>
  );
}