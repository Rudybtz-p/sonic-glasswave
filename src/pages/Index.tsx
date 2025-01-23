import { VideoUploader } from "@/components/VideoUploader";
import { PlatformCard } from "@/components/PlatformCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BeatUploader } from "@/components/BeatUploader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const handleGenerateAI = () => {
    console.log('Generating AI content');
  };

  // For demo purposes, you would typically get this from your auth state
  const isPremiumUser = false;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <Tabs defaultValue="video" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="video">Video Upload</TabsTrigger>
              <TabsTrigger value="beat">Beat Upload</TabsTrigger>
            </TabsList>
            
            <TabsContent value="video">
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-4xl font-bold mb-4">Social Media Video Uploader</h2>
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
            </TabsContent>

            <TabsContent value="beat">
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-4xl font-bold mb-4">Beat Upload Studio</h2>
                  <p className="text-muted-foreground">
                    Share your beats with the world {isPremiumUser ? 'with custom visualizers' : ''}
                  </p>
                </div>

                <BeatUploader isPremium={isPremiumUser} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;