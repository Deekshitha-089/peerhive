import DashboardLayout from "../components/layout/dashboard-layout";
import { useState } from "react";

export default function AssignmentDetails() {

  const [assignment, setAssignment] = useState({
    status: "pending",
    file: null,
    projectNote: "",
    peerScores: null,
    grade: null,
    reReviewRequested: false,
  });

  const [reviewMode, setReviewMode] = useState(false);

  /* ---------------- SUBMIT ASSIGNMENT ---------------- */

  function handleFileChange(e) {
    const file = e.target.files[0];
    setAssignment({ ...assignment, file });
  }

  function submitAssignment() {
    if (!assignment.file) return alert("Upload file first");
    setAssignment({ ...assignment, status: "submitted" });
  }

  /* ---------------- START REVIEW ---------------- */

  function startReview() {
    setReviewMode(true);
  }

  function submitReview(scores) {
    const total =
      scores.tech + scores.innovation + scores.complete + scores.format;

    const grade =
      total >= 90 ? "A+" :
      total >= 80 ? "A" :
      total >= 70 ? "B" :
      total >= 60 ? "C" :
      total >= 50 ? "D" : "F";

    setAssignment({
      ...assignment,
      status: "graded",
      peerScores: scores,
      grade,
    });

    setReviewMode(false);
  }

  function requestReReview() {
    setAssignment({ ...assignment, reReviewRequested: true });
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow border">

        <h1 className="text-3xl font-heading text-[hsl(292,27%,36%)] mb-6">
          Full Stack Project Proposal
        </h1>

        {/* ---------------- PENDING ---------------- */}

        {assignment.status === "pending" && (
          <div className="space-y-4">

            <textarea
              placeholder="Write a note to your peer reviewer..."
              className="w-full border p-3 rounded-md"
              value={assignment.projectNote}
              onChange={(e) =>
                setAssignment({ ...assignment, projectNote: e.target.value })
              }
            />

            <div className="border-2 border-dashed p-6 text-center rounded-md">
              <input type="file" onChange={handleFileChange} />
            </div>

            <button
              onClick={submitAssignment}
              className="w-full bg-[hsl(292,27%,36%)] text-white py-2 rounded-md"
            >
              Submit Assignment
            </button>
          </div>
        )}

        {/* ---------------- SUBMITTED ---------------- */}

        {assignment.status === "submitted" && (
          <div className="bg-green-50 p-6 rounded-md space-y-4">

            <h2 className="text-green-700 font-semibold">
              Assignment Submitted
            </h2>

            <p>
              File: <strong>{assignment.file?.name}</strong>
            </p>

            <button
              onClick={() =>
                window.open(URL.createObjectURL(assignment.file))
              }
              className="bg-gray-200 px-4 py-2 rounded-md"
            >
              View / Download File
            </button>

          </div>
        )}

        {/* ---------------- REVIEWING ---------------- */}

        {assignment.status === "reviewing" && !reviewMode && (
          <button
            onClick={startReview}
            className="bg-[hsl(292,27%,36%)] text-white px-6 py-3 rounded-md"
          >
            Start Reviewing
          </button>
        )}

        {assignment.status === "reviewing" && reviewMode && (
          <ReviewUI
            file={assignment.file}
            onSubmit={submitReview}
          />
        )}

        {/* ---------------- GRADED ---------------- */}

        {assignment.status === "graded" && (
          <div className="bg-blue-50 p-6 rounded-md space-y-4">

            <h2 className="text-blue-700 font-semibold">
              Final Grade: {assignment.grade}
            </h2>

            <ScoreBreakdown scores={assignment.peerScores} />

            {!assignment.reReviewRequested && (
              <button
                onClick={requestReReview}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Apply for Re-review
              </button>
            )}

            {assignment.reReviewRequested && (
              <p className="text-red-600">
                Re-review request submitted.
              </p>
            )}

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

/* ---------------- REVIEW COMPONENT ---------------- */

function ReviewUI({ file, onSubmit }) {
  const [scores, setScores] = useState({
    tech: 0,
    innovation: 0,
    complete: 0,
    format: 0,
  });

  return (
    <div className="space-y-4">

      <button
        onClick={() => window.open(URL.createObjectURL(file))}
        className="bg-gray-200 px-4 py-2 rounded-md"
      >
        Download Peer File
      </button>

      <Rubric label="Technical Feasibility (30)" max={30}
        onChange={(val) => setScores({ ...scores, tech: val })}
      />

      <Rubric label="Innovation (20)" max={20}
        onChange={(val) => setScores({ ...scores, innovation: val })}
      />

      <Rubric label="Completeness (30)" max={30}
        onChange={(val) => setScores({ ...scores, complete: val })}
      />

      <Rubric label="Formatting (20)" max={20}
        onChange={(val) => setScores({ ...scores, format: val })}
      />

      <button
        onClick={() => onSubmit(scores)}
        className="bg-[hsl(292,27%,36%)] text-white px-6 py-2 rounded-md"
      >
        Submit Review
      </button>
    </div>
  );
}

function Rubric({ label, max, onChange }) {
  return (
    <div className="flex justify-between items-center border p-3 rounded-md">
      <span>{label}</span>
      <input
        type="number"
        max={max}
        min={0}
        className="w-20 border rounded px-2 py-1"
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function ScoreBreakdown({ scores }) {
  return (
    <div className="space-y-2">
      <div>Technical: {scores.tech}</div>
      <div>Innovation: {scores.innovation}</div>
      <div>Completeness: {scores.complete}</div>
      <div>Formatting: {scores.format}</div>
    </div>
  );
}