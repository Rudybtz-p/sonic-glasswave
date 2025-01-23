import { Facebook, Instagram, Youtube, Twitter, Brain, BookOpen, Music, Globe } from 'lucide-react';
import { Button } from './ui/button';

export const Footer = () => {
  return (
    <footer className="border-t mt-auto bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect With Us</h3>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-facebook hover:text-facebook/80">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-instagram hover:text-instagram/80">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-youtube hover:text-youtube/80">
                <Youtube className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-white/80">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-neon-purple" />
                <span>AI Mastering</span>
              </li>
              <li className="flex items-center gap-2">
                <Music className="h-4 w-4 text-neon-pink" />
                <span>Beat Distribution</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-neon-blue" />
                <span>Worldwide Licensing</span>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-neon-orange" />
                <span>Blog</span>
              </li>
              <li>Tutorials</li>
              <li>Support</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <p className="text-gray-300">
              Get in touch for collaborations and business inquiries
            </p>
            <Button 
              className="bg-neon-purple hover:bg-neon-pink transition-colors duration-300"
            >
              Contact Us
            </Button>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Beat Distribution Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};