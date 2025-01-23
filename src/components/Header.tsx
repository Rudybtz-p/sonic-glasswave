import { Github } from "lucide-react";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Social Media Uploader</h1>
        </div>
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
    </header>
  );
};