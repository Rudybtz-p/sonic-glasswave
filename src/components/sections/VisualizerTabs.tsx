import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoUploadSection } from "./VideoUploadSection";
import { BeatUploadSection } from "./BeatUploadSection";
import { VisualizerSection } from "./VisualizerSection";
import { TextSection } from "./TextSection";
import { APIKeyManager } from "@/components/APIKeyManager";
import { BlogPost } from "@/components/BlogPost";
import { Events } from "@/components/Events";

interface VisualizerTabsProps {
  rotationSpeed: number;
  setRotationSpeed: (speed: number) => void;
  cubeColor: string;
  setCubeColor: (color: string) => void;
  cubeSize: number;
  setCubeSize: (size: number) => void;
  particleEnabled: boolean;
  setParticleEnabled: (enabled: boolean) => void;
  neonEnabled: boolean;
  setNeonEnabled: (enabled: boolean) => void;
  textSize: number;
  setTextSize: (size: number) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  displayText: string;
  setDisplayText: (text: string) => void;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  textAnimation: string;
  setTextAnimation: (animation: string) => void;
  glowEnabled: boolean;
  setGlowEnabled: (enabled: boolean) => void;
}

export const VisualizerTabs: React.FC<VisualizerTabsProps> = ({
  rotationSpeed,
  setRotationSpeed,
  cubeColor,
  setCubeColor,
  cubeSize,
  setCubeSize,
  particleEnabled,
  setParticleEnabled,
  neonEnabled,
  setNeonEnabled,
  textSize,
  setTextSize,
  textColor,
  setTextColor,
  displayText,
  setDisplayText,
  selectedFont,
  setSelectedFont,
  textAnimation,
  setTextAnimation,
  glowEnabled,
  setGlowEnabled,
}) => {
  return (
    <Tabs defaultValue="video" className="w-full">
      <TabsList className="grid w-full grid-cols-8 mb-8">
        <TabsTrigger value="video">Video Upload</TabsTrigger>
        <TabsTrigger value="beat">Beat Upload</TabsTrigger>
        <TabsTrigger value="cube">3D Visualizer</TabsTrigger>
        <TabsTrigger value="text">3D Text</TabsTrigger>
        <TabsTrigger value="customize">Customize</TabsTrigger>
        <TabsTrigger value="blog">Blog Post</TabsTrigger>
        <TabsTrigger value="events">Events</TabsTrigger>
        <TabsTrigger value="api">API Keys</TabsTrigger>
      </TabsList>

      <TabsContent value="video">
        <VideoUploadSection />
      </TabsContent>

      <TabsContent value="beat">
        <BeatUploadSection />
      </TabsContent>

      <TabsContent value="cube">
        <VisualizerSection
          rotationSpeed={rotationSpeed}
          setRotationSpeed={setRotationSpeed}
          cubeColor={cubeColor}
          setCubeColor={setCubeColor}
          cubeSize={cubeSize}
          setCubeSize={setCubeSize}
          particleEnabled={particleEnabled}
          setParticleEnabled={setParticleEnabled}
          neonEnabled={neonEnabled}
          setNeonEnabled={setNeonEnabled}
          displayText={displayText}
        />
      </TabsContent>

      <TabsContent value="text">
        <TextSection
          textSize={textSize}
          setTextSize={setTextSize}
          textColor={textColor}
          setTextColor={setTextColor}
          displayText={displayText}
          setDisplayText={setDisplayText}
          selectedFont={selectedFont}
          setSelectedFont={setSelectedFont}
          textAnimation={textAnimation}
          setTextAnimation={setTextAnimation}
          glowEnabled={glowEnabled}
          setGlowEnabled={setGlowEnabled}
          neonEnabled={neonEnabled}
          setNeonEnabled={setNeonEnabled}
        />
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
  );
};