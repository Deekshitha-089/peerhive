import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/auth-context";
import { Button, Input, Card } from "@/components/ui/custom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      login(email, role, role === "student" ? "Ananya Rao" : "Dr. S. Venkat");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[hsl(40,27%,94%)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[hsl(292,27%,36%)] blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[hsl(292,27%,36%)] blur-[100px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
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
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="bg-[hsl(40,27%,90%)] p-1 rounded-lg flex">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`flex-1 py-2 text-sm font-ui font-medium rounded-md transition-all ${
                  role === "student"
                    ? "bg-white text-[hsl(292,27%,36%)] shadow-sm"
                    : "text-[hsl(240,5%,50%)] hover:text-[hsl(292,27%,36%)]"
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`flex-1 py-2 text-sm font-ui font-medium rounded-md transition-all ${
                  role === "teacher"
                    ? "bg-white text-[hsl(292,27%,36%)] shadow-sm"
                    : "text-[hsl(240,5%,50%)] hover:text-[hsl(292,27%,36%)]"
                }`}
              >
                Teacher
              </button>
            </div>

            <Input
              label="University Email"
              type="email"
              placeholder="id@kluniversity.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
              ) : null}
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center mt-4">
              <span className="text-sm text-[hsl(240,5%,60%)]">
                Don't have an account?{" "}
              </span>
              <Link
                href="/register"
                className="text-sm font-medium text-[hsl(292,27%,36%)] hover:underline"
              >
                Register
              </Link>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}