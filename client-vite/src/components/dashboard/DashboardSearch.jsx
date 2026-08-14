import { FaSearch } from "react-icons/fa";

export default function DashboardSearch({
  search,
  setSearch,
}) {
  return (
    <div className="mb-8">

      <div className="relative">

        <FaSearch className="absolute left-5 top-5 text-slate-400" />

        <input
          type="text"
          placeholder="Search by alias or original URL..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full pl-14 pr-5 py-4 rounded-2xl bg-slate-900 border border-slate-700 outline-none focus:border-cyan-500"
        />

      </div>

    </div>
  );
}