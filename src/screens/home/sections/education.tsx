import { GraduationCap } from "lucide-react";
import { education } from "@/data/profile";

export function EducationSection() {
  return (
    <section className="section-band" id="formacao">
      <div className="section-inner">
        <div className="section-heading wide-heading">
          <p className="eyebrow">Formação</p>
          <h2>Base acadêmica e idiomas.</h2>
        </div>

        <div className="education-grid">
          {education.map((item) => (
            <article className="education-item" key={item.title}>
              <GraduationCap size={24} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                <span>{item.period}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
