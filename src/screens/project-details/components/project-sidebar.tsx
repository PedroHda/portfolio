import { ArrowUpRight, Download, FileText } from "lucide-react";
import { readmeUrl, repositoryUrl } from "@/data/projects";
import type { Project } from "@/types/project";

export function ProjectSidebar({ project }: { project: Project }) {
  return (
    <aside className="project-sidebar" aria-label="Links e download do projeto">
      {project.download && (
        <section className="project-download-panel" aria-labelledby="download-title">
          <span className="download-panel-icon"><Download size={22} aria-hidden="true" /></span>
          <h2 id="download-title">Experimente no Android</h2>
          <p>{project.download.requirements}</p>
          <dl className="download-info">
            <div><dt>Versão</dt><dd>{project.download.version}</dd></div>
            <div><dt>Download</dt><dd>{project.download.size} · APK</dd></div>
          </dl>
          <a
            className="button button-primary"
            href={project.download.href}
            download={project.download.filename}
            aria-label={`Baixar APK de ${project.title}`}
          >
            <Download size={18} aria-hidden="true" /> Baixar APK
          </a>
          <p className="download-note">{project.download.note}</p>
          <details className="install-guide">
            <summary>Como instalar o APK</summary>
            <ol>
              <li>Baixe o arquivo no celular Android.</li>
              <li>Abra o APK na pasta Downloads.</li>
              <li>Se solicitado, autorize a instalação para o navegador ou gerenciador de arquivos usado.</li>
              <li>Conclua a instalação e abra o aplicativo.</li>
            </ol>
          </details>
        </section>
      )}

      <section className="project-source-panel" aria-labelledby="source-title">
        <h2 id="source-title">Explore o projeto</h2>
        <span className="project-status">{project.status}</span>
        <a className="button button-secondary" href={repositoryUrl(project)} target="_blank" rel="noreferrer">
          <ArrowUpRight size={18} aria-hidden="true" /> Ver no GitHub
        </a>
        {project.readmeAvailable && (
          <>
            <a className="readme-link" href={readmeUrl(project)} target="_blank" rel="noreferrer">
              <FileText size={17} aria-hidden="true" /> Ler README completo
            </a>
            <p>Resumo baseado no README. Encontre instruções de uso, configuração e detalhes técnicos no repositório.</p>
          </>
        )}
      </section>
    </aside>
  );
}
