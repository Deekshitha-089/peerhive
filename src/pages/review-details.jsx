import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, Button, Badge } from "@/components/ui/custom";
import { Save, CheckCircle2 } from "lucide-react";

export default function ReviewDetails() {
  const [, params] = useRoute("/reviews/:id");
  const [, setLocation] = useLocation();

  const [scores, setScores] = useState({});
  const [comments, setComments] = useState({});
  const [overallFeedback, setOverallFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Mock assignment based on ID
  const assignmentTitle =
    params?.id === "1"
      ? "React Components Assignment"
      : "Database Schema Assignment";

  const rubric = [
    {
      id: 1,
      criteria: "Code Structure & Organization",
      max: 10,
      description:
        "Is the code well-organized? Are components modular and reusable?",
    },
    {
      id: 2,
      criteria: "Functionality",
      max: 10,
      description:
        "Does the application work correctly without major bugs?",
    },
    {
      id: 3,
      criteria: "UI/UX Design",
      max: 10,
      description:
        "Is the interface clean, intuitive, and consistent?",
    },
    {
      id: 4,
      criteria: "Documentation",
      max: 5,
      description:
        "Is the code properly commented and explained?",
    },
  ];

  const handleScoreChange = (id, value) => {
    const max = rubric.find((r) => r.id === id)?.max || 10;
    const score = Math.min(Math.max(0, parseInt(value) || 0), max);
    setScores({ ...scores, [id]: score });
  };

  const handleSubmit = () => {
    if (Object.keys(scores).length < rubric.length) {
      alert("Please score all criteria before submitting.");
      return;
    }

    setSubmitted(true);

    setTimeout(() => {
      setLocation("/reviews");
    }, 1500);
  };

  const totalScore = Object.values(scores).reduce(
    (a, b) => a + b,
    0
  );

  const maxScore = rubric.reduce(
    (a, b) => a + b.max,
    0
  );

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[hsl(292,27%,36%)]">
              Review Details
            </h1>
            <p className="text-gray-500">
              Reviewing:{" "}
              <span className="font-bold text-black">
                {assignmentTitle}
              </span>
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Total Score</p>
            <p className="text-3xl font-bold text-[hsl(292,27%,36%)]">
              {totalScore}
              <span className="text-lg text-gray-500 font-normal">
                {" "}
                / {maxScore}
              </span>
            </p>
          </div>
        </div>

        {/* Rubric */}
        <div className="space-y-4">
          {rubric.map((item) => (
            <Card key={item.id}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-bold text-lg">
                      {item.criteria}
                    </h4>
                    <Badge variant="secondary">
                      Max: {item.max} pts
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-500 mb-4">
                    {item.description}
                  </p>

                  <textarea
                    className="w-full p-3 rounded-lg border text-sm"
                    placeholder="Add specific feedback..."
                    rows={2}
                    value={comments[item.id] || ""}
                    onChange={(e) =>
                      setComments({
                        ...comments,
                        [item.id]: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="w-full md:w-32 flex flex-col justify-center">
                  <label className="text-xs font-bold text-gray-500 mb-1 uppercase">
                    Score
                  </label>

                  <input
                    type="number"
                    min="0"
                    max={item.max}
                    className="w-full p-3 text-center text-xl font-bold rounded-lg border"
                    value={scores[item.id] || ""}
                    onChange={(e) =>
                      handleScoreChange(
                        item.id,
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Overall Feedback */}
        <Card>
          <h3 className="font-bold text-lg mb-4">
            Overall Feedback
          </h3>

          <textarea
            className="w-full p-4 rounded-lg border min-h-[120px]"
            placeholder="Summarize your review..."
            value={overallFeedback}
            onChange={(e) =>
              setOverallFeedback(e.target.value)
            }
          />
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-4 pb-8">
          <Button
            onClick={handleSubmit}
            disabled={submitted}
            className={
              submitted
                ? "bg-emerald-600 hover:bg-emerald-700"
                : ""
            }
          >
            {submitted ? (
              <>
                <CheckCircle2 className="mr-2" size={20} />
                Review Submitted
              </>
            ) : (
              <>
                <Save className="mr-2" size={20} />
                Submit Review
              </>
            )}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}