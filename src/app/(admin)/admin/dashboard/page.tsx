import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, ThumbsUp, Users, Eye } from "lucide-react"

export default function AdminDashboardPage() {
  // Mock data for admin dashboard
  const adminStats = [
    {
      title: "Total Users",
      value: "10,482",
      change: "+12.3%",
      icon: Users,
    },
    {
      title: "Total Posts",
      value: "45,328",
      change: "+8.2%",
      icon: MessageSquare,
    },
    {
      title: "Total Interactions",
      value: "256,793",
      change: "+18.7%",
      icon: ThumbsUp,
    },
    {
      title: "Page Views",
      value: "1.2M",
      change: "+22.4%",
      icon: Eye,
    },
  ]

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((stat, index) => (
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
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Latest reported content that needs review</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No recent reports to display.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New Users</CardTitle>
            <CardDescription>Recently registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No new users to display.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
