import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const VERDICTS = [
  { label: "Accepted", code: "AC", tone: "ok" },
  { label: "Wrong Answer", code: "WA", tone: "bad" },
  { label: "Time Limit Exceeded", code: "TLE", tone: "warn" },
  { label: "Accepted", code: "AC", tone: "ok" },
  { label: "Runtime Error", code: "RE", tone: "bad" },
  { label: "Accepted", code: "AC", tone: "ok" },
];

const LANGS = ["C++", "Java", "JavaScript"];

const FEATURES = [
  {
    tag: "01",
    title: "Judge0-backed execution",
    body: "Every submission runs in an isolated sandbox across 6+ languages, with real stdin/stdout comparison — not string matching.",
  },
  {
    tag: "02",
    title: "Pattern-first problem sets",
    body: "Problems are grouped by underlying technique — two pointers, binary search on answer, DP on trees — so you learn to recognize the shape, not memorize solutions.",
  },
  {
    tag: "03",
    title: "Real solutions, powered by Erical-AI",
    body: "Solve programming problems, debug your code, and clear technical doubts with an intelligent AI mentor—all for free.",
  },
];

function VerdictPill({ v }) {
  const toneMap = {
    ok: "text-[#4ADE80] border-[#4ADE80]/30 bg-[#4ADE80]/10",
    bad: "text-[#F87171] border-[#F87171]/30 bg-[#F87171]/10",
    warn: "text-[#FBBF24] border-[#FBBF24]/30 bg-[#FBBF24]/10",
  };
  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded-md border font-mono text-xs ${toneMap[v.tone]}`}
    >
      <span>{v.label}</span>
      <span className="opacity-70">{v.code}</span>
    </div>
  );
}

export default function LandingPage() {
  const [queue, setQueue] = useState(VERDICTS.slice(0, 4));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setQueue((prev) => {
      const next = VERDICTS[tick % VERDICTS.length];
      return [next, ...prev].slice(0, 4);
    });
  }, [tick]);

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#EDEDED] font-sans selection:bg-[#4ADE80]/20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .font-mono-custom { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .verdict-enter { animation: fadeSlideIn 0.4s ease-out; }
      `}</style>

      {/* Nav */}
      <nav className="max-w-370 mx-auto px-8 lg:px-12 py-6 flex items-center justify-between">
        <div className="font-display font-semibold text-3xl tracking-tight">
        Erical<span className="text-[#4ADE80]">Code</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/signup"
            className="text-sm text-[#9a9c9f] hover:text-[#ffffff] transition-colors px-3 py-2"
          >
            Signup
          </Link>
          <Link
            to="/signup"
            className="text-sm bg-[#EDEDED] text-[#0A0B0D] font-medium px-4 py-2 rounded-md hover:bg-white transition-colors"
          >
            Start solving
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-350 mx-auto px-8 lg:px-12 pt-16 pb-24 grid md:grid-cols-2 gap-20 items-center">
        <div>
          <p className="font-mono-custom text-xs text-[#8A8F98] mb-4 tracking-wide">
           Learn. Solve. Grow 
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight mb-6">
            Stop guessing.
            <br />
            Start recognizing
            <br />
            <span className="text-[#4ADE80]">the pattern.</span>
          </h1>
          <p className="text-[#8A8F98] text-lg leading-relaxed mb-8 max-w-md">
            A platform to master coding through structured algorithmic challenges and real-world programming practice.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/signup"
              className="bg-[#4ADE80] text-[#0A0B0D] font-medium px-6 py-3 rounded-md hover:bg-[#3fc76f] transition-colors"
            >
              Start for free
            </Link>
            <Link
              to="/login"
              className="border border-[#2A2D33] px-6 py-3 rounded-md text-sm hover:border-[#4A4D53] transition-colors"
            >
              I already have an account
            </Link>
          </div>
        </div>

        {/* Signature element: live judge queue */}
        <div className="bg-[#131519] border border-[#2A2D33] rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2D33]">
            <span className="font-mono-custom text-xs text-[#8A8F98]">
              submission_queue.log
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#4ADE80]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
              live
            </span>
          </div>
          <div className="p-4 space-y-2">
            {queue.map((v, i) => (
              <div key={`${tick}-${i}`} className={i === 0 ? "verdict-enter" : ""}>
                <VerdictPill v={v} />
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-[#2A2D33] flex flex-wrap gap-2">
            {LANGS.map((l) => (
              <span
                key={l}
                className="font-mono-custom text-[11px] text-[#8A8F98] border border-[#2A2D33] rounded px-2 py-1"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-350 mx-auto px-8 lg:px-12 pb-24">
        <div className="grid md:grid-cols-3 gap-8 border-t border-[#2A2D33] pt-16">
          {FEATURES.map((f) => (
            <div key={f.tag}>
              <span className="font-mono-custom text-[#4ADE80] text-xs">
                {f.tag}
              </span>
              <h3 className="font-display text-xl font-medium mt-3 mb-2">
                {f.title}
              </h3>
              <p className="text-[#8A8F98] text-sm leading-relaxed">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
     <section className="max-w-350 mx-auto px-8 lg:px-12 pb-24">
        <div className="bg-[#131519] border border-[#2A2D33] rounded-lg px-8 py-12 text-center">
          <h2 className="font-display text-3xl font-semibold mb-3">
            Your next submission could be{" "}
            <span className="text-[#4ADE80]">Accepted</span>.
          </h2>
          <p className="text-[#8A8F98] mb-6">
            Free to start. No credit card required.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-[#4ADE80] text-[#0A0B0D] font-medium px-6 py-3 rounded-md hover:bg-[#3fc76f] transition-colors"
          >
            Create free account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-380 mx-auto px-8 lg:px-12 py-8 border-t border-[#2A2D33] flex items-center justify-between text-xs text-[#8A8F98]">
          <span className="font-mono-custom">
               © {new Date().getFullYear()} EricalCode. All rights reserved.
          </span>
        <span>Built with the MERN stack + Judge0 + AI-powered doubt solving</span>
        <div className="flex items-center gap-4">
            <span className="font-signature text-l text-[#cd9be2]">
            Sohan Maity
          </span>
          <a
            href="https://github.com/mr-sohan1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-[#EDEDED] transition-colors"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/sohan-maity-665a05361/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-[#EDEDED] transition-colors"
          >
            <FaLinkedin size={18} />
          </a>
        </div>
      </footer>
    </div>
  );
}