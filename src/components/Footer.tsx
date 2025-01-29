export const Footer = () => {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-lg border-neon-purple/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Licensing</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            <a href="#" className="hover:text-foreground transition-colors">Bio</a>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RudyBtz Beats. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};