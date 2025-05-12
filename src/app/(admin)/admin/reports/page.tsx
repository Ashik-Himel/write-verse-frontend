"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, MoreHorizontal, Search, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Mock data for reports
const allReports = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  type: ["post", "comment"][i % 2],
  reason: [
    "Inappropriate content",
    "Spam",
    "Harassment",
    "Misinformation",
    "Copyright violation",
  ][i % 5],
  status: ["pending", "pending", "pending", "resolved", "dismissed"][i % 5],
  date: `${Math.floor(Math.random() * 30) + 1} days ago`,
  reporter: {
    id: 100 + i,
    name: [
      "Alex Johnson",
      "Maria Chen",
      "James Smith",
      "Sarah Williams",
      "David Lee",
    ][i % 5],
    image: "",
  },
  content: {
    id: 200 + i,
    title: `${["Post", "Comment"][i % 2]} about ${
      ["Technology", "Science", "Literature", "History", "Philosophy"][i % 5]
    }`,
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: {
      id: 300 + i,
      name: [
        "Michael Brown",
        "Sophia Martinez",
        "Robert Taylor",
        "Olivia Anderson",
        "William Wilson",
      ][i % 5],
      image: "",
    },
  },
}));

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState<
    (typeof allReports)[0] | null
  >(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [reports, setReports] = useState(allReports);

  const reportsPerPage = 10;

  // Filter reports
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reporter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.content.author.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesType = type === "all" || report.type === type;
    const matchesStatus = status === "all" || report.status === status;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Sort by newest first
  const sortedReports = [...filteredReports].sort((a, b) =>
    a.id < b.id ? 1 : -1
  );

  // Pagination
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = sortedReports.slice(
    indexOfFirstReport,
    indexOfLastReport
  );
  const totalPages = Math.ceil(sortedReports.length / reportsPerPage);

  const handleViewDetails = (report: (typeof allReports)[0]) => {
    setSelectedReport(report);
    setDetailsDialogOpen(true);
  };

  const handleResolveReport = (reportId: number) => {
    setReports(
      reports.map((report) =>
        report.id === reportId ? { ...report, status: "resolved" } : report
      )
    );
    toast("Report resolved", {
      description: "The report has been marked as resolved.",
    });
    setDetailsDialogOpen(false);
  };

  const handleDismissReport = (reportId: number) => {
    setReports(
      reports.map((report) =>
        report.id === reportId ? { ...report, status: "dismissed" } : report
      )
    );
    toast("Report dismissed", {
      description: "The report has been dismissed.",
    });
    setDetailsDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      case "dismissed":
        return <Badge variant="secondary">Dismissed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <Select
          value={type}
          onValueChange={(value) => {
            setType(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="post">Posts</SelectItem>
            <SelectItem value="comment">Comments</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={status}
          onValueChange={(value) => {
            setStatus(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="dismissed">Dismissed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Reports List</CardTitle>
        </CardHeader>
        <CardContent>
          {currentReports.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="text-lg font-semibold">No reports found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Reporter</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <Badge variant="outline">
                          {report.type.charAt(0).toUpperCase() +
                            report.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={
                                report.content.author.image ||
                                "/placeholder.svg?height=32&width=32"
                              }
                              alt={report.content.author.name}
                            />
                            <AvatarFallback>
                              {report.content.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {report.content.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              by {report.content.author.name}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{report.reason}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={
                                report.reporter.image ||
                                "/placeholder.svg?height=24&width=24"
                              }
                              alt={report.reporter.name}
                            />
                            <AvatarFallback>
                              {report.reporter.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{report.reporter.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleViewDetails(report)}
                            >
                              View Details
                            </DropdownMenuItem>
                            {report.status === "pending" && (
                              <>
                                <DropdownMenuItem
                                  onClick={() => handleResolveReport(report.id)}
                                >
                                  Mark as Resolved
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDismissReport(report.id)}
                                >
                                  Dismiss Report
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <PaginationItem key={i}>
                      {i === 0 && currentPage > 3 && totalPages > 5 ? (
                        <>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(1);
                            }}
                          >
                            1
                          </PaginationLink>
                          <PaginationEllipsis />
                        </>
                      ) : i === 4 &&
                        currentPage < totalPages - 2 &&
                        totalPages > 5 ? (
                        <>
                          <PaginationEllipsis />
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(totalPages);
                            }}
                          >
                            {totalPages}
                          </PaginationLink>
                        </>
                      ) : (
                        <PaginationLink
                          href="#"
                          isActive={pageNumber === currentPage}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(pageNumber);
                          }}
                        >
                          {pageNumber}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  );
                })}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        setCurrentPage(currentPage + 1);
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>

      {/* Report Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
            <DialogDescription>
              Review the reported content and take appropriate action.
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-sm font-medium">
                    Report Information
                  </h3>
                  <div className="rounded-lg border p-4">
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">
                          Report ID:
                        </dt>
                        <dd className="text-sm">{selectedReport.id}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">
                          Type:
                        </dt>
                        <dd className="text-sm">
                          <Badge variant="outline">
                            {selectedReport.type.charAt(0).toUpperCase() +
                              selectedReport.type.slice(1)}
                          </Badge>
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">
                          Reason:
                        </dt>
                        <dd className="text-sm">{selectedReport.reason}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">
                          Date:
                        </dt>
                        <dd className="text-sm">{selectedReport.date}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">
                          Status:
                        </dt>
                        <dd className="text-sm">
                          {getStatusBadge(selectedReport.status)}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">
                          Reporter:
                        </dt>
                        <dd className="flex items-center gap-1 text-sm">
                          <Avatar className="h-5 w-5">
                            <AvatarImage
                              src={
                                selectedReport.reporter.image ||
                                "/placeholder.svg?height=20&width=20"
                              }
                              alt={selectedReport.reporter.name}
                            />
                            <AvatarFallback>
                              {selectedReport.reporter.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {selectedReport.reporter.name}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium">
                    Content Information
                  </h3>
                  <div className="rounded-lg border p-4">
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">
                          Content ID:
                        </dt>
                        <dd className="text-sm">{selectedReport.content.id}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">
                          Title:
                        </dt>
                        <dd className="text-sm">
                          {selectedReport.content.title}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-muted-foreground">
                          Author:
                        </dt>
                        <dd className="flex items-center gap-1 text-sm">
                          <Avatar className="h-5 w-5">
                            <AvatarImage
                              src={
                                selectedReport.content.author.image ||
                                "/placeholder.svg?height=20&width=20"
                              }
                              alt={selectedReport.content.author.name}
                            />
                            <AvatarFallback>
                              {selectedReport.content.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {selectedReport.content.author.name}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium">Content Preview</h3>
                <div className="rounded-lg border p-4">
                  <p className="text-sm">{selectedReport.content.excerpt}</p>
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                {selectedReport.status === "pending" && (
                  <>
                    <Button
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => handleDismissReport(selectedReport.id)}
                    >
                      <XCircle className="h-4 w-4" />
                      Dismiss Report
                    </Button>
                    <Button
                      className="flex items-center gap-1"
                      onClick={() => handleResolveReport(selectedReport.id)}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Resolve Report
                    </Button>
                  </>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
