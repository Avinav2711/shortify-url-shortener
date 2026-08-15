import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Background from "../components/Background";
import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardSearch from "../components/dashboard/DashboardSearch";
import DashboardTable from "../components/dashboard/DashboardTable";
import Loader from "../components/Loader";

const API = `${import.meta.env.VITE_API_URL}/api`;

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/urls`);

      setUrls(res.data.urls);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load URLs");
    } finally {
      setLoading(false);
    }
  };

  const filteredUrls = useMemo(() => {
    return urls.filter((url) => {
      const query = search.toLowerCase();

      return (
        url.originalUrl.toLowerCase().includes(query) ||
        url.shortCode.toLowerCase().includes(query) ||
        (url.customAlias || "").toLowerCase().includes(query)
      );
    });
  }, [urls, search]);

  return (
    <>
      <Background />

      <div className="min-h-screen text-white px-6 py-12">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-5xl font-black mb-10">
            Analytics Dashboard
          </h1>

          <DashboardStats urls={filteredUrls} />

          <DashboardSearch
            search={search}
            setSearch={setSearch}
          />

          {loading ? (
            <div className="mt-20 flex justify-center">
              <Loader />
            </div>
          ) : (
            <DashboardTable
    urls={filteredUrls}
    fetchUrls={fetchUrls}
/>
          )}

        </div>

      </div>
    </>
  );
}