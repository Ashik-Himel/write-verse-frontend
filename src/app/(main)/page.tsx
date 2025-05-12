import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, MessageSquare, ThumbsUp } from "lucide-react";
import Link from "next/link";

export default function Home() {
  // Mock data for the homepage
  const categories = [
    { id: 1, name: "Technology", count: 245, color: "bg-blue-500" },
    { id: 2, name: "Science", count: 189, color: "bg-green-500" },
    { id: 3, name: "Arts", count: 156, color: "bg-purple-500" },
    { id: 4, name: "Literature", count: 132, color: "bg-yellow-500" },
    { id: 5, name: "Philosophy", count: 98, color: "bg-red-500" },
    { id: 6, name: "History", count: 87, color: "bg-indigo-500" },
  ];

  const announcements = [
    {
      id: 1,
      title: "New Community Guidelines",
      excerpt:
        "We've updated our community guidelines to ensure a positive experience for all users.",
      date: "2 days ago",
    },
    {
      id: 2,
      title: "Upcoming Maintenance",
      excerpt:
        "WriteVerse will be undergoing maintenance on June 15th from 2-4 AM UTC.",
      date: "5 days ago",
    },
    {
      id: 3,
      title: "New Feature Release",
      excerpt:
        "We're excited to announce the launch of our new discussion forums and improved search functionality.",
      date: "1 week ago",
    },
    {
      id: 4,
      title: "Community Milestone",
      excerpt:
        "WriteVerse has reached 10,000 active members! Thank you for being part of our growing community.",
      date: "2 weeks ago",
    },
  ];

  const popularPosts = [
    {
      id: 1,
      title: "The Future of Artificial Intelligence",
      author: "Alex Johnson",
      category: "Technology",
      upvotes: 342,
      comments: 56,
      date: "3 days ago",
    },
    {
      id: 2,
      title: "Understanding Quantum Physics",
      author: "Maria Chen",
      category: "Science",
      upvotes: 289,
      comments: 42,
      date: "1 week ago",
    },
    {
      id: 3,
      title: "The Art of Creative Writing",
      author: "James Smith",
      category: "Literature",
      upvotes: 256,
      comments: 38,
      date: "2 weeks ago",
    },
    {
      id: 4,
      title: "Exploring Ancient Civilizations",
      author: "Sarah Williams",
      category: "History",
      upvotes: 187,
      comments: 32,
      date: "3 weeks ago",
    },
    {
      id: 5,
      title: "Modern Philosophy Concepts",
      author: "David Lee",
      category: "Philosophy",
      upvotes: 165,
      comments: 28,
      date: "1 month ago",
    },
    {
      id: 6,
      title: "Digital Art Techniques",
      author: "Emma Davis",
      category: "Arts",
      upvotes: 143,
      comments: 25,
      date: "1 month ago",
    },
  ];

  return (
    <div>
      {/* Hero Section - Fullscreen */}
      <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-gradient-to-b from-background to-muted px-4 text-center">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Welcome to <span className="text-primary">WriteVerse</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            A community where ideas flourish, discussions thrive, and knowledge
            expands.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/posts">Explore Posts</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/join">Join Community</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="container py-12">
        {/* Popular Categories */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            Popular Categories
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/posts?category=${category.name}`}>
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div
                      className={`h-2 w-12 rounded-full ${category.color}`}
                    />
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count} posts
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Announcements */}
        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Recent Announcements
            </h2>
            <Button variant="ghost" size="sm" asChild className="gap-1">
              <Link href="/announcements">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {announcements.map((announcement) => (
              <Card
                key={announcement.id}
                className="transition-all hover:shadow-md"
              >
                <CardHeader>
                  <CardTitle>{announcement.title}</CardTitle>
                  <CardDescription>{announcement.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{announcement.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" asChild>
                    <Link href={`/announcements/${announcement.id}`}>
                      Read more
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Popular Posts */}
        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Popular Posts</h2>
            <Button variant="ghost" size="sm" asChild className="gap-1">
              <Link href="/posts">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popularPosts.map((post) => (
              <Card key={post.id} className="transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {post.date}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2 text-lg">
                    {post.title}
                  </CardTitle>
                  <CardDescription>by {post.author}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-sm">{post.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-sm">{post.comments}</span>
                    </div>
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/posts/${post.id}`}>Read</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Join Community CTA */}
      <section className="bg-muted px-8 py-12 text-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Join Our Community Today</h2>
          <p className="text-muted-foreground">
            Connect with like-minded individuals, share your ideas, and be part
            of meaningful discussions.
          </p>
          <Button size="lg" asChild className="mt-2">
            <Link href="/join">Sign Up Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
