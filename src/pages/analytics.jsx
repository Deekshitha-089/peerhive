import DashboardLayout from "@/components/layout/dashboard-layout";
import { TrendingUp, AlertTriangle, BarChart3, Users } from "lucide-react";

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-10">

        {/* Header */}
        <div>
          <h1 className="font-heading text-4xl text-[hsl(292,27%,36%)]">
            Analytics
          </h1>
          <p className="text-[hsl(240,5%,50%)] mt-1">
            Insights into performance, submissions and review behaviour.
          </p>
        </div>

        {/* Performance Overview */}
        <Section title="Performance Overview" icon={<TrendingUp size={20} />}>
          <div className="grid md:grid-cols-3 gap-6">
            <StatCard title="Average Score" value="8.1 / 10" />
            <StatCard title="Pass Rate" value="92%" />
            <StatCard title="Highest Score" value="9.8" />
          </div>
        </Section>

        {/* Submission Behavior */}
        <Section title="Submission Behavior" icon={<BarChart3 size={20} />}>
          <div className="grid md:grid-cols-3 gap-6">
            <StatCard title="Late Submissions" value="14%" />
            <StatCard title="Missing Rate" value="6%" />
            <StatCard title="Peak Time" value="10–11 PM" />
          </div>
        </Section>

        {/* Review Quality */}
        <Section title="Review Quality Analysis" icon={<Users size={20} />}>
          <div className="grid md:grid-cols-3 gap-6">
            <StatCard title="Avg Review Accuracy" value="88%" />
            <StatCard title="High Variance Reviews" value="3" />
            <StatCard title="Top Reviewer" value="Rahul V." />
          </div>
        </Section>

        {/* Risk Alerts */}
        <Section title="Risk Alerts" icon={<AlertTriangle size={20} />}>
          <div className="bg-white p-6 rounded-lg border border-[hsl(288,8%,79%)] shadow-sm space-y-4">
            <AlertItem text="3 students have missed 2+ deadlines." />
            <AlertItem text="2 reviewers show inconsistent scoring patterns." />
            <AlertItem text="Assignment 2 has unusually low average score." />
          </div>
        </Section>

      </div>
    </DashboardLayout>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-[hsl(292,27%,36%)] font-heading text-xl">
        {icon}
        {title}
      </div>
      {children}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-lg border border-[hsl(288,8%,79%)] p-6 shadow-sm hover:shadow-md transition-all">
      <p className="text-sm text-[hsl(240,5%,50%)]">{title}</p>
      <p className="text-2xl font-heading font-bold text-[hsl(292,27%,36%)] mt-2">
        {value}
      </p>
    </div>
  );
}

function AlertItem({ text }) {
  return (
    <div className="p-4 rounded-lg bg-[hsl(40,27%,94%)] border border-[hsl(288,8%,79%)] text-sm text-[hsl(240,10%,20%)]">
      {text}
    </div>
  );
}