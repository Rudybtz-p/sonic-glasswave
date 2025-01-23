import { Card } from "@/components/ui/card";
import AudioVisualizer from "@/components/audio/AudioVisualizer";
import { CubeCustomization } from "@/components/visualizer/CubeCustomization";

interface VisualizerSectionProps {
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
  displayText: string;
}

export const VisualizerSection: React.FC<VisualizerSectionProps> = ({
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
  displayText,
}) => {
  return (
    <div className="space-y-8">
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
            audioData={null}
          />
        </Card>
        <div className="space-y-4">
          <CubeCustomization
            onRotationSpeedChange={setRotationSpeed}
            onColorChange={setCubeColor}
            onSizeChange={setCubeSize}
            onParticleToggle={setParticleEnabled}
            onNeonToggle={setNeonEnabled}
          />
        </div>
      </div>
    </div>
  );
};