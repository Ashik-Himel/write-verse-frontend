"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  ArrowLeft,
  Flag,
  MessageSquare,
  MoreHorizontal,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// Mock post data
const post = {
  id: 1,
  title: "The Future of Artificial Intelligence",
  content: `
    <p>Artificial Intelligence (AI) has been rapidly evolving over the past decade, transforming industries and reshaping how we interact with technology. As we look to the future, several key trends are emerging that will define the next generation of AI systems.</p>
    
    <h2>Machine Learning Advancements</h2>
    <p>Deep learning models continue to grow in size and capability. Models like GPT-4 have demonstrated remarkable abilities in natural language understanding and generation. Future models will likely become even more sophisticated, with improved reasoning capabilities and multimodal understanding.</p>
    
    <h2>AI Ethics and Governance</h2>
    <p>As AI systems become more powerful, questions about ethics, bias, and governance become increasingly important. The development of robust frameworks for ensuring AI systems are fair, transparent, and accountable will be crucial.</p>
    
    <h2>Human-AI Collaboration</h2>
    <p>Rather than replacing humans, the most promising applications of AI involve collaboration between humans and machines. Systems that can augment human capabilities, providing insights and automating routine tasks while leaving creative and strategic decisions to humans, will likely see the most adoption.</p>
    
    <h2>Specialized AI Hardware</h2>
    <p>The computational demands of advanced AI systems are driving innovation in specialized hardware. Neuromorphic computing, quantum computing, and other novel architectures may provide the foundation for future AI breakthroughs.</p>
    
    <h2>Conclusion</h2>
    <p>The future of AI is both exciting and challenging. As these technologies continue to evolve, they will offer unprecedented opportunities to solve complex problems and enhance human capabilities. However, realizing this potential will require careful consideration of the ethical, social, and technical challenges involved.</p>
  `,
  author: {
    id: 101,
    name: "Alex Johnson",
    image: "",
    role: "AI Researcher",
    joinDate: "January 2022",
  },
  category: "Technology",
  tags: ["AI", "Machine Learning", "Future Tech", "Ethics"],
  upvotes: 342,
  downvotes: 28,
  comments: 56,
  date: "May 10, 2024",
  views: 1205,
};

// Mock comments data
const comments = [
  {
    id: 1,
    content:
      "This is a really insightful article. I especially appreciate the section on AI ethics and governance.",
    author: {
      id: 201,
      name: "Maria Chen",
      image: "",
      role: "Data Scientist",
    },
    date: "May 11, 2024",
    upvotes: 24,
    downvotes: 2,
    replies: [
      {
        id: 3,
        content:
          "I agree. Ethics in AI is becoming increasingly important as these systems become more integrated into our daily lives.",
        author: {
          id: 203,
          name: "James Smith",
          image: "",
          role: "Ethics Professor",
        },
        date: "May 11, 2024",
        upvotes: 15,
        downvotes: 0,
      },
    ],
  },
  {
    id: 2,
    content:
      "I'm curious about the timeline for some of these advancements. Do you think we'll see significant progress in neuromorphic computing within the next 5 years?",
    author: {
      id: 202,
      name: "David Lee",
      image: "",
      role: "Hardware Engineer",
    },
    date: "May 12, 2024",
    upvotes: 18,
    downvotes: 1,
    replies: [],
  },
];

