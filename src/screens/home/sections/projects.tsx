import { ArrowUpRight } from "lucide-react";
import { ProjectList } from "@/components/project-list";
import { githubProfile } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section className="section-band section-muted" id="projetos">
      <div className="section-inner">
        <div className="projects-heading">
          <div className="section-heading">
            <p className="eyebrow">Projetos</p>
            <h2>Ideias que viraram projetos.</h2>
            <p>Aplicativos, jogos e sites. Conheça os detalhes ou baixe os APKs disponíveis.</p>
          </div>
          <a className="projects-github-link" href={githubProfile} target="_blank" rel="noreferrer">
            Meu GitHub <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <ProjectList />
      </div>
    </section>
  );
}
