import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        {/* Favicon forcé avec nom unique */}
        <link rel="icon" href="/favicon.ico?v=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
