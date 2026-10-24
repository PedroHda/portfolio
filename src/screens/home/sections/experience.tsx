import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { experiences } from "@/data/profile";

export function ExperienceSection() {
  return (
    <section className="section-band section-muted" id="experiencia">
      <div className="section-inner split-section">
        <div className="section-heading sticky-heading">
          <p className="eyebrow">Experiência</p>
          <h2>Onde tenho criado e sustentado soluções.</h2>
        </div>

        <div className="timeline">
          {experiences.map((experience) => (
            <article className="experience-card" key={experience.company}>
              <div className="experience-topline">
                {experience.logo ? (
                  <Image
                    src={experience.logo}
                    alt=""
                    width={58}
                    height={58}
                    className="company-logo"
                  />
                ) : (
                  <span className="company-mark" aria-hidden="true">
                    ME
                  </span>
                )}
                <div>
                  <h3>{experience.company}</h3>
                  <p>{experience.context}</p>
                </div>
              </div>

              <div className="role-header">
                <strong>{experience.role}</strong>
                <span>
                  <CalendarDays size={16} />
                  {experience.period}
                </span>
              </div>

              <ul className="highlight-list">
                {experience.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              <div className="tag-row" aria-label="Tecnologias usadas">
                {experience.stack.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
