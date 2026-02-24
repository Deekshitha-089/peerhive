import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { cn } from "@/lib/utils";

export default function ReviewAllocation() {
  const [activeTab, setActiveTab] = useState("requests");

  const tabs = [
    { label: "Review Requests", value: "requests" },
    { label: "Student Load", value: "load" },
    { label: "Submission Quality", value: "quality" },
    { label: "Assign Reviewers", value: "assign" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-heading text-4xl text-[hsl(292,27%,36%)]">
            Review Allocation
          </h1>
          <p className="text-[hsl(240,5%,50%)] font-body mt-1">
            Manage review requests, monitor student load and assign reviewers efficiently.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-ui font-medium transition-all duration-300 whitespace-nowrap",
                activeTab === tab.value
                  ? "bg-[hsl(292,27%,36%)] text-white shadow-md"
                  : "bg-white border border-[hsl(288,8%,79%)] text-[hsl(240,5%,50%)] hover:bg-[hsl(40,27%,94%)]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
          {activeTab === "requests" && <ReviewRequests />}
          {activeTab === "load" && <StudentLoad />}
          {activeTab === "quality" && <SubmissionQuality />}
          {activeTab === "assign" && <AssignReviewers />}
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ====================== */
/* REVIEW REQUESTS */
/* ====================== */

function ReviewRequests() {
  const requests = [
    { student: "Rahul Verma", type: "Re-review", assignment: "React Project" },
    { student: "Sneha P", type: "Extension", assignment: "DB Design" },
  ];

  return (
    <div className="bg-white rounded-lg border border-[hsl(288,8%,79%)] p-6 shadow-sm space-y-4">
      {requests.map((r, i) => (
        <div
          key={i}
          className="flex justify-between items-center p-4 rounded-lg border border-[hsl(288,8%,79%)] hover:shadow-md transition-all duration-200"
        >
          <div>
            <p className="font-heading text-lg text-[hsl(240,10%,20%)]">
              {r.student}
            </p>
            <p className="text-sm text-[hsl(240,5%,50%)]">
              {r.assignment} — {r.type}
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition">
              Approve
            </button>
            <button className="px-4 py-2 rounded-lg border border-red-300 text-red-600 text-sm hover:bg-red-50 transition">
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ====================== */
/* STUDENT LOAD */
/* ====================== */

function StudentLoad() {
  const students = [
    { name: "Rahul", load: 2 },
    { name: "Sneha", load: 5 },
    { name: "Ananya", load: 1 },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {students.map((s, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-lg border border-[hsl(288,8%,79%)] shadow-sm hover:shadow-md transition-all"
        >
          <p className="font-heading text-lg text-[hsl(240,10%,20%)]">
            {s.name}
          </p>
          <p className="text-sm text-[hsl(240,5%,50%)] mt-1">
            Current Review Load
          </p>
          <div className="mt-3 text-2xl font-bold text-[hsl(292,27%,36%)]">
            {s.load}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ====================== */
/* SUBMISSION QUALITY */
/* ====================== */

function SubmissionQuality() {
  const data = [
    { name: "Rahul", score: 9.2 },
    { name: "Sneha", score: 6.5 },
    { name: "Ananya", score: 8.7 },
  ];

  return (
    <div className="bg-white rounded-lg border border-[hsl(288,8%,79%)] p-6 shadow-sm space-y-4">
      {data.map((d, i) => (
        <div
          key={i}
          className="flex justify-between items-center p-4 border border-[hsl(288,8%,79%)] rounded-lg hover:shadow-md transition-all"
        >
          <p className="font-heading text-lg">{d.name}</p>
          <p className="text-lg font-bold text-[hsl(292,27%,36%)]">
            {d.score}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ====================== */
/* ASSIGN REVIEWERS */
/* ====================== */

function AssignReviewers() {
  return (
    <div className="bg-white rounded-lg border border-[hsl(288,8%,79%)] p-8 shadow-sm text-center space-y-6">
      <h3 className="font-heading text-xl text-[hsl(240,10%,20%)]">
        Intelligent Reviewer Assignment
      </h3>
      <p className="text-[hsl(240,5%,50%)] text-sm">
        Automatically distribute reviews based on workload, performance and deadlines.
      </p>

      <div className="flex justify-center gap-4">
        <button className="px-6 py-3 rounded-lg bg-[hsl(292,27%,36%)] text-white hover:shadow-lg transition-all duration-200">
          Auto Assign
        </button>

        <button className="px-6 py-3 rounded-lg border border-[hsl(288,8%,79%)] hover:bg-[hsl(40,27%,94%)] transition">
          Manual Assign
        </button>
      </div>
    </div>
  );
}