import { VideoUploader } from "@/components/VideoUploader";
import { PlatformCard } from "@/components/PlatformCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Index = () => {
  const handleGenerateAI = () => {
    console.log('Generating AI content');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple via-neon-pink to-neon-orange transform perspective-[1000px] rotate-x-12 hover:rotate-x-0 transition-transform duration-300">
              Social 3D Beat Share
            </h1>
            <p className="text-muted-foreground">
              Upload your video once, share it everywhere with AI-powered descriptions
            </p>
          </div>

          <VideoUploader />

          <div className="max-w-2xl mx-auto">
            <PlatformCard
              description=""
              onGenerateAI={handleGenerateAI}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;