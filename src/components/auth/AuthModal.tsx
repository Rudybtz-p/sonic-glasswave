import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { AuthForm } from "./AuthForm";

export const AuthModal = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [open, setOpen] = useState(false);

  const toggleMode = () => {
    setMode((prev) => (prev === "signin" ? "signup" : "signin"));
  };

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === "signin" ? "Sign In" : "Sign Up"}</DialogTitle>
        </DialogHeader>
        <AuthForm 
          mode={mode} 
          onToggleMode={toggleMode} 
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};