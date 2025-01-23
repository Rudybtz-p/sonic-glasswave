import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { VisualizerTabs } from "@/components/sections/VisualizerTabs";

const Index = () => {
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [cubeColor, setCubeColor] = useState('#8B5CF6');
  const [cubeSize, setCubeSize] = useState(1);
  const [particleEnabled, setParticleEnabled] = useState(true);
  const [neonEnabled, setNeonEnabled] = useState(true);
  const [textSize, setTextSize] = useState(1);
  const [textColor, setTextColor] = useState('#F97316');
  const [displayText, setDisplayText] = useState('');
  const [selectedFont, setSelectedFont] = useState('helvetiker');
  const [textAnimation, setTextAnimation] = useState('none');
  const [glowEnabled, setGlowEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <VisualizerTabs
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
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;