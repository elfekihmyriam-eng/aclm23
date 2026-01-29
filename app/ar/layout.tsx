import "../globals.css";
import type { ReactNode } from "react";

export default function ArLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
