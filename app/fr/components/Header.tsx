"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeaderFr({
  onOpenRegister,
}: {
  onOpenRegister?: () => void;
}) {
  return (
    <header className="header-bar" dir="ltr">
      <div className="header-container">
        {/* LOGO */}
        <Link href="/fr" className="header-logo">
          <Image
            src="/images/logo3.png"
            alt="Union canadienne des écrivaines et écrivains migrants arabes"
            width={80}
            height={80}
            priority
          />
        </Link>

        {/* MENU */}
        <nav className="header-menu">
          <Link href="/fr#about">À propos de l’Union</Link>
          <Link href="/fr#activities">Activités</Link>
          <Link href="/fr#forum">Forum</Link>
          <Link href="/fr/books">Publications</Link>
          <Link href="/fr/authors">Auteurs de la migration</Link>

          {onOpenRegister && (
            <button
              onClick={onOpenRegister}
              className="header-register-btn"
            >
              Formulaire des écrivain·e·s
            </button>
          )}
        </nav>

        {/* LANG SWITCH (ROUTES RÉELLES) */}
        <div className="header-lang">
          <Link href="/ar" className="lang-link">AR</Link>
          <span className="lang-sep">|</span>
          <Link href="/fr" className="lang-link">FR</Link>
          <span className="lang-sep">|</span>
          <Link href="/en" className="lang-link">EN</Link>
        </div>
      </div>
    </header>
  );
}


