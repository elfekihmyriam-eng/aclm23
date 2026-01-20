import "./globals.css";
import PayPalProvider from "@/components/PayPalProvider";

export const metadata = {
  title: "ACLM",
  description: "Association canadienne pour la littérature migrante",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <PayPalProvider>
          {children}
        </PayPalProvider>
      </body>
    </html>
  );
}

