import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";

export default function Submissions() {
  const [filter, setFilter] = useState("all");

  const submissions = [
    {
      id: 1,
      student: "Rahul Verma",
      submittedAt: "Feb 18, 10:30 AM",
      status: "On Time",
      score: 9.2,
    },
    {
      id: 2,
      student: "Sneha P",
      submittedAt: "Feb 19, 01:45 PM",
      status: "Late",
      score: null,
    },
    {
      id: 3,
      student: "Ananya Rao",
      submittedAt: "Not Submitted",
      status: "Missing",
      score: null,
    },
  ];

  const filteredSubmissions =
    filter === "all"
      ? submissions
      : submissions.filter((s) =>
          filter === "late"
            ? s.status === "Late"
            : filter === "missing"
            ? s.status === "Missing"
            : filter === "graded"
            ? s.score !== null
            : true
        );

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h1 className="font-heading text-4xl text-[hsl(292,27%,36%)]">
            Submissions
          </h1>
          <p className="text-[hsl(240,5%,50%)] mt-1">
            Monitor, evaluate and manage student submissions.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard title="Total" value="45" />
          <StatCard title="On Time" value="32" />
          <StatCard title="Late" value="7" />
          <StatCard title="Missing" value="6" />
        </div>

        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {["all", "late", "missing", "graded"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-ui font-medium transition-all whitespace-nowrap",
                filter === f
                  ? "bg-[hsl(292,27%,36%)] text-white shadow-md"
                  : "bg-white border border-[hsl(288,8%,79%)] text-[hsl(240,5%,50%)] hover:bg-[hsl(40,27%,94%)]"
              )}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Submission Table */}
        <div className="bg-white rounded-lg border border-[hsl(288,8%,79%)] shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[hsl(40,27%,94%)] text-left">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Submitted</th>
                <th className="p-4">Status</th>
                <th className="p-4">Score</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredSubmissions.map((s) => (
                <tr
                  key={s.id}
                  className="border-t hover:bg-[hsl(40,27%,94%)] transition-all"
                >
                  <td className="p-4 font-medium text-[hsl(240,10%,20%)]">
                    {s.student}
                  </td>

                  <td className="p-4 text-[hsl(240,5%,50%)]">
                    {s.submittedAt}
                  </td>

                  <td
                    className={cn(
                      "p-4 font-medium",
                      s.status === "Late"
                        ? "text-red-600"
                        : s.status === "Missing"
                        ? "text-gray-400"
                        : "text-emerald-600"
                    )}
                  >
                    {s.status}
                  </td>

                  <td className="p-4 font-bold text-[hsl(292,27%,36%)]">
                    {s.score !== null ? s.score : "-"}
                  </td>

                  <td className="p-4">
                    <button className="flex items-center gap-1 px-3 py-1 text-xs rounded-lg border border-[hsl(288,8%,79%)] hover:bg-[hsl(40,27%,94%)] transition">
                      <Eye size={14} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-lg border border-[hsl(288,8%,79%)] p-6 shadow-sm hover:shadow-md transition-all">
      <p className="text-sm text-[hsl(240,5%,50%)]">{title}</p>
      <p className="text-3xl font-heading font-bold text-[hsl(292,27%,36%)] mt-1">
        {value}
      </p>
    </div>
  );
}