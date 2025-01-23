import React from "react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import AudioVisualizer from "./AudioVisualizer";

const BeatUploader = ({ isPremium }) => {
  const [file, setFile] = useState(null);
  const { toast } = useToast();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      toast({
        title: "File Selected",
        description: `You have selected ${selectedFile.name}`,
      });
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No File",
        description: "Please select a file to upload.",
      });
      return;
    }

    // Simulate file upload
    setTimeout(() => {
      toast({
        title: "Upload Successful",
        description: `${file.name} has been uploaded.`,
      });
      setFile(null);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleUpload} className="btn">
        Upload Beat
      </button>
      {isPremium && <AudioVisualizer rotationSpeed={1} cubeColor="#8B5CF6" cubeSize={1} particleEnabled={true} neonEnabled={true} />}
    </div>
  );
};

export default BeatUploader;
