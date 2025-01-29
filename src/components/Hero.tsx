import { Button } from "./ui/button";
import { Play } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#1A1F2C] to-[#403E43] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
      <div className="relative container mx-auto px-4 text-center space-y-8">
        <h2 className="text-4xl md:text-6xl font-bold text-white">
          Latest Trap & UK Drill Beats
        </h2>
        <p className="text-xl md:text-2xl text-gray-300">Producer: RudyBtz</p>
        <Button 
          size="lg" 
          className="bg-neon-purple hover:bg-neon-pink transition-colors duration-300"
        >
          <Play className="mr-2 h-5 w-5" /> Stream Now
        </Button>
      </div>
    </section>
  );
};