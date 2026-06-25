import { getFeaturedProjects } from "@/lib/cms";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { DeviceShowcase } from "@/components/home/DeviceShowcase";

/** Hand-picked work, revealed inside an opening 3D laptop + phone (PRD H3). */
export function SelectedWork() {
  const projects = getFeaturedProjects(6);

  return (
    <section id="work" className="bg-paper">
      <div className="shell-wide pt-section">
        <SectionHeader
          index="01"
          label="Selected Work"
          title="A practice measured in finished rooms."
          intro="Six recent projects across homes and workspaces — each resolved to a single, quiet idea."
          align="between"
        />
      </div>

      <DeviceShowcase projects={projects} />
    </section>
  );
}
