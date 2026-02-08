export const dynamic = "force-dynamic";

export default function ConditionsPageFr() {
  return (
    <main className="content-page conditions-page" dir="ltr">
      <h1 className="content-title-lg">Conditions générales</h1>

      <div className="conditions-content">
        <section>
          <h2>1. Nature juridique</h2>
          <p>
            L’Union canadienne des écrivaines et écrivains migrants arabes est une
            organisation culturelle à but non lucratif (OBNL), enregistrée dans
            la province de Québec (Canada). Elle a pour mission de soutenir la
            littérature migrante et les auteurs et autrices issus des parcours
            migratoires.
          </p>
        </section>

        <section>
          <h2>2. Adhésion</h2>
          <p>
            L’adhésion à l’Union est gratuite et ouverte à l’ensemble des
            écrivaines, écrivains migrants et des acteurs du champ littéraire et
            culturel.
          </p>
          <p>
            Le dépôt d’une demande d’adhésion vaut déclaration de lecture et
            d’acceptation des présentes conditions générales.
          </p>
        </section>

        <section>
          <h2>3. Publication et contenu</h2>
          <p>
            Les droits littéraires et intellectuels des textes et documents
            soumis demeurent la propriété exclusive de leurs auteurs et autrices.
          </p>
          <p>
            L’Union se réserve le droit de présenter les textes ou des extraits
            sur ses plateformes numériques à des fins culturelles et
            informatives uniquement, sans aucune exploitation commerciale.
          </p>
        </section>

        <section>
          <h2>4. Traduction</h2>
          <p>
            Certaines œuvres peuvent être intégrées à des projets de traduction
            vers le français ou l’anglais, dans un cadre bénévole ou soutenu,
            selon les programmes et les capacités de l’Union.
          </p>
          <p>
            Aucune traduction ou publication ne peut être effectuée sans
            l’information et l’accord préalable de l’auteur ou de l’autrice.
          </p>
        </section>

        <section>
          <h2>5. Utilisation du site</h2>
          <p>
            Les utilisateurs et utilisatrices s’engagent à utiliser les
            plateformes de l’Union de manière légale et éthique, et à s’abstenir
            de publier tout contenu contraire aux lois en vigueur ou portant
            atteinte à la dignité d’autrui.
          </p>
        </section>

        <section>
          <h2>6. Protection des données personnelles</h2>
          <p>
            Les données personnelles collectées sont utilisées exclusivement
            dans le cadre des activités de l’Union. Elles ne sont transmises à
            aucun tiers sans consentement explicite, conformément aux lois en
            vigueur sur la protection des renseignements personnels.
          </p>
        </section>

        <section>
          <h2>7. Modifications</h2>
          <p>
            L’Union se réserve le droit de modifier les présentes conditions
            générales à tout moment. La version mise à jour sera publiée sur le
            site.
          </p>
        </section>

        <section>
          <h2>8. Acceptation</h2>
          <p>
            L’utilisation du site ou la soumission de toute demande (adhésion,
            manuscrit, participation) vaut acceptation pleine et entière des
            présentes conditions générales.
          </p>
        </section>
      </div>

      {/* ACTION BAS DE PAGE */}
      <div className="conditions-bottom">
        <a href="/fr" className="conditions-close">
          Fermer et revenir à la page d’accueil
        </a>
      </div>
    </main>
  );
}


