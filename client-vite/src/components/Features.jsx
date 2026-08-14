import {
  FaBolt,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";

const features = [
  {
    icon: <FaBolt size={32} />,
    title: "Lightning Fast",
    text: "Generate short URLs instantly with high performance.",
  },
  {
    icon: <FaShieldAlt size={32} />,
    title: "Secure",
    text: "Reliable redirects with safe URL validation.",
  },
  {
    icon: <FaChartLine size={32} />,
    title: "Analytics",
    text: "Track clicks and monitor URL performance.",
  },
];

export default function Features() {
  return (
    <section className="max-w-6xl mx-auto px-6 mt-20">
      <h2 className="text-3xl font-bold text-center mb-10">
        Why Choose Shortify?
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center hover:-translate-y-1 hover:border-cyan-500 transition-all"
          >
            <div className="text-cyan-400 flex justify-center mb-4">
              {feature.icon}
            </div>

            <h3 className="text-xl font-bold mb-2">
              {feature.title}
            </h3>

            <p className="text-slate-400">
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}