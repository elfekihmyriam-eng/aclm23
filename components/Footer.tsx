import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer" dir="rtl">
      <div className="site-footer__inner">

        {/* IDENTITÉ */}
        <div className="site-footer__identity">
          <p className="site-footer__name">
            الجمعية الكندية للأدب المهجري
          </p>
          <p className="site-footer__status">
            منظّمة ثقافيّة غير ربحيّة · كندا
          </p>
        </div>

        {/* BOUTONS */}
        <div className="site-footer__actions">
          <Link href="/ar/support" className="footer-btn">
            تقديم دعم
          </Link>
          <Link
            href="/ar/conditions"
            className="footer-btn footer-btn--ghost"
          >
            الشروط العامة
          </Link>
        </div>

     

      </div> {/* <-- fermeture site-footer__inner */}

      <div className="site-footer__bottom">
        © {new Date().getFullYear()} الجمعية الكندية للأدب المهجري
      </div>
    </footer>
  );
}

