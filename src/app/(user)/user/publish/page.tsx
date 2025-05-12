"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const postFormSchema = z.object({
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
  category: z.string({
    required_error: "Please select a category.",
  }),
  tags: z.array(z.string()).optional(),
});

type PostFormValues = z.infer<typeof postFormSchema>;

export default function PublishPostPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const router = useRouter();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      tags: [],
    },
  });

  function onSubmit(data: PostFormValues) {
    setIsLoading(true);

    // Include tags in the data
    data.tags = tags;

    // Simulate API call
    setTimeout(() => {
      toast("Post published", {
        description: "Your post has been published successfully.",
      });
      setIsLoading(false);
      router.push("/user/posts");
    }, 1500);
  }

  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Publish Post</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create a new post</CardTitle>
          <CardDescription>
            Share your thoughts, ideas, and insights with the community.
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
                      <Input placeholder="Enter post title" {...field} />
                    </FormControl>
                    <FormDescription>
                      A clear, concise title will help your post get noticed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Science">Science</SelectItem>
                        <SelectItem value="Arts">Arts</SelectItem>
                        <SelectItem value="Literature">Literature</SelectItem>
                        <SelectItem value="Philosophy">Philosophy</SelectItem>
                        <SelectItem value="History">History</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the category that best fits your post.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel>Tags</FormLabel>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Add up to 5 tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    disabled={tags.length >= 5}
                  />
                  <Button
                    type="button"
                    onClick={addTag}
                    disabled={!tagInput.trim() || tags.length >= 5}
                  >
                    Add
                  </Button>
                </div>
                <FormDescription>
                  Press Enter or click Add to add a tag. Maximum 5 tags.
                </FormDescription>
                <div className="mt-2 flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {tag}</span>
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your post content here..."
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
                  {isLoading ? "Publishing..." : "Publish Post"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
