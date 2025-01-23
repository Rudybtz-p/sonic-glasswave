import { VideoUploader } from "@/components/VideoUploader";
import PlatformCard from "@/components/PlatformCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import BeatUploader from "@/components/BeatUploader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AudioVisualizer from "@/components/audio/AudioVisualizer";
import { CubeCustomization } from "@/components/visualizer/CubeCustomization";
import { BlogPost } from "@/components/BlogPost";
import { Events } from "@/components/Events";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { APIKeyManager } from "@/components/APIKeyManager";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [cubeColor, setCubeColor] = useState('#8B5CF6');
  const [cubeSize, setCubeSize] = useState(1);
  const [particleEnabled, setParticleEnabled] = useState(true);
  const [neonEnabled, setNeonEnabled] = useState(true);
  const [displayText, setDisplayText] = useState('');
  const { toast } = useToast();

  const handleGenerateAI = () => {
    console.log('Generating AI content');
    toast({
      title: "AI Generation",
      description: "Generating content with AI...",
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
            <TabsList className="grid w-full grid-cols-7 mb-8">
              <TabsTrigger value="video">Video Upload</TabsTrigger>
              <TabsTrigger value="beat">Beat Upload</TabsTrigger>
              <TabsTrigger value="cube">3D Visualizer</TabsTrigger>
              <TabsTrigger value="customize">Customize</TabsTrigger>
              <TabsTrigger value="blog">Blog Post</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="api">API Keys</TabsTrigger>
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

            <TabsContent value="cube" className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">3D Audio Visualizer</h2>
                <p className="text-muted-foreground">
                  Experience your beats in 3D with our interactive cube visualizer
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6 bg-black/80 backdrop-blur-sm border-neon-purple/20 relative min-h-[400px]">
                  <AudioVisualizer
                    rotationSpeed={rotationSpeed}
                    cubeColor={cubeColor}
                    cubeSize={cubeSize}
                    particleEnabled={particleEnabled}
                    neonEnabled={neonEnabled}
                    displayText={displayText}
                  />
                </Card>
                <div className="space-y-4">
                  <Card className="p-6 bg-black/80 backdrop-blur-sm border-neon-purple/20">
                    <div className="space-y-4">
                      <Label htmlFor="displayText">3D Text</Label>
                      <Input
                        id="displayText"
                        placeholder="Enter text to display in 3D..."
                        value={displayText}
                        onChange={(e) => setDisplayText(e.target.value)}
                      />
                    </div>
                  </Card>
                  <Card className="p-6 bg-black/80 backdrop-blur-sm border-neon-purple/20">
                    <CubeCustomization
                      onRotationSpeedChange={setRotationSpeed}
                      onColorChange={setCubeColor}
                      onSizeChange={setCubeSize}
                      onParticleToggle={setParticleEnabled}
                      onNeonToggle={setNeonEnabled}
                    />
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="api">
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-4xl font-bold mb-4">API Key Management</h2>
                  <p className="text-muted-foreground">
                    Manage your API keys for third-party integrations
                  </p>
                </div>
                <APIKeyManager />
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
