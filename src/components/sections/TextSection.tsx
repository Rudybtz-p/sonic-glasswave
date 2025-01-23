import { Card } from "@/components/ui/card";
import AudioVisualizer from "@/components/audio/AudioVisualizer";
import { TextCustomization } from "@/components/visualizer/TextCustomization";

interface TextSectionProps {
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
  neonEnabled: boolean;
  setNeonEnabled: (enabled: boolean) => void;
}

export const TextSection: React.FC<TextSectionProps> = ({
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
  neonEnabled,
  setNeonEnabled,
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">3D Text Customization</h2>
        <p className="text-muted-foreground">
          Customize the 3D text appearance and effects
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 bg-black/80 backdrop-blur-sm border-neon-purple/20 relative min-h-[400px]">
          <AudioVisualizer
            rotationSpeed={1}
            cubeColor="#8B5CF6"
            cubeSize={1}
            particleEnabled={true}
            neonEnabled={neonEnabled}
            displayText={displayText}
            audioData={null}
          />
        </Card>
        <div className="space-y-4">
          <TextCustomization
            onTextChange={setDisplayText}
            onFontChange={setSelectedFont}
            onGlowToggle={setGlowEnabled}
            onNeonToggle={setNeonEnabled}
            onSizeChange={setTextSize}
            onColorChange={setTextColor}
            onAnimationChange={setTextAnimation}
          />
        </div>
      </div>
    </div>
  );
};