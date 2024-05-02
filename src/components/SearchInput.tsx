"use client";
import { zodResolver } from "@hookform/resolvers/zod";
// Don't forget to import from next/navigation in next 14 instead of importing from next/router
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";

// Here, we are using the shacdn/ui's Form component which includes zod, which is a validation library that we
// can use to define and configure the form's validation schema. This component also uses the reac-hook-form component.
// For more info head over to https://ui.shadcn.com/docs/components/form

const formSchema = z.object({
  input: z.string().min(2).max(50), //-->minimum 2 characters and maximum 50 characters
});

// Notice: This component is based in the example provided in the link above (section Define a form)
// with some modifications made to adapt to this particular SearchInput component.
function SearchInput() {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    // Redirect to the search page with the search terms that the user typed
    router.push(`/search/${values.input}`);
    // Clear the input text
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Search terms..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default SearchInput;
