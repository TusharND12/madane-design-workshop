/**
 * News & Insights entries (editorial journal). Launch placeholders - Madane to
 * supply real articles/press. Kept as flat data so both the /insights index and
 * the homepage teaser read from one source.
 */
export type Insight = {
  kind: "News" | "Insight" | "Perspective";
  date: string; // display string, e.g. "Jun 2026"
  title: string;
  excerpt: string;
  readTime: string;
};

export const insights: Insight[] = [
  {
    kind: "Insight",
    date: "Jun 2026",
    title: "Passive-first: designing workspaces for Bharat's climate.",
    excerpt:
      "Orientation, shading and airflow before machinery. How a climate-led plan cuts running cost and carbon long before the first HVAC unit is specified.",
    readTime: "6 min",
  },
  {
    kind: "Perspective",
    date: "May 2026",
    title: "From first sketch to final key: the turnkey advantage.",
    excerpt:
      "When one studio holds design and delivery, intent survives to handover. A note on why single accountability makes better buildings.",
    readTime: "5 min",
  },
  {
    kind: "News",
    date: "Apr 2026",
    title: "MDW shares its 2026-2030 net-zero roadmap at IIID.",
    excerpt:
      "Our environment & sustainability vision, presented to peers, measure, commit, certify, and lead toward carbon-neutral operations by 2030.",
    readTime: "3 min",
  },
  {
    kind: "Insight",
    date: "Mar 2026",
    title: "Material honesty: why we design in monochrome.",
    excerpt:
      "Restraint as a discipline. Letting structure, light and texture carry the room when the palette steps back.",
    readTime: "4 min",
  },
];
