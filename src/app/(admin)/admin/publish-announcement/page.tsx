/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const announcementFormSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(100, {
      message: "Title must not be longer than 100 characters.",
    }),
  content: z.string().min(50, {
    message: "Content must be at least 50 characters.",
  }),
});

type AnnouncementFormValues = z.infer<typeof announcementFormSchema>;

export default function PublishAnnouncementPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<AnnouncementFormValues>({
    resolver: zodResolver(announcementFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function onSubmit(data: AnnouncementFormValues) {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast("Announcement published", {
        description: "Your announcement has been published successfully.",
      });
      setIsLoading(false);
      router.push("/admin/announcements");
    }, 1500);
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight">
        Publish Announcement
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Create a new announcement</CardTitle>
          <CardDescription>
            Share important updates and information with the community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter announcement title"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A clear, concise title will help users understand the
                      purpose of the announcement.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your announcement content here..."
                        className="min-h-[300px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can use Markdown syntax for formatting.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Publishing..." : "Publish Announcement"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
