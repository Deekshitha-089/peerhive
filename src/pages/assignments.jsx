import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, Button, Badge } from "@/components/ui/custom";
import {
  Search,
  Filter,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { Link } from "wouter";

export default function Assignments() {
  const [filter, setFilter] = useState("all");

  const assignments = [
    {
      id: 1,
      title: "Full Stack Project Proposal",
      course: "CS304 - Web Development",
      dueDate: "Feb 24, 2026",
      status: "Pending",
      type: "Submission",
      description:
        "Submit your project proposal including tech stack, features, and timeline.",
    },
    {
      id: 2,
      title: "React Components Peer Review",
      course: "CS304 - Web Development",
      dueDate: "Feb 22, 2026",
      status: "Reviewing",
      type: "Peer Review",
      description:
        "Review code quality and component structure for assigned peers.",
    },
    {
      id: 3,
      title: "Database Schema Design",
      course: "CS302 - Database Systems",
      dueDate: "Feb 20, 2026",
      status: "Submitted",
      type: "Submission",
      description:
        "Design and normalize the database schema for the e-commerce project.",
    },
    {
      id: 4,
      title: "Algorithm Complexity Analysis",
      course: "CS301 - Algorithms",
      dueDate: "Feb 18, 2026",
      status: "Graded",
      grade: "A",
      type: "Submission",
      description:
        "Analyze the time and space complexity of the provided sorting algorithms.",
    },
  ];

  const filteredAssignments =
    filter === "all"
      ? assignments
      : assignments.filter(
          (a) => a.status.toLowerCase() === filter
        );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-heading text-4xl text-[hsl(292,27%,36%)] mb-1">
              Assignments
            </h1>
            <p className="text-[hsl(240,5%,40%)]">
              Manage your submissions and peer reviews.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search assignments..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white focus:ring-1 focus:ring-[hsl(292,27%,36%)] focus:outline-none text-sm"
              />
            </div>

            <Button variant="outline" className="flex items-center gap-2 px-3">
              <Filter size={16} /> Filter
            </Button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["all", "pending", "submitted", "reviewing", "graded"].map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  filter === f
                    ? "bg-[hsl(292,27%,36%)] text-white"
                    : "bg-white text-gray-600 border hover:bg-gray-100"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Assignment List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white rounded-lg border p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start md:items-center"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="secondary">
                    {assignment.course}
                  </Badge>
                  {assignment.type === "Peer Review" && (
                    <Badge variant="warning">
                      Peer Review
                    </Badge>
                  )}
                </div>

                <h3 className="font-heading text-xl font-bold mb-1">
                  {assignment.title}
                </h3>

                <p className="text-gray-500 text-sm mb-3">
                  {assignment.description}
                </p>

                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>Due: {assignment.dueDate}</span>
                  </div>

                  {assignment.grade && (
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2
                        size={14}
                        className="text-emerald-600"
                      />
                      <span>
                        Grade:
                        <span className="font-bold text-emerald-700 ml-1">
                          {assignment.grade}
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <Badge
                  variant={
                    assignment.status === "Submitted"
                      ? "success"
                      : assignment.status === "Pending"
                      ? "warning"
                      : assignment.status === "Graded"
                      ? "outline"
                      : "secondary"
                  }
                >
                  {assignment.status}
                </Badge>

                <Link href={`/assignments/${assignment.id}`}>
                  <Button>View Details</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}