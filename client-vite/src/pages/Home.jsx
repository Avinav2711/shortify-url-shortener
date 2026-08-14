import Background from "../components/Background";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import UrlForm from "../components/UrlForm";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Background />
      <Navbar />

      <main className="min-h-screen text-white">

        <section className="max-w-6xl mx-auto px-6 py-16">

          <Hero />

          <div className="mt-12 flex justify-center">
            <UrlForm />
          </div>

        </section>

        <Features />

        <Footer />

      </main>
    </>
  );
}