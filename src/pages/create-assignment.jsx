import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, Button, Input, Badge } from "@/components/ui/custom";
import { Plus, Trash2, FileText, Save } from "lucide-react";
import { useLocation } from "wouter";

export default function CreateAssignment() {
  const [, setLocation] = useLocation();
  const [rubric, setRubric] = useState([{ criteria: "", points: 10 }]);

  const addCriteria = () => {
    setRubric([...rubric, { criteria: "", points: 10 }]);
  };

  const removeCriteria = (index) => {
    const newRubric = [...rubric];
    newRubric.splice(index, 1);
    setRubric(newRubric);
  };

  const updateCriteria = (index, field, value) => {
    const newRubric = [...rubric];
    newRubric[index][field] = value;
    setRubric(newRubric);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Assignment created successfully!");
    setLocation("/dashboard");
  };

  const totalPoints = rubric.reduce(
    (acc, curr) => acc + Number(curr.points),
    0
  );

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading text-3xl text-[hsl(292,27%,36%)]">
            Create New Assignment
          </h1>
          <Button
            variant="outline"
            onClick={() => setLocation("/dashboard")}
          >
            Cancel
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="space-y-4 p-6">
            <h3 className="font-section text-xl text-[hsl(240,10%,20%)] flex items-center gap-2 mb-4">
              <FileText
                size={20}
                className="text-[hsl(292,27%,36%)]"
              />
              Assignment Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Assignment Title"
                placeholder="e.g. Final Project Proposal"
                required
              />
              <Input
                label="Course"
                placeholder="Select Course..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Due Date" type="date" required />
              <Input
                label="Peer Review Count"
                type="number"
                min="1"
                max="5"
                defaultValue="3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-ui font-medium text-[hsl(292,27%,36%)] mb-2">
                Description & Instructions
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-lg border border-[hsl(288,8%,79%)] focus:outline-none focus:ring-2 focus:ring-[hsl(292,27%,36%)] min-h-[150px] font-body text-[hsl(240,10%,20%)]"
                placeholder="Enter detailed instructions for students..."
                required
              />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-section text-xl text-[hsl(240,10%,20%)]">
                <Badge
                  variant="secondary"
                  className="text-lg px-3 py-1"
                >
                  Rubric
                </Badge>
              </h3>

              <span className="font-bold text-[hsl(240,10%,20%)]">
                Total Points:
                <span className="text-[hsl(292,27%,36%)] ml-1">
                  {totalPoints}
                </span>
              </span>
            </div>

            <div className="space-y-3">
              {rubric.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center bg-[hsl(40,27%,94%)]/50 p-3 rounded-lg border border-[hsl(288,8%,79%)]/30"
                >
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Criteria Name"
                      className="w-full bg-transparent border-none focus:ring-0 font-medium text-[hsl(240,10%,20%)]"
                      value={item.criteria}
                      onChange={(e) =>
                        updateCriteria(
                          index,
                          "criteria",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>

                  <div className="w-24 flex items-center gap-2">
                    <span className="text-xs text-[hsl(240,5%,50%)]">
                      Pts:
                    </span>
                    <input
                      type="number"
                      className="w-full bg-white rounded border border-[hsl(288,8%,79%)] px-2 py-1 text-center font-bold text-[hsl(292,27%,36%)]"
                      min="1"
                      value={item.points}
                      onChange={(e) =>
                        updateCriteria(
                          index,
                          "points",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>

                  {rubric.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCriteria(index)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={addCriteria}
              className="mt-4 w-full border-dashed border-2"
            >
              <Plus size={16} className="mr-2" />
              Add Criterion
            </Button>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="ghost">
              Save Draft
            </Button>
            <Button type="submit" className="min-w-[150px]">
              <Save size={18} className="mr-2" />
              Publish Assignment
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}