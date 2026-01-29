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

        {/* ACTIONS */}
        <div className="site-footer__actions">
          <Link href="/ar/support" className="footer-btn footer-btn--primary">
            تقديم دعم
          </Link>

          <Link href="/ar/conditions" className="footer-btn footer-btn--outline">
            الشروط العامّة
          </Link>
        </div>

        {/* CONTACT */}
        <p className="site-footer__email">
          للتواصل: <a href="mailto:info@aclm.ca">info@aclm.ca</a>
        </p>

      </div>

      {/* SEPARATOR */}
      <div className="site-footer__separator" />

      {/* COPYRIGHT */}
      <div className="site-footer__bottom">
        © {new Date().getFullYear()} الجمعية الكندية للأدب المهجري
      </div>
    </footer>
  );
}

