import { Github } from "lucide-react";
import { Button } from "./ui/button";
import { AuthModal } from "./auth/AuthModal";
import { useAdmin } from "@/hooks/useAdmin";
import { Badge } from "./ui/badge";

export const Header = () => {
  const { isAdmin } = useAdmin();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
            Cubeatz
          </h1>
          {isAdmin && (
            <Badge variant="secondary" className="ml-2">
              Admin
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <AuthModal />
          <Button variant="outline" size="icon" asChild>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};