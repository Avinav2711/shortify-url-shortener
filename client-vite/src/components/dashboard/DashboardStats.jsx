import { FaLink, FaMousePointer, FaChartLine } from "react-icons/fa";

export default function DashboardStats({ urls }) {
  const totalUrls = urls.length;

  const totalClicks = urls.reduce(
    (sum, url) => sum + url.clicks,
    0
  );

  const averageClicks =
    totalUrls === 0
      ? 0
      : (totalClicks / totalUrls).toFixed(1);

  const cardStyle =
    "bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-700";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

      <div className={cardStyle}>
        <FaLink className="text-cyan-400 text-3xl mb-4" />

        <p className="text-slate-400">
          Total URLs
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {totalUrls}
        </h2>
      </div>

      <div className={cardStyle}>
        <FaMousePointer className="text-green-400 text-3xl mb-4" />

        <p className="text-slate-400">
          Total Clicks
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {totalClicks}
        </h2>
      </div>

      <div className={cardStyle}>
        <FaChartLine className="text-purple-400 text-3xl mb-4" />

        <p className="text-slate-400">
          Avg. Clicks
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {averageClicks}
        </h2>
      </div>

    </div>
  );
}