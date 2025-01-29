import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BeatsTable } from "@/components/BeatsTable";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <Header />
      <main className="pt-16">
        <Hero />
        <div className="container mx-auto px-4 py-8">
          <BeatsTable />
        </div>
      </main>
      <Footer />
      <MusicPlayer />
    </div>
  );
};

export default Index;