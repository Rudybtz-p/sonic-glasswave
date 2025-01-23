import { VideoUploader } from "@/components/VideoUploader";
import PlatformCard from "@/components/PlatformCard";
import { useToast } from "@/components/ui/use-toast";

export const VideoUploadSection = () => {
  const { toast } = useToast();

  const handleGenerateAI = () => {
    console.log('Generating AI content');
    toast({
      title: "AI Generation",
      description: "Generating content with AI...",
    });
  };

  return (
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
  );
};