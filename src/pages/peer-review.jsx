import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, Button, Badge } from "@/components/ui/custom";
import { Link } from "wouter";

export default function PeerReview() {
  const reviews = [
    {
      id: 1,
      student: "Rahul Verma",
      assignment: "React Components",
      due: "Feb 22, 2026",
      status: "Pending",
    },
    {
      id: 2,
      student: "Ananya Rao",
      assignment: "Database Schema",
      due: "Feb 20, 2026",
      status: "Completed",
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-[hsl(292,27%,36%)]">
          Pending Reviews
        </h1>

        {reviews.map((review) => (
          <Card key={review.id}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">
                  {review.assignment}
                </h3>
                <p className="text-sm text-gray-500">
                  Student: {review.student}
                </p>
                <p className="text-sm text-gray-500">
                  Due: {review.due}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Badge
                  variant={
                    review.status === "Pending"
                      ? "warning"
                      : "success"
                  }
                >
                  {review.status}
                </Badge>

                {review.status === "Pending" && (
                  <Link href={`/reviews/${review.id}`}>
                    <Button>Start Review</Button>
                  </Link>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}