import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

type FormFieldProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
};

export const FormFieldComponent = ({
  form,
  name,
  label,
  type = "text",
  placeholder,
}: FormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};