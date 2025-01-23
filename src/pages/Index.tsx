import { VideoUploader } from "@/components/VideoUploader";
import { PlatformCard } from "@/components/PlatformCard";
import { Youtube, Instagram, Facebook, Share2 } from "lucide-react";

const Index = () => {
  const handleGenerateAI = (platform: string) => {
    console.log(`Generating AI content for ${platform}`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Social Media Video Uploader</h1>
          <p className="text-muted-foreground">
            Upload your video once, share it everywhere with AI-powered descriptions
          </p>
        </div>

        <VideoUploader />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PlatformCard
            platform="youtube"
            title="YouTube"
            icon={<Youtube className="text-youtube" />}
            description=""
            onGenerateAI={() => handleGenerateAI('youtube')}
          />
          <PlatformCard
            platform="instagram"
            title="Instagram"
            icon={<Instagram className="text-instagram" />}
            description=""
            onGenerateAI={() => handleGenerateAI('instagram')}
          />
          <PlatformCard
            platform="facebook"
            title="Facebook"
            icon={<Facebook className="text-facebook" />}
            description=""
            onGenerateAI={() => handleGenerateAI('facebook')}
          />
          <PlatformCard
            platform="tiktok"
            title="TikTok"
            icon={<Share2 className="text-tiktok" />}
            description=""
            onGenerateAI={() => handleGenerateAI('tiktok')}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;