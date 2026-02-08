import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer" dir="rtl">
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
            alt="الاتحاد الكندي للكتّاب المهاجرين العرب"
            width={180}
            height={180}
            style={{ opacity: 0.9 }}
          />
        </div>

        {/* IDENTITÉ */}
        <div className="site-footer__identity">
          <p className="site-footer__name">
            الاتحاد الكندي للكتّاب المهاجرين
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

