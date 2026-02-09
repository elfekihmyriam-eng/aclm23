"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeaderEn({
  onOpenRegister,
}: {
  onOpenRegister?: () => void;
}) {
  return (
    <header className="header-bar" dir="ltr">
      <div className="header-container">
        {/* LOGO */}
        <Link href="/en" className="header-logo">
          <Image
            src="/images/logo3.png"
            alt="Canadian Union of Arab Migrant Writers"
            width={80}
            height={80}
            priority
          />
        </Link>

        {/* MAIN MENU */}
        <nav className="header-menu">
          <Link href="/en#about">About the Union</Link>
          <Link href="/en#activities">Activities</Link>
          <Link href="/en#forum">Forum</Link>
          <Link href="/en/books">Publications</Link>
          <Link href="/en/authors">Migrant Authors</Link>

          {onOpenRegister && (
            <button
              onClick={onOpenRegister}
              className="header-register-btn"
            >
              Writers’ Registration
            </button>
          )}
        </nav>

        {/* LANGUAGE SWITCH */}
        <div className="header-lang">
          <Link href="/ar" className="lang-link">AR</Link>
          <span className="lang-sep">|</span>
          <Link href="/fr" className="lang-link">FR</Link>
          <span className="lang-sep">|</span>
          <Link href="/en" className="lang-link active">EN</Link>
        </div>
      </div>
    </header>
  );
}


