import VideoUploader from "@/components/VideoUploader";
import PlatformCard from "@/components/PlatformCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import BeatUploader from "@/components/BeatUploader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AudioVisualizer from "@/components/AudioVisualizer";
import { CubeCustomization } from "@/components/visualizer/CubeCustomization";
import { BlogPost } from "@/components/BlogPost";
import { Events } from "@/components/Events";
import { useState } from "react";
import { CubeImageUploader } from "@/components/visualizer/CubeImageUploader";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [cubeColor, setCubeColor] = useState('#8B5CF6');
  const [cubeSize, setCubeSize] = useState(1);
  const [particleEnabled, setParticleEnabled] = useState(true);
  const [neonEnabled, setNeonEnabled] = useState(true);
  const { toast } = useToast();

  const handleGenerateAI = () => {
    console.log('Generating AI content');
  };

  const handleImageUpload = (face: string, file: File) => {
    console.log(`Uploading image for ${face} face:`, file.name);
    toast({
      title: "Image Upload",
      description: `Successfully uploaded image for ${face} face`,
    });
  };

  // For demo purposes, you would typically get this from your auth state
  const isPremiumUser = true;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <Tabs defaultValue="video" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="video">Video Upload</TabsTrigger>
              <TabsTrigger value="beat">Beat Upload</TabsTrigger>
              <TabsTrigger value="cube">Cube Visualizer</TabsTrigger>
              <TabsTrigger value="customize">Customize Cube</TabsTrigger>
              <TabsTrigger value="blog">Blog Post</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
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

            <TabsContent value="cube">
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-4xl font-bold mb-4">Audio Cube Visualizer</h2>
                  <p className="text-muted-foreground">
                    Experience your beats in 3D with our interactive cube visualizer
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="p-6 bg-black/80 backdrop-blur-sm border-neon-purple/20">
                    <AudioVisualizer
                      rotationSpeed={rotationSpeed}
                      cubeColor={cubeColor}
                      cubeSize={cubeSize}
                      particleEnabled={particleEnabled}
                      neonEnabled={neonEnabled}
                    />
                  </Card>
                  <CubeImageUploader 
                    cube={null} 
                    onImageUpload={handleImageUpload}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="customize">
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-4xl font-bold mb-4">Customize Your Cube</h2>
                  <p className="text-muted-foreground">
                    Personalize your beat visualizer with custom colors and effects
                  </p>
                </div>
                
                <CubeCustomization
                  onRotationSpeedChange={setRotationSpeed}
                  onColorChange={setCubeColor}
                  onSizeChange={setCubeSize}
                  onParticleToggle={setParticleEnabled}
                  onNeonToggle={setNeonEnabled}
                />
              </div>
            </TabsContent>

            <TabsContent value="blog">
              <BlogPost />
            </TabsContent>

            <TabsContent value="events">
              <Events />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
