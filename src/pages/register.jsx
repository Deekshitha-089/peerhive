import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button, Input, Card } from "@/components/ui/custom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Register() {
  const [, setLocation] = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const validateEmail = (email) => {
    const studentRegex = /^[0-9]{10}@kluniversity\.in$/;

    if (formData.role === "student") {
      return studentRegex.test(email);
    }

    return email.endsWith("@kluniversity.in");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setError(
        formData.role === "student"
          ? "Student email must be 10 digits @kluniversity.in"
          : "Only official KL University email IDs are permitted."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setLocation("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[hsl(40,27%,94%)] relative overflow-hidden py-12">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[hsl(292,27%,36%)]/5 blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[hsl(292,27%,36%)]/5 blur-[120px]"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-4 relative z-10"
      >
        <Card className="border-t-4 border-t-[hsl(292,27%,36%)] shadow-2xl">
          <div className="text-center mb-8">
            <Link href="/">
              <h1 className="font-heading text-4xl text-[hsl(292,27%,36%)] cursor-pointer hover:opacity-80 transition-opacity">
                PeerHive
              </h1>
            </Link>
            <p className="font-body text-[hsl(240,5%,40%)] mt-2">
              Create your academic account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4 mb-6">
              <label
                className={`flex-1 cursor-pointer border rounded-lg p-4 flex flex-col items-center transition-all ${
                  formData.role === "student"
                    ? "border-[hsl(292,27%,36%)] bg-[hsl(292,27%,36%)]/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={formData.role === "student"}
                  onChange={() =>
                    setFormData({ ...formData, role: "student" })
                  }
                  className="sr-only"
                />
                <span
                  className={`font-ui font-medium ${
                    formData.role === "student"
                      ? "text-[hsl(292,27%,36%)]"
                      : "text-gray-500"
                  }`}
                >
                  Student
                </span>
              </label>

              <label
                className={`flex-1 cursor-pointer border rounded-lg p-4 flex flex-col items-center transition-all ${
                  formData.role === "teacher"
                    ? "border-[hsl(292,27%,36%)] bg-[hsl(292,27%,36%)]/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="teacher"
                  checked={formData.role === "teacher"}
                  onChange={() =>
                    setFormData({ ...formData, role: "teacher" })
                  }
                  className="sr-only"
                />
                <span
                  className={`font-ui font-medium ${
                    formData.role === "teacher"
                      ? "text-[hsl(292,27%,36%)]"
                      : "text-gray-500"
                  }`}
                >
                  Teacher
                </span>
              </label>
            </div>

            <Input
              label="Full Name"
              name="name"
              placeholder="e.g. Ananya Rao"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="University Email"
              name="email"
              type="email"
              placeholder={
                formData.role === "student"
                  ? "1234567890@kluniversity.in"
                  : "faculty@kluniversity.in"
              }
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? (
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
              ) : null}
              {loading ? "Creating Account..." : "Register"}
            </Button>

            <div className="text-center mt-4">
              <span className="text-sm text-[hsl(240,5%,60%)]">
                Already have an account?{" "}
              </span>
              <Link
                href="/login"
                className="text-sm font-medium text-[hsl(292,27%,36%)] hover:underline"
              >
                Sign In
              </Link>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}