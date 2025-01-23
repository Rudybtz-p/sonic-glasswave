import { Card } from "@/components/ui/card";
import { BeatUploader } from "@/components/BeatUploader";
import { BeatsTable } from "@/components/BeatsTable";

export const BeatUploadSection = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Beat Upload</h2>
        <p className="text-muted-foreground">
          Upload your beats and manage your audio library
        </p>
      </div>
      
      <Card className="p-6 bg-black/80 backdrop-blur-sm border-neon-purple/20">
        <BeatUploader />
      </Card>
      
      <BeatsTable />
    </div>
  );
};