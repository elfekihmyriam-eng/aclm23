import Link from "next/link";
import Image from "next/image";

export default function FooterEn() {
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
            alt="Canadian Union of Arab Migrant Writers"
            width={180}
            height={180}
            style={{ opacity: 0.9 }}
          />
        </div>

        {/* IDENTITY */}
        <div className="site-footer__identity">
          <p className="site-footer__name">
            Canadian Union of Arab Migrant Writers
          </p>
          <p className="site-footer__status">
            Non-profit cultural organization · Canada
          </p>
        </div>

        {/* ACTIONS */}
        <div className="site-footer__actions">
          <Link href="/en/support" className="footer-btn footer-btn--primary">
            Support the Union
          </Link>

          <Link href="/en/conditions" className="footer-btn footer-btn--outline">
            Terms and Conditions
          </Link>
        </div>

        {/* CONTACT */}
        <p className="site-footer__email">
          Contact: <a href="mailto:info@aclm.ca">info@aclm.ca</a>
        </p>

      </div>

      {/* SEPARATOR */}
      <div className="site-footer__separator" />

      {/* COPYRIGHT */}
      <div className="site-footer__bottom">
        © {new Date().getFullYear()} Canadian Union of Migrant Literature
      </div>
    </footer>
  );
}

