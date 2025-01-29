import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BeatsTable } from '@/components/BeatsTable';

const Beats = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 backdrop-blur-sm" />
        <div className="relative container mx-auto px-4 text-center space-y-6">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple via-neon-pink to-neon-orange">
            Latest Trap & UK Drill Beats
          </h1>
          <p className="text-xl text-muted-foreground">
            Producer: RudyBtz
          </p>
          <Button 
            className="bg-neon-purple hover:bg-neon-pink transition-all duration-300 transform hover:scale-105"
            size="lg"
          >
            Stream Now
          </Button>
        </div>
      </section>

      {/* Beats Table Section */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <BeatsTable />
      </main>

      <Footer />
    </div>
  );
};

export default Beats;