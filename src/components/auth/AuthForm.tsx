import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { SignInForm, signInSchema } from "./SignInForm";
import { SignUpForm, signUpSchema } from "./SignUpForm";

type AuthFormProps = {
  mode: "signin" | "signup";
  onToggleMode: () => void;
  onSuccess: () => void;
};

export const AuthForm = ({ mode, onToggleMode, onSuccess }: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(mode === "signin" ? signInSchema : signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(mode === "signup" && { confirmPassword: "" }),
    },
  });

  const onSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      console.log(`Attempting ${mode} with:`, { email: values.email });

      if (mode === "signin") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        console.log("Sign in response:", { data, error });

        if (error) {
          if (error.message === "Invalid login credentials") {
            throw new Error("Invalid email or password. Please try again or sign up if you don't have an account.");
          }
          throw error;
        }

        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });

        console.log("Sign up response:", { data, error });

        if (error) {
          if (error.message.includes("User already registered")) {
            throw new Error("This email is already registered. Please sign in instead.");
          }
          throw error;
        }
        
        toast({
          title: "Success!",
          description: "Please check your email to verify your account.",
        });
      }

      onSuccess();
    } catch (error: any) {
      console.error("Auth error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "An error occurred during authentication",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {mode === "signin" ? (
          <SignInForm form={form} />
        ) : (
          <SignUpForm form={form} />
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Loading..." : mode === "signin" ? "Sign In" : "Sign Up"}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <Button
          variant="link"
          onClick={onToggleMode}
          className="text-sm text-muted-foreground"
          disabled={isLoading}
        >
          {mode === "signin"
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </Button>
      </div>
    </Form>
  );
};