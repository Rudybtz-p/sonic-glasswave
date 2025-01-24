import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { FormFieldComponent } from "./FormField";

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormProps = {
  form: UseFormReturn<z.infer<typeof signInSchema>>;
};

export const SignInForm = ({ form }: SignInFormProps) => {
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
    </>
  );
};