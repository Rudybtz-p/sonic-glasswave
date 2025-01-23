import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import AudioVisualizer from '@/components/AudioVisualizer';
import { BeatsTable } from '@/components/BeatsTable';

const Beats = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto space-y-8 py-8">
        <div className="space-y-8">
          <AudioVisualizer
            rotationSpeed={1}
            cubeColor="#8B5CF6"
            cubeSize={1}
            particleEnabled={true}
            neonEnabled={true}
          />
          <BeatsTable />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Beats;