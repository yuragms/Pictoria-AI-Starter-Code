'use client';
import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  model: z.string({
    required_error: 'Model is required!',
  }),
  promt: z.string({
    required_error: 'Promt is required!',
  }),
  guidance: z.number({
    required_error: 'Guidance scale is required!',
  }),
  num_outputs: z
    .number()
    .min(1, { message: 'Number of outputs should be atleast 1.' })
    .max(4, { message: 'Number of outputs must be less then 4.' }),
  aspect_ratio: z.string({
    required_error: 'Aspect_ratio is required!',
  }),
  output_format: z.string({
    required_error: 'Output format is required!',
  }),
  output_quality: z
    .number()
    .min(1, { message: 'Output quality should be atleast 1.' })
    .max(4, { message: 'Output quality must be less then or equal to 100.' }),
  num_inference_steps: z
    .number()
    .min(1, { message: 'Number of inference steps should be atleast 1.' })
    .max(50, {
      message: 'Number of inference steps must be less then or equal to 50.',
    }),
});

// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// });

const Configurations = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: 'black-forest-labs/flux-dev',
      promt: '',
      guidance: 3.5,
      num_outputs: 1,
      output_format: 'jpg',
      aspect_ratio: '1:1',
      output_quality: 80,
      num_inference_steps: 28,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="black-forest-labs/flux-dev">
                    Flux Dev
                  </SelectItem>
                  <SelectItem value="black-forest-labs/flux-schnell">
                    Flux Scnell
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="aspect_ratio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aspect Ratio</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a aspect ratio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1:1">1:1</SelectItem>
                    <SelectItem value="16:9">16:9</SelectItem>
                    <SelectItem value="9:16">9:16</SelectItem>
                    <SelectItem value="21:9">21:9</SelectItem>
                    <SelectItem value="9:21">9:21</SelectItem>
                    <SelectItem value="4:5">4:5</SelectItem>
                    <SelectItem value="5:4">5:4</SelectItem>
                    <SelectItem value="4:3">4:3</SelectItem>
                    <SelectItem value="2:3">2:3</SelectItem>
                    <SelectItem value="3:2">3:2</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="num_outputs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Outputs</FormLabel>
                <FormControl>
                  <Input type="number" min={1} max={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default Configurations;
