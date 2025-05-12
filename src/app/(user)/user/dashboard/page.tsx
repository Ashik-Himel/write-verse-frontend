import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, ThumbsUp, Eye } from "lucide-react"

export default function UserDashboardPage() {
  // Mock data for user dashboard
  const userStats = [
    {
      title: "Your Posts",
      value: "24",
      change: "+3 this month",
      icon: MessageSquare,
    },
    {
      title: "Post Views",
      value: "3,842",
      change: "+15.6%",
      icon: Eye,
    },
    {
      title: "Upvotes",
      value: "567",
      change: "+12.3%",
      icon: ThumbsUp,
    },
    {
      title: "Comments",
      value: "128",
      change: "+8.7%",
      icon: MessageSquare,
    },
  ]

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {userStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent posts and interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No recent activity to display.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Popular Content</CardTitle>
            <CardDescription>Your most viewed and interacted content</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No popular content to display.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
