import React from "react";
import { useState } from "react";
import BeatUploader from "@/components/BeatUploader";
import AudioVisualizer from "@/components/AudioVisualizer";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Beats = () => {
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [cubeColor, setCubeColor] = useState('#8B5CF6');
  const [cubeSize, setCubeSize] = useState(1);
  const [particleEnabled, setParticleEnabled] = useState(true);
  const [neonEnabled, setNeonEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold mb-4">Beat Upload Studio</h2>
          <p className="text-muted-foreground">
            Share your beats with the world
          </p>
          <BeatUploader />
          <AudioVisualizer
            rotationSpeed={rotationSpeed}
            cubeColor={cubeColor}
            cubeSize={cubeSize}
            particleEnabled={particleEnabled}
            neonEnabled={neonEnabled}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Beats;
