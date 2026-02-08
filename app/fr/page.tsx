import Header from "./components/Header";
import Footer from "./components/Footer";
import WriterSubscribeTrigger from "./components/WriterSubscribeTrigger";

import Image from "next/image";
import BooksShowcase from "../ar/BooksShowcase";

export const dynamic = "force-dynamic";

export default function HomePageFr() {
  return (
    <>
      <Header />

      <main>
        {/* ===== HERO ===== */}
        <section className="hero-page">
          <Image
            src="/images/hero-livres-v4.png"
            alt="Livres et lettres"
            width={1600}
            height={2400}
            priority
            className="heroImage"
          />

          <div className="hero-overlay">
            <h1 className="hero-title">
              Union canadienne des écrivaines et écrivains migrants arabes
            </h1>

            <WriterSubscribeTrigger />
          </div>
        </section>

        {/* ===== À PROPOS ===== */}
        <section id="about" className="content-page">
          <h2 className="content-title-sm">Présentation de l’Union</h2>

          <p className="content-text">
            L’Union canadienne des écrivaines et écrivains migrants arabes a pour
            mission de renforcer la présence de la littérature migrante en tant
            que composante essentielle de la diversité littéraire au Canada.
            Consciente de l’importance des voix issues des expériences
            migratoires, l’Union considère ces écritures comme un élément
            fondamental du patrimoine culturel vivant du pays.
          </p>

          <p className="content-text">
            Elle œuvre à la mise en valeur et à la diffusion de ces voix à travers
            des initiatives de publication, de traduction, de formation, de
            recherche, de rencontres littéraires, ainsi que par la promotion du
            savoir et la facilitation de sa circulation.
          </p>
        </section>

        {/* ===== ACTIVITÉS ===== */}
        <section id="activities" className="content-page activities-section">
          <h2 className="content-title-sm">Activités de l’Union</h2>

          <p className="content-text">
            Convaincue que l’amélioration des conditions sociales et économiques
            des écrivaines et écrivains issus de la migration passe également par
            une reconnaissance concrète de leurs productions littéraires, l’Union
            s’engage à promouvoir la littérature migrante à travers un ensemble
            de programmes et d’activités déployés à l’échelle du territoire
            canadien.
          </p>

          <ul className="activities-list">
            <li>Présentation et valorisation des œuvres</li>
            <li>Accompagnement dans le processus de publication</li>
            <li>Diffusion dans les librairies arabes en Amérique du Nord</li>
            <li>Soutien à la traduction</li>
            <li>Rencontres et tables rondes littéraires</li>
            <li>Ateliers d’écriture et de recherche</li>
            <li>Célébration de la création migrante</li>
          </ul>
        </section>

        {/* ===== FORUM ===== */}
        <section id="forum" className="content-page">
          <h2 className="content-title-sm">
            Forum national de la littérature migrante
          </h2>

          <p className="content-text">
            L’Union organise un forum national annuel les 21 et 22 mai, en
            parallèle de la Journée mondiale de la diversité culturelle
            proclamée par l’UNESCO.
          </p>
        </section>

        {/* ===== PUBLICATIONS ===== */}
        <section id="books" className="content-page books-carousel-section">
          <h2 className="content-title-sm">Publications de la migration</h2>
          <BooksShowcase />
        </section>
      </main>

      <Footer />
    </>
  );
}

