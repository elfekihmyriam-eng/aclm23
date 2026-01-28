"use client";

import Link from "next/link";
import Image from "next/image";

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
          <Link href="/ar#about">نبذة عن الجمعيّة</Link>
          <Link href="/ar#activities">أنشطة الجمعيّة</Link>
          <Link href="/ar#forum">المنتدى</Link>
          <Link href="/ar#books">الإصدارات</Link>

          {/* ✅ PAGE AUTEURS */}
          <Link href="/ar/authors">كتّاب من المهجر</Link>

          {/* BOUTON MODALE */}
          {onOpenRegister && (
            <button
              onClick={onOpenRegister}
              className="header-register-btn"
            >
              استمارة الكتّاب
            </button>
          )}
        </nav>

        {/* LANG */}
        <div className="header-lang">
          <Link href="/fr">FR</Link>
        </div>
      </div>
    </header>
  );
}


