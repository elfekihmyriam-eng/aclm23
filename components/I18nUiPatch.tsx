"use client";

import { useEffect } from "react";

const DICT: Record<string, { ar: string; fr: string; en: string }> = {
  writers_form: { ar: "استمارة الكتّاب", fr: "Formulaire auteurs", en: "Authors form" },
  subscribe_writer: { ar: "اشتراك الكاتب", fr: "Inscription auteur", en: "Writer signup" },
  about: { ar: "نبذة عن الجمعيّة", fr: "À propos", en: "About" },
  activities: { ar: "أنشطة الجمعيّة", fr: "Activités", en: "Activities" },
  forum: { ar: "المنتدى", fr: "Forum", en: "Forum" },
  books: { ar: "الإصدارات", fr: "Publications", en: "Publications" },
  authors: { ar: "كتّاب من المهجر", fr: "Auteurs migrants", en: "Migrant authors" },
};

function getLang(): "ar" | "fr" | "en" {
  // Google translate met un cookie "googtrans" souvent comme "/ar/fr"
  const m = document.cookie.match(/googtrans=([^;]+)/);
  if (m?.[1]) {
    const parts = decodeURIComponent(m[1]).split("/");
    const to = parts[2] as any;
    if (to === "fr" || to === "en") return to;
  }
  return "ar";
}

export default function I18nUiPatch() {
  useEffect(() => {
    const apply = () => {
      const lang = getLang();
      document.querySelectorAll<HTMLElement>("[data-i18n-key]").forEach((el) => {
        const key = el.getAttribute("data-i18n-key") || "";
        const entry = DICT[key];
        if (!entry) return;
        el.textContent = entry[lang];
      });
    };

    // Applique au chargement + après un changement de langue
    apply();

    const interval = setInterval(apply, 500); // léger, pour capter le moment où Google change la langue
    return () => clearInterval(interval);
  }, []);

  return null;
}

