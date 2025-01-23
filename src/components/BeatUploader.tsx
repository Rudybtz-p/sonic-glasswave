import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Music, Upload, Waveform } from "lucide-react";
import AudioVisualizer from "./AudioVisualizer";

interface BeatMetadata {
  title: string;
  genre: string;
  bpm: string;
  key: string;
}

const BeatUploader = ({ isPremium = false }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [metadata, setMetadata] = useState<BeatMetadata>({
    title: "",
    genre: "",
    bpm: "",
    key: "",
  });
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("File dropped:", acceptedFiles[0]?.name);
    const audioFile = acceptedFiles[0];
    if (audioFile) {
      setFile(audioFile);
      // Create audio element to extract metadata
      const audio = new Audio(URL.createObjectURL(audioFile));
      audio.onloadedmetadata = () => {
        console.log("Audio metadata loaded");
        setMetadata(prev => ({
          ...prev,
          title: audioFile.name.replace(/\.[^/.]+$/, ""),
          // In a real app, you'd use a library to detect BPM and key
          bpm: "---",
          key: "---"
        }));
      };
      toast({
        title: "File Selected",
        description: `${audioFile.name} has been selected`,
      });
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.flac']
    },
    maxFiles: 1
  });

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No File",
        description: "Please select a file to upload.",
        variant: "destructive"
      });
      return;
    }

    // Simulate file upload
    toast({
      title: "Upload Started",
      description: "Your beat is being uploaded...",
    });

    setTimeout(() => {
      toast({
        title: "Upload Successful",
        description: `${file.name} has been uploaded.`,
      });
      setFile(null);
      setMetadata({
        title: "",
        genre: "",
        bpm: "",
        key: "",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="w-5 h-5" />
            Upload Your Beat
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'}`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            {isDragActive ? (
              <p className="text-lg">Drop the beat here...</p>
            ) : (
              <div>
                <p className="text-lg mb-2">Drag & drop your beat here</p>
                <p className="text-sm text-gray-500">Supports MP3, WAV, FLAC</p>
              </div>
            )}
          </div>

          {file && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={metadata.title}
                    onChange={(e) => setMetadata(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Input
                    id="genre"
                    value={metadata.genre}
                    onChange={(e) => setMetadata(prev => ({ ...prev, genre: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bpm">BPM</Label>
                  <Input
                    id="bpm"
                    value={metadata.bpm}
                    onChange={(e) => setMetadata(prev => ({ ...prev, bpm: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="key">Key</Label>
                  <Input
                    id="key"
                    value={metadata.key}
                    onChange={(e) => setMetadata(prev => ({ ...prev, key: e.target.value }))}
                  />
                </div>
              </div>

              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                variant="outline"
                className="w-full"
              >
                <Waveform className="w-4 h-4 mr-2" />
                {isPlaying ? 'Stop Preview' : 'Preview Beat'}
              </Button>

              {isPremium && isPlaying && (
                <div className="h-64 border rounded-lg overflow-hidden">
                  <AudioVisualizer
                    rotationSpeed={1}
                    cubeColor="#8B5CF6"
                    cubeSize={1}
                    particleEnabled={true}
                    neonEnabled={true}
                  />
                </div>
              )}

              <Button onClick={handleUpload} className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload Beat
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BeatUploader;