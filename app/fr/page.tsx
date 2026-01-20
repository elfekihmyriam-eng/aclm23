export default function PageFr() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 space-y-20">

      {/* Présentation */}
      <section className="space-y-6">
        <h1 className="text-3xl font-semibold">
          Association canadienne pour la littérature migrante
        </h1>
        <p className="text-lg text-[#C7CDD6] leading-relaxed">
          L’Association canadienne pour la littérature migrante (ACLM) est un
          espace dédié à la valorisation des écritures issues de l’expérience
          migratoire, dans toutes leurs langues, formes et expressions.
        </p>
      </section>

      {/* Mission */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Mission
        </h2>
        <p className="text-[#C7CDD6] leading-relaxed">
          L’ACLM a pour mission de soutenir, diffuser et faire reconnaître la
          littérature migrante comme une composante essentielle du paysage
          culturel canadien, en favorisant le dialogue, la création et la
          transmission.
        </p>
      </section>

      {/* Activités */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Activités
        </h2>
        <ul className="list-disc list-inside space-y-3 text-[#C7CDD6]">
          <li>Organisation de rencontres littéraires et de tables rondes</li>
          <li>Soutien à la publication et à la traduction</li>
          <li>Recherche et réflexion autour des littératures migrantes</li>
          <li>Création de réseaux entre écrivains, chercheurs et lecteurs</li>
        </ul>
      </section>

    </main>
  );
}
