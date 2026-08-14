import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  FaLink,
  FaBolt,
  FaChartLine,
  FaQrcode,
} from "react-icons/fa";

import UrlForm from "./components/UrlForm";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#020617] text-white">

        {/* =========================================
            HEADER
        ========================================= */}
        <header className="border-b border-slate-800">

          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

            <div className="h-24 flex items-center justify-between">

              {/* LOGO */}
              <Link
                to="/"
                className="flex items-center gap-3"
              >
                <FaLink
                  className="text-cyan-400"
                  size={28}
                />

                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold">
                    Shortify
                  </h1>

                  <p className="text-sm text-slate-400">
                    URL Shortener
                  </p>
                </div>
              </Link>

              {/* NAVIGATION */}
              <Link
                to="/dashboard"
                className="
                  inline-flex
                  items-center
                  justify-center
                  px-6
                  py-3
                  rounded-xl
                  bg-cyan-500
                  hover:bg-cyan-400
                  text-white
                  font-semibold
                  shadow-lg
                  shadow-cyan-500/20
                  transition
                "
              >
                Dashboard
              </Link>

            </div>

          </div>

        </header>

        {/* =========================================
            ROUTES
        ========================================= */}
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

        </Routes>

      </div>
    </BrowserRouter>
  );
}


/* =========================================
   HOME
========================================= */

function Home() {
  return (
    <main className="min-h-[calc(100vh-96px)]">

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-20 pb-16 text-center">

        <h2
          className="
            text-5xl
            sm:text-6xl
            lg:text-7xl
            font-extrabold
            tracking-tight
          "
        >
          Shorten URLs
        </h2>

        <h3
          className="
            mt-2
            text-5xl
            sm:text-6xl
            lg:text-7xl
            font-extrabold
            text-cyan-400
            tracking-tight
          "
        >
          Smarter.
        </h3>

        <p
          className="
            max-w-3xl
            mx-auto
            mt-7
            text-lg
            sm:text-xl
            leading-relaxed
            text-slate-400
          "
        >
          Create beautiful short links, custom aliases, QR Codes
          and track clicks with an elegant, fast and secure URL
          shortener.
        </p>

        {/* FEATURES */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">

          <div
            className="
              inline-flex
              items-center
              gap-2
              px-5
              py-2.5
              rounded-full
              border
              border-slate-700
              bg-slate-900/70
              text-slate-300
            "
          >
            <FaBolt className="text-cyan-400" />
            Lightning Fast
          </div>

          <div
            className="
              inline-flex
              items-center
              gap-2
              px-5
              py-2.5
              rounded-full
              border
              border-slate-700
              bg-slate-900/70
              text-slate-300
            "
          >
            <FaChartLine className="text-emerald-400" />
            Analytics
          </div>

          <div
            className="
              inline-flex
              items-center
              gap-2
              px-5
              py-2.5
              rounded-full
              border
              border-slate-700
              bg-slate-900/70
              text-slate-300
            "
          >
            <FaQrcode className="text-pink-400" />
            QR Code
          </div>

        </div>

      </section>

      {/* URL FORM */}
      <section className="px-5 sm:px-8 pb-16">

        <div className="max-w-4xl mx-auto">

          <UrlForm />

        </div>

      </section>

    </main>
  );
}