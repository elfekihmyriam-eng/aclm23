"use client";

import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header({
  onOpenRegister,
}: {
  onOpenRegister?: () => void;
}) {
  return (
    <header className="header-bar" dir="rtl">
      <div className="header-container">
        {/* LOGO */}
        <Link href="/ar" className="header-logo">
          <Image
            src="/images/logo2.png"
            alt="الجمعية الكندية للأدب المهجري"
            width={40}
            height={40}
            priority
          />
        </Link>

        {/* MENU */}
        <nav className="header-menu">
        <Link href="/ar#about" data-i18n-key="about">نبذة عن الجمعيّة</Link>
<Link href="/ar#activities" data-i18n-key="activities">أنشطة الجمعيّة</Link>
<Link href="/ar#forum" data-i18n-key="forum">المنتدى</Link>
<Link href="/ar/books" data-i18n-key="books">الإصدارات</Link>
<Link href="/ar/authors" data-i18n-key="authors">كتّاب من المهجر</Link>


          {onOpenRegister && (
         <button
  onClick={onOpenRegister}
  className="header-register-btn"
  data-i18n-key="writers_form"
>
  استمارة الكتّاب
</button>

          )}
        </nav>

        {/* LANG */}
        <div className="header-lang">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}


