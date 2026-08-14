import { Link2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-8 relative">

        {/* Dashboard Button */}
        <button className="absolute right-6 top-8 px-5 py-2 rounded-xl border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white transition">
          Dashboard
        </button>

        {/* Center Logo */}
        <div className="flex flex-col items-center">
          <Link2 className="w-12 h-12 text-cyan-400 mb-2" />

          <h1 className="text-6xl font-bold text-white">
            Shortify
          </h1>

          <p className="text-gray-400 text-xl mt-2">
            URL Shortener
          </p>
        </div>

      </div>
    </header>
  );
}