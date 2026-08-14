import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FaLink,
  FaChartLine,
  FaSearch,
  FaExternalLinkAlt,
  FaCopy,
  FaTrash,
  FaSyncAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

const API = "http://localhost:5000/api";

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH URLS
  // =========================
  const fetchUrls = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API}/urls`);

      if (response.data.success) {
        setUrls(response.data.urls || []);
      }
    } catch (error) {
      console.error("Failed to fetch URLs:", error);

      toast.error(
        error.response?.data?.message || "Failed to load URLs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  // =========================
  // SEARCH
  // =========================
  const filteredUrls = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return urls;
    }

    return urls.filter((url) => {
      return (
        url.originalUrl?.toLowerCase().includes(query) ||
        url.shortCode?.toLowerCase().includes(query) ||
        url.customAlias?.toLowerCase().includes(query) ||
        url.shortUrl?.toLowerCase().includes(query)
      );
    });
  }, [urls, search]);

  // =========================
  // STATISTICS
  // =========================
  const totalUrls = urls.length;

  const totalClicks = urls.reduce(
    (total, url) => total + (Number(url.clicks) || 0),
    0
  );

  const averageClicks =
    totalUrls > 0 ? (totalClicks / totalUrls).toFixed(1) : "0.0";

  // =========================
  // COPY URL
  // =========================
  const copyUrl = async (shortUrl) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success("Short URL copied!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy URL");
    }
  };

  // =========================
  // DELETE
  // =========================
  const deleteUrl = async (id) => {
    toast("Delete feature will be added next.", {
      icon: "ℹ️",
    });
  };

  // =========================
  // DATE FORMAT
  // =========================
  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12">

        {/* =========================================
            DASHBOARD HEADING
        ========================================= */}
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                Analytics Dashboard
              </h1>

              <p className="mt-3 text-base sm:text-lg text-slate-400">
                Manage and monitor all your shortened URLs.
              </p>
            </div>

            <button
              onClick={fetchUrls}
              disabled={loading}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                shrink-0
                px-5
                py-3
                rounded-xl
                bg-cyan-500
                hover:bg-cyan-400
                disabled:opacity-60
                disabled:cursor-not-allowed
                text-white
                font-semibold
                shadow-lg
                shadow-cyan-500/20
                transition-all
                duration-200
              "
            >
              <FaSyncAlt
                className={loading ? "animate-spin" : ""}
                size={15}
              />

              <span>
                {loading ? "Refreshing..." : "Refresh"}
              </span>
            </button>
          </div>
        </section>

        {/* =========================================
            STATISTICS
        ========================================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          {/* TOTAL URLS */}
          <div
            className="
              rounded-2xl
              border
              border-slate-800
              bg-[#0f172a]
              p-6
              shadow-xl
              shadow-black/10
            "
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-400">
                  Total URLs
                </p>

                <p className="mt-2 text-4xl font-bold text-white">
                  {totalUrls}
                </p>
              </div>

              <div
                className="
                  flex
                  items-center
                  justify-center
                  w-12
                  h-12
                  rounded-xl
                  bg-cyan-500/10
                  text-cyan-400
                "
              >
                <FaLink size={21} />
              </div>
            </div>
          </div>

          {/* TOTAL CLICKS */}
          <div
            className="
              rounded-2xl
              border
              border-slate-800
              bg-[#0f172a]
              p-6
              shadow-xl
              shadow-black/10
            "
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-400">
                  Total Clicks
                </p>

                <p className="mt-2 text-4xl font-bold text-white">
                  {totalClicks}
                </p>
              </div>

              <div
                className="
                  flex
                  items-center
                  justify-center
                  w-12
                  h-12
                  rounded-xl
                  bg-emerald-500/10
                  text-emerald-400
                "
              >
                <FaChartLine size={21} />
              </div>
            </div>
          </div>

          {/* AVERAGE CLICKS */}
          <div
            className="
              rounded-2xl
              border
              border-slate-800
              bg-[#0f172a]
              p-6
              shadow-xl
              shadow-black/10
            "
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-400">
                  Average Clicks
                </p>

                <p className="mt-2 text-4xl font-bold text-white">
                  {averageClicks}
                </p>
              </div>

              <div
                className="
                  flex
                  items-center
                  justify-center
                  w-12
                  h-12
                  rounded-xl
                  bg-purple-500/10
                  text-purple-400
                "
              >
                <FaChartLine size={21} />
              </div>
            </div>
          </div>

        </section>

        {/* =========================================
            SEARCH
        ========================================= */}
        <section className="mb-8">
          <div className="relative">

            <FaSearch
              className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                text-slate-500
                pointer-events-none
              "
              size={17}
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search URLs, aliases or short codes..."
              className="
                w-full
                h-14
                pl-12
                pr-5
                rounded-xl
                border
                border-slate-800
                bg-[#0f172a]
                text-white
                placeholder:text-slate-500
                outline-none
                focus:border-cyan-500
                focus:ring-2
                focus:ring-cyan-500/10
                transition
              "
            />
          </div>
        </section>

        {/* =========================================
            URL LIST
        ========================================= */}
        <section
          className="
            rounded-2xl
            border
            border-slate-800
            bg-[#0f172a]
            overflow-hidden
            shadow-xl
            shadow-black/10
          "
        >

          {/* LIST HEADER */}
          <div className="px-6 sm:px-7 py-6 border-b border-slate-800">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Your Short URLs
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {filteredUrls.length}{" "}
                  {filteredUrls.length === 1 ? "URL" : "URLs"} found
                </p>
              </div>

            </div>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center">
              <FaSyncAlt
                className="animate-spin text-cyan-400 mb-4"
                size={25}
              />

              <p className="text-slate-400">
                Loading your URLs...
              </p>
            </div>
          ) : filteredUrls.length === 0 ? (
            /* EMPTY */
            <div className="py-16 text-center">

              <div
                className="
                  mx-auto
                  w-14
                  h-14
                  flex
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-800
                  text-slate-500
                  mb-4
                "
              >
                <FaLink size={22} />
              </div>

              <h3 className="text-lg font-semibold text-white">
                No URLs found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try a different search term.
              </p>

            </div>
          ) : (
            /* URL ITEMS */
            <div className="divide-y divide-slate-800">

              {filteredUrls.map((url) => (
                <article
                  key={url.id}
                  className="
                    px-6
                    sm:px-7
                    py-6
                    hover:bg-slate-900/50
                    transition
                  "
                >

                  {/* TOP ROW */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

                    {/* URL INFORMATION */}
                    <div className="min-w-0 flex-1">

                      {/* SHORT URL */}
                      <div className="flex items-start gap-3">

                        <a
                          href={url.shortUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="
                            min-w-0
                            text-lg
                            sm:text-xl
                            font-bold
                            text-cyan-400
                            hover:text-cyan-300
                            break-all
                            transition
                          "
                        >
                          {url.shortUrl}
                        </a>

                        <a
                          href={url.shortUrl}
                          target="_blank"
                          rel="noreferrer"
                          title="Open short URL"
                          className="
                            shrink-0
                            mt-1
                            text-slate-500
                            hover:text-cyan-400
                            transition
                          "
                        >
                          <FaExternalLinkAlt size={14} />
                        </a>

                      </div>

                      {/* ORIGINAL URL */}
                      <p
                        className="
                          mt-2
                          text-sm
                          sm:text-base
                          text-slate-400
                          break-all
                          leading-relaxed
                        "
                      >
                        {url.originalUrl}
                      </p>

                      {/* META */}
                      <div
                        className="
                          mt-4
                          flex
                          flex-wrap
                          items-center
                          gap-x-6
                          gap-y-2
                          text-sm
                          text-slate-500
                        "
                      >
                        <span>
                          Code:{" "}
                          <strong className="text-slate-300">
                            {url.shortCode}
                          </strong>
                        </span>

                        <span>
                          Clicks:{" "}
                          <strong className="text-cyan-400">
                            {url.clicks ?? 0}
                          </strong>
                        </span>

                        <span>
                          Created:{" "}
                          <strong className="text-slate-300">
                            {formatDate(url.createdAt)}
                          </strong>
                        </span>
                      </div>

                    </div>

                    {/* ACTION BUTTONS */}
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        shrink-0
                      "
                    >

                      <button
                        onClick={() => copyUrl(url.shortUrl)}
                        title="Copy short URL"
                        className="
                          w-10
                          h-10
                          flex
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-slate-700
                          bg-slate-900
                          text-slate-400
                          hover:text-cyan-400
                          hover:border-cyan-500/50
                          transition
                        "
                      >
                        <FaCopy size={15} />
                      </button>

                      <a
                        href={url.shortUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="Open URL"
                        className="
                          w-10
                          h-10
                          flex
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-slate-700
                          bg-slate-900
                          text-slate-400
                          hover:text-cyan-400
                          hover:border-cyan-500/50
                          transition
                        "
                      >
                        <FaExternalLinkAlt size={15} />
                      </a>

                      <button
                        onClick={() => deleteUrl(url.id)}
                        title="Delete URL"
                        className="
                          w-10
                          h-10
                          flex
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-slate-700
                          bg-slate-900
                          text-slate-400
                          hover:text-red-400
                          hover:border-red-500/50
                          transition
                        "
                      >
                        <FaTrash size={15} />
                      </button>

                    </div>

                  </div>

                </article>
              ))}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}