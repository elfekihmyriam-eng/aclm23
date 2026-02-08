import HeaderEn from "./components/HeaderEn";
import FooterEn from "./components/FooterEn";
import WriterSubscribeTriggerEn from "./components/WriterSubscribeTriggerEn";

import Image from "next/image";
import BooksShowcase from "../fr/BooksShowcase";

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

        {/* ===== PUBLICATIONS ===== */}
        <section id="books" className="content-page books-carousel-section">
          <h2 className="content-title-sm">Publications</h2>
          <BooksShowcase />
        </section>
      </main>

      <FooterEn />
    </>
  );
}




