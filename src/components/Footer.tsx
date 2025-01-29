export const Footer = () => {
  return (
    <footer className="bg-background/80 backdrop-blur-lg border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex space-x-6">
            <a href="#" className="hover:text-neon-purple transition-colors">Licensing</a>
            <a href="#" className="hover:text-neon-purple transition-colors">Contact</a>
            <a href="#" className="hover:text-neon-purple transition-colors">Bio</a>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2024 RudyBtz Beats. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};