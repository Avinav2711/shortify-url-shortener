import { FaSpinner } from "react-icons/fa";

export default function Loader() {
  return (
    <div className="flex items-center justify-center gap-3">

      <FaSpinner className="animate-spin text-2xl" />

      <span className="font-semibold">
        Creating your short URL...
      </span>

    </div>
  );
}