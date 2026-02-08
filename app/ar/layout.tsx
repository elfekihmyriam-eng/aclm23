import "../globals.css";
import type { ReactNode } from "react";

export default function ArLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}

      <div id="modal-root"></div>
    </>
  );
}


