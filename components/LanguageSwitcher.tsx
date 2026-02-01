"use client";

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/`;
}

export default function LanguageSwitcher() {
  const changeLang = (lang: "ar" | "fr" | "en") => {
    if (lang === "ar") {
      // retour langue originale
      setCookie("googtrans", "/ar/ar");
    } else {
      // forcer traduction Google
      setCookie("googtrans", `/ar/${lang}`);
    }

    // reload léger pour appliquer la langue
    window.location.reload();
  };

  return (
    <div className="header-lang" style={{ display: "flex", gap: "8px" }}>
      <button type="button" onClick={() => changeLang("ar")}>
        AR
      </button>
      <button type="button" onClick={() => changeLang("fr")}>
        FR
      </button>
      <button type="button" onClick={() => changeLang("en")}>
        EN
      </button>
    </div>
  );
}
