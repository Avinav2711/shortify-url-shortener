import {
  FaCopy,
  FaExternalLinkAlt,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
const API = "http://localhost:5000/api";
export default function DashboardRow({
    url,
    fetchUrls,
}) {
  const copy = () => {
    navigator.clipboard.writeText(url.shortUrl);

    toast.success("Copied!");
  };
  const remove = async () => {

    const ok = window.confirm(
        "Delete this URL?"
    );

    if (!ok) return;

    try {

        await axios.delete(
            `${API}/urls/${url.id}`
        );

        toast.success("Deleted!");

        fetchUrls();

    } catch {

        toast.error("Delete failed");

    }

};

  return (
    <tr className="border-t border-slate-800 hover:bg-slate-800 transition">

      <td className="px-6 py-5">

        <a
          href={url.shortUrl}
          target="_blank"
          rel="noreferrer"
          className="text-cyan-400 hover:underline"
        >
          {url.shortCode}
        </a>

      </td>

      <td className="px-6 py-5">

        <div className="max-w-sm truncate">

          {url.originalUrl}

        </div>

      </td>

      <td className="px-6 py-5 text-center">

        <span className="font-semibold">

          {url.clicks}

        </span>

      </td>

      <td className="px-6 py-5 text-center">

        {new Date(url.createdAt).toLocaleDateString()}

      </td>

      <td className="px-6 py-5">

        <div className="flex justify-center gap-3">

          <button
            onClick={copy}
            className="text-cyan-400 hover:text-cyan-300"
            title="Copy"
          >
            <FaCopy />
          </button>

          <a
            href={url.shortUrl}
            target="_blank"
            rel="noreferrer"
            className="text-green-400 hover:text-green-300"
            title="Visit"
          >
            <FaExternalLinkAlt />
          </a>

          <button
    onClick={remove}
    className="text-red-400 hover:text-red-300"
    title="Delete"
>
            <FaTrash />
          </button>

        </div>

      </td>

    </tr>
  );
}