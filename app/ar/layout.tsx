import "../globals.css";
import type { ReactNode } from "react";
import Script from "next/script";

// ✅ Patch UI pour corriger les boutons / menus
import I18nUiPatch from "@/components/I18nUiPatch";

export default function ArLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}

        {/* ✅ Patch i18n UI (corrige les boutons mal traduits) */}
        <I18nUiPatch />

        {/* Root modales */}
        <div id="modal-root"></div>

        {/* ===== Google Translate (hidden, no widget UI) ===== */}
        <div
          id="google_translate_element"
          style={{ display: "none" }}
        />

        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement(
                  { pageLanguage: 'ar', autoDisplay: false },
                  'google_translate_element'
                );
              }
            `,
          }}
        />

        <Script
          id="google-translate-lib"
          strategy="afterInteractive"
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        />
      </body>
    </html>
  );
}

