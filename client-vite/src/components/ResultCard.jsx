import { FaCopy, FaExternalLinkAlt } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";
import toast from "react-hot-toast";

export default function ResultCard({ data }) {
  if (!data) return null;

  const copy = () => {
    navigator.clipboard.writeText(data.shortUrl);
    toast.success("Copied!");
  };

  return (
    <div className="mt-10 rounded-3xl border border-slate-700 bg-slate-900/80 backdrop-blur p-8">

      <div className="text-center">

        <h2 className="text-2xl font-bold text-green-400">
          ✅ URL Created Successfully
        </h2>

        <a
          href={data.shortUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-block text-cyan-400 hover:underline break-all text-lg"
        >
          {data.shortUrl}
        </a>

      </div>

      <div className="mt-8 flex justify-center gap-4">

        <button
          onClick={copy}
          className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition"
        >
          <FaCopy className="inline mr-2" />
          Copy
        </button>

        <a
          href={data.shortUrl}
          target="_blank"
          rel="noreferrer"
          className="px-5 py-3 rounded-xl bg-green-500 hover:bg-green-600 transition"
        >
          <FaExternalLinkAlt className="inline mr-2" />
          Visit
        </a>

      </div>

      <div className="mt-10 flex justify-center">
        <div className="bg-white p-5 rounded-2xl">
          <QRCodeCanvas value={data.shortUrl} size={180} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Original URL</p>

          <p className="truncate mt-2">
            {data.originalUrl}
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Short Code</p>

          <p className="mt-2">
            {data.shortCode}
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Clicks</p>

          <p className="mt-2">
            {data.clicks}
          </p>
        </div>

      </div>

    </div>
  );
}