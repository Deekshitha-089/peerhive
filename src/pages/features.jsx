import Navbar from "../components/navbar";

export default function Features() {
  return (
    <div className="bg-[hsl(40,27%,94%)] min-h-screen">
      <Navbar />

      <div className="pt-32 pb-20 max-w-6xl mx-auto px-6">
        <h1 className="font-heading text-5xl text-[hsl(292,27%,36%)] mb-12 text-center">
          Platform Features
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          <FeatureCard
            title="Smart Assignment Creation"
            desc="Teachers create structured assignments with deadlines, rubric-based grading, and peer review count control."
          />

          <FeatureCard
            title="Automated Review Allocation"
            desc="System intelligently assigns reviewers based on availability, fairness rules, and workload balance."
          />

          <FeatureCard
            title="Role-Based Dashboards"
            desc="Separate dashboards for teachers and students with contextual navigation and analytics."
          />

          <FeatureCard
            title="Submission Tracking"
            desc="Teachers monitor pending, late, and completed submissions in real time."
          />

          <FeatureCard
            title="Peer Evaluation System"
            desc="Structured rubric-based scoring ensures fairness and transparency in reviews."
          />

          <FeatureCard
            title="Collaboration Spaces"
            desc="Group messaging and academic coordination rooms for structured teamwork."
          />

          <FeatureCard
            title="Performance Analytics"
            desc="Visual insights into student performance, review completion rates, and assignment health."
          />

          <FeatureCard
            title="Request-Based Review Control"
            desc="Teachers can see raised review issues and reassign reviewers if necessary."
          />

        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white p-8 rounded-lg border border-[hsl(288,8%,79%)] shadow-sm hover:shadow-md transition-all duration-200">
      <h3 className="font-heading text-xl text-[hsl(292,27%,36%)] mb-3">
        {title}
      </h3>
      <p className="text-[hsl(240,5%,50%)] leading-relaxed text-sm">
        {desc}
      </p>
    </div>
  );
}