export default function PostDetailPage() {
  const router = useRouter();
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userVote, setUserVote] = useState<"upvote" | "downvote" | null>(null);
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [downvotes, setDownvotes] = useState(post.downvotes);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  // Simulate if user is logged in or not
  const isLoggedIn = false;

  const handleVote = (voteType: "upvote" | "downvote") => {
    if (!isLoggedIn) {
      setLoginDialogOpen(true);
      return;
    }

    if (userVote === voteType) {
      // Remove vote
      setUserVote(null);
      if (voteType === "upvote") {
        setUpvotes(upvotes - 1);
      } else {
        setDownvotes(downvotes - 1);
      }
    } else {
      // Add or change vote
      if (userVote === "upvote" && voteType === "downvote") {
        setUpvotes(upvotes - 1);
        setDownvotes(downvotes + 1);
      } else if (userVote === "downvote" && voteType === "upvote") {
        setDownvotes(downvotes - 1);
        setUpvotes(upvotes + 1);
      } else if (voteType === "upvote") {
        setUpvotes(upvotes + 1);
      } else {
        setDownvotes(downvotes + 1);
      }
      setUserVote(voteType);
    }
  };

  const handleSubmitComment = () => {
    if (!isLoggedIn) {
      setLoginDialogOpen(true);
      return;
    }

    if (!newComment.trim()) {
      toast("Comment cannot be empty", {
        description: "Please enter a comment before submitting.",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast("Comment submitted", {
        description: "Your comment has been posted successfully.",
      });
      setNewComment("");
      setIsSubmitting(false);
      // In a real app, we would add the new comment to the list
    }, 1000);
  };

  const handleShare = () => {
    // Copy the current URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    toast("Link copied", {
      description: "Post link has been copied to clipboard.",
    });
  };

  const handleReport = () => {
    if (!isLoggedIn) {
      setLoginDialogOpen(true);
      return;
    }

    if (!reportReason.trim()) {
      toast("Report reason required", {
        description: "Please provide a reason for reporting this post.",
      });
      return;
    }

    // Simulate API call
    setIsSubmitting(true);
    setTimeout(() => {
      toast("Report submitted", {
        description: "Thank you for your report. Our team will review it.",
      });
      setReportReason("");
      setReportDialogOpen(false);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container py-8">
      <Card className="mx-auto max-w-4xl">
        <Button
          size="sm"
          className="ml-6 mb-6 inline-flex items-center gap-1 w-fit"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" /> Back to posts
        </Button>
        <CardHeader className="border-b">
          <div className="mb-4 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{post.category}</Badge>
              <span className="text-sm text-muted-foreground">{post.date}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {post.title}
            </h1>

            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={post.author.image || "/placeholder.svg"}
                  alt={post.author.name}
                />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{post.author.name}</div>
                <div className="text-sm text-muted-foreground">
                  {post.author.role}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="prose prose-stone max-w-none text-foreground">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className={`flex items-center gap-1 ${
                  userVote === "upvote"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
                onClick={() => handleVote("upvote")}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{upvotes}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`flex items-center gap-1 ${
                  userVote === "downvote"
                    ? "bg-destructive text-destructive-foreground"
                    : ""
                }`}
                onClick={() => handleVote("downvote")}
              >
                <ThumbsDown className="h-4 w-4" />
                <span>{downvotes}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
            <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-muted-foreground"
                >
                  <Flag className="h-4 w-4" />
                  <span className="hidden sm:inline">Report</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Report Post</DialogTitle>
                  <DialogDescription>
                    Please provide a reason for reporting this post. Our
                    moderators will review your report.
                  </DialogDescription>
                </DialogHeader>
                <Textarea
                  placeholder="Reason for reporting..."
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="min-h-[100px]"
                />
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setReportDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleReport} disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <Card className="mx-auto mt-8 max-w-4xl">
        <CardHeader>
          <CardTitle>Comments ({comments.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
            />
            <Button onClick={handleSubmitComment} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Comment"}
            </Button>
          </div>

          <div className="space-y-6">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={comment.author.image || "/placeholder.svg"}
                          alt={comment.author.name}
                        />
                        <AvatarFallback>
                          {comment.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">
                          {comment.author.name}
                        </CardTitle>
                        <CardDescription>{comment.date}</CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            if (!isLoggedIn) {
                              setLoginDialogOpen(true);
                              return;
                            }
                            // Handle report comment
                            toast("Comment reported", {
                              description:
                                "Thank you for your report. Our team will review it.",
                            });
                          }}
                        >
                          Report Comment
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{comment.content}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1 px-2"
                    >
                      <ThumbsUp className="h-3 w-3" />
                      <span className="text-xs">{comment.upvotes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1 px-2"
                    >
                      <ThumbsDown className="h-3 w-3" />
                      <span className="text-xs">{comment.downvotes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1 px-2"
                    >
                      <MessageSquare className="h-3 w-3" />
                      <span className="text-xs">Reply</span>
                    </Button>
                  </div>
                </CardFooter>

                {comment.replies.length > 0 && (
                  <div className="ml-8 mt-2 space-y-4 border-l pl-4">
                    {comment.replies.map((reply) => (
                      <Card key={reply.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={reply.author.image || "/placeholder.svg"}
                                  alt={reply.author.name}
                                />
                                <AvatarFallback>
                                  {reply.author.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-sm">
                                  {reply.author.name}
                                </CardTitle>
                                <CardDescription className="text-xs">
                                  {reply.date}
                                </CardDescription>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    if (!isLoggedIn) {
                                      setLoginDialogOpen(true);
                                      return;
                                    }
                                    // Handle report reply
                                    toast("Reply reported", {
                                      description:
                                        "Thank you for your report. Our team will review it.",
                                    });
                                  }}
                                >
                                  Report Reply
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{reply.content}</p>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 gap-1 px-2"
                            >
                              <ThumbsUp className="h-3 w-3" />
                              <span className="text-xs">{reply.upvotes}</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 gap-1 px-2"
                            >
                              <ThumbsDown className="h-3 w-3" />
                              <span className="text-xs">{reply.downvotes}</span>
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Login Dialog */}
      <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to be logged in to perform this action.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center">
            <AlertTriangle className="h-16 w-16 text-amber-500" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLoginDialogOpen(false)}>
              Cancel
            </Button>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
