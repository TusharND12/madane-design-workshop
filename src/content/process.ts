import type { ProcessStep } from "@/lib/schema";

/** Working method (PRD §8.6) — reassures clients, reduces "what happens next" anxiety. */
export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Discovery",
    body: "We listen first. The brief, the site, the budget, the way you actually live or work — captured before a single line is drawn. Most decisions that matter are made here.",
  },
  {
    index: "02",
    title: "Concept",
    body: "One clear idea, argued through plans, references and rough volumes. We would rather present a single confident direction than a menu of safe ones.",
  },
  {
    index: "03",
    title: "Design Development",
    body: "The idea becomes exact — materials, light, joinery and detail resolved to construction tolerance. This is where restraint earns its keep.",
  },
  {
    index: "04",
    title: "Execution",
    body: "Drawings meet site. We coordinate trades, procurement and quality so the thing that gets built is the thing that was drawn — no quiet compromises.",
  },
  {
    index: "05",
    title: "Handover",
    body: "Snag-free, photograph-ready, explained. You receive a finished space and the documentation to keep it that way.",
  },
];
