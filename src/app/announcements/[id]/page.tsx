"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock announcement data
const announcement = {
  id: 1,
  title: "New Community Guidelines",
  content: `
    <p>Dear WriteVerse Community,</p>
    
    <p>We are excited to announce our updated community guidelines, designed to ensure that WriteVerse remains a positive, inclusive, and enriching environment for all members. These guidelines will take effect on June 1, 2024.</p>
    
    <h2>Key Updates</h2>
    
    <h3>1. Respectful Communication</h3>
    <p>We've expanded our guidelines on respectful communication to provide clearer examples of what constitutes constructive criticism versus harmful comments. Our goal is to foster meaningful discussions where diverse perspectives can be shared without personal attacks.</p>
    
    <h3>2. Content Moderation</h3>
    <p>We've implemented a more transparent process for content moderation, including a new appeal system for posts or comments that have been flagged. This ensures that moderation decisions are fair and consistent.</p>
    
    <h3>3. Intellectual Property</h3>
    <p>Our guidelines now include more comprehensive information about respecting intellectual property rights, including proper attribution for quotes and references.</p>
    
    <h3>4. Community Reporting</h3>
    <p>We've streamlined the reporting process to make it easier for community members to report content that violates our guidelines. This helps us maintain the quality and integrity of discussions on WriteVerse.</p>
    
    <h2>Implementation</h2>
    
    <p>These updated guidelines will be implemented gradually over the next month. We'll be hosting a series of community Q&A sessions to address any questions or concerns you may have about these changes.</p>
    
    <p>We believe these updates will help WriteVerse continue to grow as a vibrant community where ideas can flourish and meaningful connections can be formed.</p>
    
    <p>Thank you for being part of our community,</p>
    <p>The WriteVerse Team</p>
  `,
  date: "May 15, 2024",
  author: "WriteVerse Admin Team",
};

export default function AnnouncementDetailPage() {
  const router = useRouter();

  return (
    <div className="container py-8">
      <Card className="mx-auto max-w-4xl">
        <Button
          size="sm"
          className="ml-6 mb-6 inline-flex items-center gap-1 w-fit"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" /> Back to announcements
        </Button>
        <CardHeader className="border-b">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold sm:text-3xl">
                {announcement.title}
              </CardTitle>
              <span className="text-sm text-muted-foreground">
                {announcement.date}
              </span>
            </div>
            <p className="text-sm text-foreground/70">
              By {announcement.author}
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="prose prose-stone max-w-none text-foreground">
            <div dangerouslySetInnerHTML={{ __html: announcement.content }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
