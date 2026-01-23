import "./globals.css";
import PayPalProvider from "./providers/PayPalProvider";

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
