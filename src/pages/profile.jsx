import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, Button, Input, Badge } from "@/components/ui/custom";
import { useAuth } from "@/context/auth-context";
import { User, Camera, Save, Github, Linkedin, Briefcase } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: user?.name || "Ananya Rao",
    role: user?.role || "student",
    email: user?.email || "123456789@kluniversity.in",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    bio: "Passionate about Full Stack Development and AI. Looking for peer collaboration on React projects.",
    github: "github.com/ananyarao",
    linkedin: "linkedin.com/in/ananyarao",
    joined: "Aug 2023",
  });

  const completionPercentage = 75;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-4xl text-[hsl(292,27%,36%)]">
            My Profile
          </h1>

          {!isEditing ? (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2"
              >
                <Save size={16} />
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <Card className="flex flex-col items-center text-center p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-[hsl(292,27%,36%)]/10"></div>

              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200 mb-4 relative z-10">
                  <img
                    src={user?.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {isEditing && (
                  <div className="absolute bottom-4 right-0 bg-[hsl(292,27%,36%)] p-2 rounded-full text-white cursor-pointer hover:bg-[hsl(292,27%,30%)] shadow-md z-20">
                    <Camera size={16} />
                  </div>
                )}
              </div>

              <h2 className="font-heading text-2xl font-bold text-[hsl(240,10%,20%)]">
                {profile.name}
              </h2>

              <p className="text-[hsl(292,27%,36%)] font-ui text-sm uppercase tracking-wider font-medium mt-1">
                {profile.role}
              </p>

              <div className="mt-6 w-full pt-6 border-t border-[hsl(288,8%,79%)]/30">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[hsl(240,5%,50%)]">
                    Profile Completion
                  </span>
                  <span className="text-[hsl(292,27%,36%)] font-bold">
                    {completionPercentage}%
                  </span>
                </div>

                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[hsl(292,27%,36%)] rounded-full transition-all duration-1000"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-section text-lg mb-4 text-[hsl(240,10%,20%)]">
                Stats
              </h3>

              <div className="grid grid-cols-2 gap-4 text-center">
                {[
                  { value: "12", label: "Assignments" },
                  { value: "4.8", label: "Avg Rating" },
                  { value: "8", label: "Reviews Done" },
                  { value: "98%", label: "Attendance" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-3 bg-[hsl(40,27%,94%)] rounded-lg"
                  >
                    <p className="text-2xl font-heading font-bold text-[hsl(292,27%,36%)]">
                      {item.value}
                    </p>
                    <p className="text-xs text-[hsl(240,5%,50%)]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <h3 className="font-section text-xl mb-6 text-[hsl(240,10%,20%)] flex items-center gap-2">
                <User size={20} className="text-[hsl(292,27%,36%)]" />
                Personal Information
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={profile.name}
                    readOnly={!isEditing}
                    className={
                      !isEditing
                        ? "bg-[hsl(40,27%,94%)] border-transparent"
                        : ""
                    }
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                  />

                  <Input
                    label="Email"
                    value={profile.email}
                    readOnly
                    className="bg-[hsl(40,27%,94%)] border-transparent text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Department"
                    value={profile.department}
                    readOnly={!isEditing}
                    className={
                      !isEditing
                        ? "bg-[hsl(40,27%,94%)] border-transparent"
                        : ""
                    }
                    onChange={(e) =>
                      setProfile({ ...profile, department: e.target.value })
                    }
                  />

                  <Input
                    label="Year / Designation"
                    value={profile.year}
                    readOnly={!isEditing}
                    className={
                      !isEditing
                        ? "bg-[hsl(40,27%,94%)] border-transparent"
                        : ""
                    }
                    onChange={(e) =>
                      setProfile({ ...profile, year: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-ui font-medium text-[hsl(292,27%,36%)] mb-2">
                    Bio
                  </label>

                  <textarea
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[hsl(292,27%,36%)] transition-all duration-200 font-body min-h-[120px] ${
                      !isEditing
                        ? "bg-[hsl(40,27%,94%)] border-transparent resize-none"
                        : "border-[hsl(288,8%,79%)] bg-white"
                    }`}
                    value={profile.bio}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                  />
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-section text-xl mb-6 text-[hsl(240,10%,20%)] flex items-center gap-2">
                <Briefcase size={20} className="text-[hsl(292,27%,36%)]" />
                Professional Links
              </h3>

              <div className="space-y-4">
                <div className="relative">
                  <Github
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(240,5%,50%)]"
                    size={18}
                  />
                  <Input
                    value={profile.github}
                    readOnly={!isEditing}
                    className={`pl-10 ${
                      !isEditing
                        ? "bg-[hsl(40,27%,94%)] border-transparent"
                        : ""
                    }`}
                    onChange={(e) =>
                      setProfile({ ...profile, github: e.target.value })
                    }
                  />
                </div>

                <div className="relative">
                  <Linkedin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600"
                    size={18}
                  />
                  <Input
                    value={profile.linkedin}
                    readOnly={!isEditing}
                    className={`pl-10 ${
                      !isEditing
                        ? "bg-[hsl(40,27%,94%)] border-transparent"
                        : ""
                    }`}
                    onChange={(e) =>
                      setProfile({ ...profile, linkedin: e.target.value })
                    }
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}