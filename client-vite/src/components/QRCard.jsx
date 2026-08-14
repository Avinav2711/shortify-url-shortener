import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";
import { FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";

export default function QRCard({ url }) {
  const qrRef = useRef(null);

  const downloadQR = () => {
    try {
      const canvas = qrRef.current.querySelector("canvas");

      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      const downloadLink = document.createElement("a");

      downloadLink.href = pngUrl;
      downloadLink.download = "short-url-qrcode.png";

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      toast.success("📥 QR Code Downloaded");
    } catch (err) {
      toast.error("Unable to download QR Code");
    }
  };

  return (
    <div className="mt-10">

      <h3 className="text-center text-xl font-bold mb-5">
        QR Code
      </h3>

      <div className="flex flex-col items-center">

        <div
          ref={qrRef}
          className="bg-white rounded-2xl p-5 shadow-lg"
        >
          <QRCodeCanvas
            value={url}
            size={220}
            includeMargin={true}
          />
        </div>

        <button
          onClick={downloadQR}
          className="mt-6 flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          <FaDownload />
          Download QR
        </button>

      </div>

    </div>
  );
}