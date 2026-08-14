import DashboardRow from "./DashboardRow";

export default function DashboardTable({
    urls,
    fetchUrls,
}) {  if (urls.length === 0) {
    return (
      <div className="bg-slate-900 rounded-2xl p-10 text-center border border-slate-700">
        <h2 className="text-2xl font-bold text-slate-300">
          No URLs Found
        </h2>

        <p className="text-slate-500 mt-2">
          Start by creating your first short URL.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-700">

      <table className="min-w-full bg-slate-900">

        <thead className="bg-slate-800">

          <tr>

            <th className="px-6 py-4 text-left">
              Short URL
            </th>

            <th className="px-6 py-4 text-left">
              Original URL
            </th>

            <th className="px-6 py-4 text-center">
              Clicks
            </th>

            <th className="px-6 py-4 text-center">
              Created
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {urls.map((url) => (

            <DashboardRow
    key={url.id}
    url={url}
    fetchUrls={fetchUrls}
/>

          ))}

        </tbody>

      </table>

    </div>
  );
}