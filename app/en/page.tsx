import HeaderEn from "./components/HeaderEn";
import FooterEn from "./components/FooterEn";
import WriterSubscribeTriggerEn from "./components/WriterSubscribeTriggerEn";

import Image from "next/image";
import BooksShowcase from "./BooksShowcase";
import ChatBotEn from "./components/ChatBotEn";


export const dynamic = "force-dynamic";

export default function HomePageEn() {
  return (
    <>
      <HeaderEn />

      <main>
        {/* ===== HERO ===== */}
        <section className="hero-page">
          <Image
            src="/images/hero-livres-v4.png"
            alt="Books and literature"
            width={1600}
            height={2400}
            priority
            className="heroImage"
          />

          <div className="hero-overlay">
            <h1 className="hero-title">
              Canadian Union of Arab Migrant Writers
            </h1>

            <WriterSubscribeTriggerEn />
          </div>
        </section>

        {/* ===== ABOUT ===== */}
        <section id="about" className="content-page">
          <h2 className="content-title-sm">About the Union</h2>

          <p className="content-text">
            The Canadian Union of Arab Migrant Writers aims to strengthen the
            presence of migrant literature as an essential component of Canada’s
            literary diversity. It recognizes voices shaped by migratory
            experiences as a vital part of the country’s living cultural
            heritage.
          </p>

          <p className="content-text">
            The Union works to promote and disseminate these voices through
            publishing initiatives, translation projects, training, research,
            literary encounters, and by encouraging the circulation of
            knowledge.
          </p>
        </section>

        {/* ===== ACTIVITIES ===== */}
        <section id="activities" className="content-page activities-section">
          <h2 className="content-title-sm">Activities</h2>

          <p className="content-text">
            The Union is committed to improving the social and economic
            conditions of migrant writers by ensuring concrete recognition of
            their literary work. It develops programs and activities across
            Canada to support migrant literature.
          </p>

          <ul className="activities-list">
            <li>Promotion and showcasing of migrant writers’ works</li>
            <li>Support throughout the publishing process</li>
            <li>Distribution of books through Arab bookstores in North America</li>
            <li>Support for translation into French and English</li>
            <li>Literary meetings and round tables</li>
            <li>Writing and research workshops</li>
            <li>Celebration of migrant creativity</li>
          </ul>
        </section>

        {/* ===== FORUM ===== */}
        <section id="forum" className="content-page">
          <h2 className="content-title-sm">
            National Forum on Migrant Literature
          </h2>

          <p className="content-text">
            The Union organizes an annual national forum on May 21 and 22, in
            parallel with UNESCO’s World Day for Cultural Diversity. The forum
            brings together migrant writers, critics, researchers, and cultural
            actors.
          </p>
        </section>

        {/* ===== PUBLICATIONS ===== */}
        <section id="books" className="content-page books-carousel-section">
          <h2 className="content-title-sm">Publications</h2>
          <BooksShowcase />
        </section>
      </main>

      <FooterEn />
<ChatBotEn />

    </>
  );
}



