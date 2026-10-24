import { highlights } from "@/data/profile";

export function AboutSection() {
  return (
    <section className="section-band" id="sobre">
      <div className="section-inner split-section">
        <div className="section-heading sticky-heading">
          <p className="eyebrow">Sobre mim</p>
          <h2>Fullstack com base forte em produto, backend e automação.</h2>
        </div>

        <div className="content-stack">
          <p className="section-lead">
            Minha trajetória começou com Python, HTML e CSS em 2019 e
            evoluiu para projetos profissionais com C#, .NET, React,
            TypeScript e bancos SQL. Tenho vivência em times
            multifuncionais, atendimento de demandas de cliente, correção de
            bugs, evolução de plataformas web e modernização de ferramentas
            legadas.
          </p>
          <p>
            Nos últimos projetos, tenho trabalhado com APIs REST, extração
            de regras de negócio e automações para engenharia, incluindo
            integrações com CATIA V5 e apoio ao time KBE na Embraer.
          </p>

          <div className="profile-summary" aria-label="Resumo do perfil">
            {highlights.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
