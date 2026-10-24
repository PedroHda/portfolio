import { Code2, Database, Server, Wrench } from "lucide-react";
import { skillGroups } from "@/data/profile";

const skillIcons = { code: Code2, database: Database, server: Server, wrench: Wrench };

export function SkillsSection() {
  return (
    <section className="section-band" id="skills">
      <div className="section-inner">
        <div className="section-heading wide-heading">
          <p className="eyebrow">Skills</p>
          <h2>Tecnologias alinhadas ao currículo.</h2>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => {
            const Icon = skillIcons[group.icon];

            return (
              <article className="skill-card" key={group.title}>
                <div className="skill-card-title">
                  <Icon size={22} />
                  <h3>{group.title}</h3>
                </div>
                <div className="skill-list">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
