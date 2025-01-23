import { Card } from "@/components/ui/card";
import { VideoUploader } from "@/components/VideoUploader";
import { PlatformCard } from "@/components/PlatformCard";
import { useState } from "react";
import { toast } from "sonner";

export const VideoUploadSection = () => {
  const [description, setDescription] = useState("");

  const handleGenerateAI = () => {
    console.log("Generating AI content for social media posts");
    toast.success("AI content generation started");
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <VideoUploader />
      <PlatformCard
        description={description}
        onGenerateAI={handleGenerateAI}
      />
    </div>
  );
};