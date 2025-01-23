import { Card } from "@/components/ui/card";
import { VideoUploader } from "@/components/VideoUploader";

export const VideoUploadSection = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Video Upload</h2>
        <p className="text-muted-foreground">
          Upload your videos to create custom visualizations
        </p>
      </div>
      
      <Card className="p-6 bg-black/80 backdrop-blur-sm border-neon-purple/20">
        <VideoUploader />
      </Card>
    </div>
  );
};