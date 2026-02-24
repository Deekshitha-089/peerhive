import DashboardLayout from "@/components/layout/dashboard-layout";
import { useAuth } from "@/context/auth-context";
import { Link } from "wouter";
import { BookOpen, ClipboardList, Users } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  const isTeacher = user.role === "teacher";

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="font-heading text-4xl text-[hsl(292,27%,36%)]">
              Welcome back, {user.name.split(" ")[0]}
            </h1>
            <p className="text-[hsl(240,5%,50%)] mt-1">
              {isTeacher
                ? "Manage assignments and allocate reviews efficiently."
                : "Track your assignments and peer reviews."}
            </p>
          </div>

          {/* TEACHER PRIMARY BUTTON */}
          {isTeacher && (
            <Link href="/assignments/create">
              <button className="px-6 py-3 bg-[hsl(292,27%,36%)] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                Create Assignment
              </button>
            </Link>
          )}
        </div>

        {/* STATS GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          <StatCard
            title="Total Assignments"
            value="12"
            subtitle={isTeacher ? "3 Active currently" : "2 Pending"}
            icon={<BookOpen size={20} />}
          />

          <StatCard
            title={isTeacher ? "Total Submissions" : "Reviews Assigned"}
            value={isTeacher ? "145" : "8"}
            subtitle={isTeacher ? "+24 since yesterday" : "2 Pending"}
            icon={<ClipboardList size={20} />}
          />

          <StatCard
            title="Review Completion"
            value="78%"
            subtitle="Across all courses"
            icon={<Users size={20} />}
          />

        </div>

      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="bg-white rounded-lg border border-[hsl(288,8%,79%)] p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-3 text-[hsl(292,27%,36%)]">
        {icon}
      </div>
      <p className="text-sm text-[hsl(240,5%,50%)]">{title}</p>
      <p className="text-3xl font-heading font-bold text-[hsl(240,10%,20%)] mt-1">
        {value}
      </p>
      <p className="text-xs text-[hsl(240,5%,50%)] mt-2">
        {subtitle}
      </p>
    </div>
  );
}