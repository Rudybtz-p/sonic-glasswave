import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { FormFieldComponent } from "./FormField";

export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

type SignUpFormProps = {
  form: UseFormReturn<SignUpFormData>;
};

export const SignUpForm = ({ form }: SignUpFormProps) => {
  return (
    <>
      <FormFieldComponent
        form={form}
        name="email"
        label="Email"
        placeholder="Enter your email"
      />
      <FormFieldComponent
        form={form}
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
      />
      <FormFieldComponent
        form={form}
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
      />
    </>
  );
};