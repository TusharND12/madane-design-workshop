"use client";

import { useState } from "react";

/**
 * Vacancies as a centered wall of role names over a studio image (yodezeen.com/
 * career style). Every role is ghosted; the hovered one brightens, reveals its
 * department and a "More info" apply button. The last line is the open call.
 */
const CAREERS_EMAIL = "careers@madane.in";

type Role = { title: string; meta: string; apply?: boolean };

const ROLES: Role[] = [
  { title: "Chief Architect", meta: "Architecture" },
  { title: "Senior Architect", meta: "Architecture" },
  { title: "Junior Architect", meta: "Architecture" },
  { title: "Architectural Intern", meta: "Architecture" },
  { title: "Head of Interior Design", meta: "Interior Design" },
  { title: "Senior Interior Designer", meta: "Interior Design" },
  { title: "Interior Designer", meta: "Interior Design" },
  { title: "Interior Design Intern", meta: "Interior Design" },
  { title: "Head of Project Management", meta: "Project Management" },
  { title: "Senior Project Manager", meta: "Project Management" },
  { title: "Project Manager", meta: "Project Management" },
  { title: "Assistant Project Manager", meta: "Project Management" },
  { title: "Project Supervisor", meta: "Project Management" },
  { title: "Business Development Director", meta: "Business Development" },
  { title: "Business Development Executive", meta: "Business Development" },
  { title: "Business Development Executive (Fresher)", meta: "Business Development" },
  { title: "Marketing Manager", meta: "Marketing" },
  { title: "Marketing Executive", meta: "Marketing" },
  { title: "Social Media Manager", meta: "Marketing" },
  { title: "IT & Technology Manager", meta: "Technology" },
  { title: "IT Support Technician", meta: "Technology" },
  { title: "BIM / CAD Specialist", meta: "Technology" },
  { title: "Procurement Manager", meta: "Procurement" },
  { title: "Senior Accountant", meta: "Accounts" },
  { title: "Accountant", meta: "Accounts" },
  { title: "Accounts Assistant", meta: "Accounts" },
  { title: "HR Head", meta: "Human Resources" },
  { title: "HR Manager", meta: "Human Resources" },
  { title: "Office Manager", meta: "Admin" },
  { title: "Administrative Assistant", meta: "Admin" },
  { title: "Didn't find your role? Apply anyway", meta: "Mumbai · Remote", apply: true },
];

const applyHref = (role: string) =>
  `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`Application — ${role}`)}`;

export function CareerRoles() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative w-full overflow-hidden bg-paper">
      <div className="relative z-10 shell-wide py-[clamp(4rem,12vh,8rem)] text-center">
        <ul className="flex flex-col items-center">
          {ROLES.map((r, i) => {
            const isActive = active === i;
            return (
              <li
                key={r.title}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="flex flex-col items-center"
              >
                <a
                  href={applyHref(r.apply ? "Open application" : r.title)}
                  className="group relative inline-flex items-start justify-center leading-[1.04]"
                >
                  <span
                    className={`font-display text-[clamp(1.35rem,3.1vw,2.6rem)] font-bold uppercase tracking-tight transition-colors duration-300 ${
                      isActive ? "text-ink" : "text-ink/25"
                    }`}
                  >
                    {r.title}
                  </span>
                  {/* Department sits beside the word but out of layout flow, so the
                      title stays centred and the button lines up under it. */}
                  <span
                    className={`absolute left-full top-1.5 ml-2.5 hidden whitespace-nowrap font-mono text-[0.55rem] uppercase leading-tight tracking-label transition-opacity duration-300 sm:block ${
                      isActive ? "text-ink/70 opacity-100" : "text-ink/30 opacity-0"
                    }`}
                  >
                    {r.meta}
                  </span>
                </a>

                {/* More info / apply, only under the active role */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${isActive ? "max-h-12 opacity-100" : "max-h-0 opacity-0"}`}
                  aria-hidden={!isActive}
                >
                  <a
                    href={applyHref(r.apply ? "Open application" : r.title)}
                    tabIndex={isActive ? 0 : -1}
                    className="my-2 inline-flex items-center rounded-full border border-ink/40 px-5 py-1.5 font-mono text-[0.6rem] uppercase tracking-label text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
                  >
                    More info
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
