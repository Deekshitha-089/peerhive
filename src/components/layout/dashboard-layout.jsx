import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/auth-context";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  ClipboardList,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;

  // ✅ STUDENT NAV (UNCHANGED)
  const studentNav = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: BookOpen, label: "Assignments", href: "/assignments" },
    { icon: Users, label: "Peer Reviews", href: "/reviews" },
    { icon: MessageSquare, label: "Collaboration", href: "/collaboration" },
  ];

  // ✅ TEACHER NAV (NEW)
  const teacherNav = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: BookOpen, label: "Assignments", href: "/assignments" },
    { icon: ClipboardList, label: "Submissions", href: "/submissions" },
    { icon: Users, label: "Review Allocation", href: "/review-allocation" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: MessageSquare, label: "Collaboration", href: "/collaboration" },
  ];

  const navItems = user.role === "teacher" ? teacherNav : studentNav;

  return (
    <div className="min-h-screen bg-[hsl(40,27%,94%)] flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 z-50 h-screen w-[260px] bg-[hsl(297,31%,20%)] text-white transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col shadow-xl",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white font-serif font-bold text-lg">
              P
            </div>
            <span className="font-heading text-2xl font-bold tracking-tight">
              PeerHive
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-white/70 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-4 py-6 space-y-2 flex-1">
          {navItems.map((item) => {
            const isActive = location.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer font-ui text-sm tracking-wide",
                    isActive
                      ? "bg-[hsl(292,27%,36%)] text-white shadow-md border-l-4 border-[hsl(45,79%,52%)]"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon size={20} />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/10">
          <Link href="/settings">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-all cursor-pointer font-ui text-sm">
              <Settings size={20} />
              Settings
            </div>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-300/80 hover:bg-red-900/20 hover:text-red-300 transition-all cursor-pointer font-ui text-sm mt-1"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="bg-white border-b h-16 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-md"
            >
              <Menu size={24} />
            </button>
            <h2 className="font-heading text-xl text-[hsl(292,27%,36%)] hidden sm:block">
              {navItems.find((i) => location.startsWith(i.href))?.label ||
                "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative">
              <Bell size={20} />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex items-center gap-3 cursor-pointer">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-[hsl(292,27%,36%)]">
                      {user.name}
                    </p>
                    <p className="text-xs uppercase">{user.role}</p>
                  </div>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-600"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}