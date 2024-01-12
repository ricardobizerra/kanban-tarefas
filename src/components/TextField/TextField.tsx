import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const newTaskSchema = z.object({
    title: z.string(),
    description: z.string(),
});

interface TextFieldProps {
    form: UseFormReturn<z.infer<typeof newTaskSchema>>;
    name: keyof z.infer<typeof newTaskSchema>;
    label: string;
    placeholder: string;
    description?: string;
}

export default function TextField({ form, name, label, placeholder, description }: TextFieldProps) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
            <FormItem>
                <FormLabel>
                    {label}
                </FormLabel>
                <FormControl>
                    <Input placeholder={placeholder} {...field} />
                </FormControl>
                <FormDescription>
                    {description}
                </FormDescription>
                <FormMessage />
            </FormItem>
            )}
        />
    )
}