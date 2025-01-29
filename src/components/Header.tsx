import { Instagram, Youtube, Music } from "lucide-react";
import { Button } from "./ui/button";
import { AuthModal } from "./auth/AuthModal";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="border-b bg-background/80 backdrop-blur-lg border-neon-purple/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              RudyBtz
            </h1>
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link to="/beats" className="text-muted-foreground hover:text-foreground transition-colors">
              Beats
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neon-pink transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-youtube transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://music.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neon-blue transition-colors"
              >
                <Music className="h-5 w-5" />
              </a>
            </Button>
          </div>
          <AuthModal />
        </div>
      </div>
    </header>
  );
};