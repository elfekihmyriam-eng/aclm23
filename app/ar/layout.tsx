import "../globals.css";
import type { ReactNode } from "react";
import Script from "next/script";

export const metadata = {
  icons: {
    icon: "/favicon.ico",
  },
};


// ✅ chemin relatif OK
import I18nUiPatch from "../../components/I18nUiPatch";

export default function ArLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}

      {/* 🔧 Patch UI (laisser commenté tant que la trad est instable) */}
      {/* <I18nUiPatch /> */}

      <div id="modal-root"></div>

      <div id="google_translate_element" style={{ display: "none" }} />

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
    </>
  );
}


