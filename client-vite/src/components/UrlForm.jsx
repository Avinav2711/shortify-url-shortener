import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import {
  FaCopy,
  FaLink,
  FaRocket,
  FaExternalLinkAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

const API = `${import.meta.env.VITE_API_URL}/api`;

export default function UrlForm() {

  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);


  const shorten = async () => {

    if (!originalUrl.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(`${API}/shorten`, {
        originalUrl: originalUrl.trim(),
        customAlias: customAlias.trim(),
      });

      console.log("Response:", res.data);

      setData(res.data.url);

      toast.success("URL Shortened Successfully!");

      setOriginalUrl("");
      setCustomAlias("");

    } catch (err) {

      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };


  const copy = async () => {

    if (!data?.shortUrl) return;

    try {

      await navigator.clipboard.writeText(data.shortUrl);

      toast.success("Copied to clipboard!");

    } catch {

      toast.error("Unable to copy URL");

    }
  };


  return (

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}

      className="
        w-full
        max-w-5xl
        mx-auto

        rounded-3xl

        border
        border-slate-700/80

        bg-slate-900/80

        shadow-2xl
        shadow-black/20

        p-6
        md:p-10
      "
    >

      {/* ================= HEADER ================= */}

      <div className="text-center mb-8">

        <div className="
          flex
          justify-center
          items-center
          mb-4
        ">
          <div className="
            w-12
            h-12
            rounded-xl

            flex
            items-center
            justify-center

            bg-cyan-500/10

            border
            border-cyan-500/30
          ">
            <FaLink className="text-cyan-400 text-xl" />
          </div>
        </div>


        <h2 className="
          text-3xl
          md:text-4xl
          font-bold
          text-white
        ">
          Shorten Your URL
        </h2>


        <p className="
          mt-3
          text-slate-400
          text-base
          md:text-lg
        ">
          Paste your long URL below and generate a short link instantly.
        </p>

      </div>


      {/* ================= FORM ================= */}

      <div className="space-y-6">

        {/* Long URL */}

        <div>

          <label className="
            block
            mb-2
            text-sm
            font-semibold
            text-slate-300
          ">
            Long URL
          </label>

          <input
            type="text"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://example.com/very-long-url"

            className="
              w-full

              px-5
              py-4

              rounded-xl

              bg-slate-800

              border
              border-slate-700

              text-white

              placeholder:text-slate-500

              transition-all

              focus:border-cyan-500
              focus:ring-2
              focus:ring-cyan-500/20
            "
          />

        </div>


        {/* Custom Alias */}

        <div>

          <label className="
            block
            mb-2
            text-sm
            font-semibold
            text-slate-300
          ">
            Custom Alias
            <span className="text-slate-500 font-normal">
              {" "}
              (Optional)
            </span>
          </label>

          <input
            type="text"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            placeholder="my-link"

            className="
              w-full

              px-5
              py-4

              rounded-xl

              bg-slate-800

              border
              border-slate-700

              text-white

              placeholder:text-slate-500

              transition-all

              focus:border-cyan-500
              focus:ring-2
              focus:ring-cyan-500/20
            "
          />

          <p className="
            mt-2
            text-sm
            text-slate-500
          ">
            Example: yoursite.com/my-link
          </p>

        </div>


        {/* Generate Button */}

        <button
          onClick={shorten}
          disabled={loading}

          className="
            w-full

            flex
            items-center
            justify-center
            gap-3

            px-6
            py-4

            rounded-xl

            bg-cyan-500

            hover:bg-cyan-400

            disabled:opacity-60
            disabled:cursor-not-allowed

            text-white

            text-lg
            font-bold

            transition-all

            shadow-lg
            shadow-cyan-500/20

            hover:shadow-cyan-500/30
          "
        >

          <FaRocket />

          {loading
            ? "Creating Short URL..."
            : "Generate Short URL"
          }

        </button>

      </div>


      {/* ================= RESULT ================= */}

      {data && (

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}

          className="
            mt-10
            pt-8

            border-t
            border-slate-700
          "
        >

          {/* Success */}

          <div className="text-center mb-6">

            <p className="
              text-xl
              font-bold
              text-green-400
            ">
              🎉 URL Created Successfully
            </p>

          </div>


          {/* Short URL */}

          <div className="
            flex
            flex-col
            sm:flex-row
            items-stretch
            sm:items-center

            gap-3

            bg-slate-800

            border
            border-slate-700

            rounded-xl

            p-3
          ">

            <a
              href={data.shortUrl}
              target="_blank"
              rel="noreferrer"

              className="
                flex-1

                px-3
                py-2

                text-cyan-400

                break-all

                hover:underline
              "
            >
              {data.shortUrl}
            </a>


            <div className="
              flex
              items-center
              gap-2
            ">

              <button
                onClick={copy}

                className="
                  w-11
                  h-11

                  flex
                  items-center
                  justify-center

                  rounded-lg

                  bg-slate-700

                  text-cyan-400

                  hover:bg-slate-600
                  hover:text-white

                  transition
                "
              >
                <FaCopy />
              </button>


              <a
                href={data.shortUrl}
                target="_blank"
                rel="noreferrer"

                className="
                  w-11
                  h-11

                  flex
                  items-center
                  justify-center

                  rounded-lg

                  bg-slate-700

                  text-cyan-400

                  hover:bg-slate-600
                  hover:text-white

                  transition
                "
              >
                <FaExternalLinkAlt />
              </a>

            </div>

          </div>


          {/* QR CODE */}

          <div className="
            flex
            flex-col
            items-center
            justify-center

            mt-8
          ">

            <div className="
              bg-white
              p-4
              rounded-2xl
              shadow-xl
            ">

              <QRCodeCanvas
                value={data.shortUrl}
                size={180}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
              />

            </div>

            <p className="
              mt-3
              text-sm
              text-slate-400
            ">
              Scan to open your short URL
            </p>

          </div>


          {/* DETAILS */}

          <div className="
            mt-8

            grid
            grid-cols-1
            md:grid-cols-3

            gap-4
          ">

            <div className="result-card">

              <p className="result-label">
                Short Code
              </p>

              <p className="result-value">
                {data.shortCode}
              </p>

            </div>


            <div className="result-card">

              <p className="result-label">
                Clicks
              </p>

              <p className="result-value">
                {data.clicks}
              </p>

            </div>


            <div className="result-card">

              <p className="result-label">
                Custom Alias
              </p>

              <p className="result-value">
                {data.customAlias || "Auto-generated"}
              </p>

            </div>

          </div>


          {/* Original URL */}

          <div className="
            mt-4

            bg-slate-800/60

            border
            border-slate-700

            rounded-xl

            p-4
          ">

            <p className="
              text-sm
              text-slate-400
              mb-1
            ">
              Original URL
            </p>

            <p className="
              text-sm
              text-slate-300
              break-all
            ">
              {data.originalUrl}
            </p>

          </div>

        </motion.div>

      )}

    </motion.div>

  );
}