import Navbar from "../components/navbar";
export default function HowItWorks() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="pt-32 pb-20 max-w-5xl mx-auto px-6">
        <h1 className="font-heading text-5xl text-[hsl(292,27%,36%)] mb-16 text-center">
          How PeerHive Works
        </h1>

        <div className="space-y-16">

          <Step
            number="01"
            title="Teacher Creates Assignment"
            desc="Assignment includes deadline, rubric criteria, and peer review count. System stores assignment logic."
          />

          <Step
            number="02"
            title="Students Submit Projects"
            desc="Students upload their work before the deadline. Late submissions are flagged automatically."
          />

          <Step
            number="03"
            title="System Allocates Reviewers"
            desc="Reviewers are assigned based on availability, fairness rules, and workload distribution."
          />

          <Step
            number="04"
            title="Peer Evaluation Happens"
            desc="Students evaluate submissions using rubric scoring and detailed feedback."
          />

          <Step
            number="05"
            title="Teacher Monitors & Intervenes"
            desc="Teacher views analytics, handles review complaints, and reassigns if necessary."
          />

          <Step
            number="06"
            title="Analytics & Growth"
            desc="Performance trends and review quality metrics help improve academic outcomes."
          />

        </div>
      </div>
    </div>
  );
}

function Step({ number, title, desc }) {
  return (
    <div className="flex gap-6">
      <div className="text-4xl font-heading text-[hsl(292,27%,36%)]">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-bold text-[hsl(240,10%,20%)] mb-2">
          {title}
        </h3>
        <p className="text-[hsl(240,5%,50%)] leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}