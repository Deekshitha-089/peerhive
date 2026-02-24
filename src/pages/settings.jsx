import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("account");

  if (!user) return null;

  const isTeacher = user.role === "teacher";

  const teacherTabs = [
    { label: "Account", value: "account" },
    { label: "Notifications", value: "notifications" },
    { label: "Assignment Defaults", value: "assignment" },
    { label: "Review Allocation", value: "review" },
    { label: "Security", value: "security" },
  ];

  const studentTabs = [
    { label: "Account", value: "account" },
    { label: "Notifications", value: "notifications" },
    { label: "Review Preferences", value: "review" },
    { label: "Security", value: "security" },
  ];

  const tabs = isTeacher ? teacherTabs : studentTabs;

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h1 className="font-heading text-4xl text-[hsl(292,27%,36%)]">
            Settings
          </h1>
          <p className="text-[hsl(240,5%,50%)] mt-1">
            Manage your preferences and system controls.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
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
        <div className="bg-white rounded-lg border border-[hsl(288,8%,79%)] p-8 shadow-sm transition-all">
          {activeTab === "account" && <AccountTab user={user} />}
          {activeTab === "notifications" && <NotificationTab />}
          {activeTab === "assignment" && isTeacher && <AssignmentDefaults />}
          {activeTab === "review" && (
            isTeacher ? <ReviewAllocationSettings /> : <StudentReviewPreferences />
          )}
          {activeTab === "security" && <SecurityTab />}
        </div>

      </div>
    </DashboardLayout>
  );
}

/* ---------------- ACCOUNT ---------------- */

function AccountTab({ user }) {
  return (
    <div className="space-y-4">
      <Input label="Full Name" defaultValue={user.name} />
      <Input label="Email" defaultValue={user.email} disabled />
      <SaveButton />
    </div>
  );
}

/* ---------------- NOTIFICATIONS ---------------- */

function NotificationTab() {
  return (
    <div className="space-y-4">
      <Toggle label="Email Notifications" />
      <Toggle label="Deadline Reminders" />
      <Toggle label="Review Assigned Alerts" />
      <SaveButton />
    </div>
  );
}

/* ---------------- TEACHER ONLY ---------------- */

function AssignmentDefaults() {
  return (
    <div className="space-y-4">
      <Input label="Default Review Count" defaultValue="3" type="number" />
      <Toggle label="Allow Resubmissions" />
      <Toggle label="Auto Allocate Reviews" />
      <SaveButton />
    </div>
  );
}

function ReviewAllocationSettings() {
  return (
    <div className="space-y-4">
      <Input label="Max Reviews per Student" defaultValue="5" type="number" />
      <Toggle label="Prevent Mutual Reviews" />
      <Toggle label="Enable Anonymous Reviews" />
      <SaveButton />
    </div>
  );
}

/* ---------------- STUDENT ONLY ---------------- */

function StudentReviewPreferences() {
  return (
    <div className="space-y-4">
      <Toggle label="Prefer Anonymous Reviews" />
      <Input label="Max Reviews per Week" defaultValue="3" type="number" />
      <SaveButton />
    </div>
  );
}

/* ---------------- SECURITY ---------------- */

function SecurityTab() {
  return (
    <div className="space-y-4">
      <Input label="New Password" type="password" />
      <Input label="Confirm Password" type="password" />
      <Toggle label="Enable Two-Factor Authentication (2FA)" />
      <SaveButton />
    </div>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[hsl(292,27%,36%)] mb-2">
        {label}
      </label>
      <input
        className="w-full px-4 py-2 rounded-lg border border-[hsl(288,8%,79%)] focus:outline-none focus:ring-2 focus:ring-[hsl(292,27%,36%)]"
        {...props}
      />
    </div>
  );
}

function Toggle({ label }) {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-[hsl(240,10%,20%)]">{label}</span>
      <button
        onClick={() => setEnabled(!enabled)}
        className={cn(
          "w-12 h-6 flex items-center rounded-full p-1 transition-all",
          enabled ? "bg-[hsl(292,27%,36%)]" : "bg-gray-300"
        )}
      >
        <div
          className={cn(
            "bg-white w-4 h-4 rounded-full shadow-md transform transition-all",
            enabled ? "translate-x-6" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}

function SaveButton() {
  return (
    <button className="mt-6 px-6 py-2 bg-[hsl(292,27%,36%)] text-white rounded-lg hover:shadow-md transition">
      Save Changes
    </button>
  );
}