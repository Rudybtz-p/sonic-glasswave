import React from 'react';
import { AudioVisualizer } from '@/components/AudioVisualizer';
import { BeatsTable } from '@/components/BeatsTable';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const BeatsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">Beats</h1>
        <AudioVisualizer />
        <BeatsTable />
      </main>
      <Footer />
    </div>
  );
};

export default BeatsPage;