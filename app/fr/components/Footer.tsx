import Link from "next/link";
import Image from "next/image";

export default function FooterFr() {
  return (
    <footer className="site-footer" dir="ltr">
      <div className="site-footer__inner">

        {/* LOGO */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <Image
            src="/images/footer-logo1.png"
            alt="Union canadienne des écrivaines et écrivains migrants arabes"
            width={180}
            height={180}
            style={{ opacity: 0.9 }}
          />
        </div>

        {/* IDENTITÉ */}
        <div className="site-footer__identity">
          <p className="site-footer__name">
            Union canadienne des écrivaines et écrivains migrants arabes
          </p>
          <p className="site-footer__status">
            Organisation culturelle à but non lucratif · Canada
          </p>
        </div>

        {/* ACTIONS */}
        <div className="site-footer__actions">
          <Link href="/fr/support" className="footer-btn footer-btn--primary">
            Soutenir l’Union
          </Link>

          <Link href="/fr/conditions" className="footer-btn footer-btn--outline">
            Conditions générales
          </Link>
        </div>

        {/* CONTACT */}
        <p className="site-footer__email">
          Contact : <a href="mailto:info@aclm.ca">info@aclm.ca</a>
        </p>

      </div>

      {/* SÉPARATEUR */}
      <div className="site-footer__separator" />

      {/* COPYRIGHT */}
      <div className="site-footer__bottom">
        © {new Date().getFullYear()} Union canadienne de la littérature migrante
      </div>
    </footer>
  );
}


