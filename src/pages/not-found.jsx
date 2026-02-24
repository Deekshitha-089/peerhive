import { Card } from "@/components/ui/custom";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[hsl(40,27%,94%)]">
      <Card className="w-full max-w-md mx-4 text-center">
        <div className="flex flex-col items-center gap-4 py-6">
          <AlertCircle className="h-10 w-10 text-red-500" />

          <h1 className="text-2xl font-bold text-[hsl(240,10%,20%)]">
            404 - Page Not Found
          </h1>

          <p className="text-sm text-[hsl(240,5%,50%)]">
            The page you're looking for doesn’t exist.
          </p>

          <Link href="/dashboard">
            <button className="mt-4 px-4 py-2 rounded-lg bg-[hsl(292,27%,36%)] text-white hover:bg-[hsl(292,27%,30%)] transition">
              <i>Go Back to Dashboard</i>
            </button>
          </Link>
        </div>
      </Card>
    </div>
  );
}