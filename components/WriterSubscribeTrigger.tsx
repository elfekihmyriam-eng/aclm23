"use client";

import { useState } from "react";
import Link from "next/link";

export default function WriterSubscribeTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Bouton principal */}
      <button
        className="hero-cta"
        onClick={() => setOpen(true)}
      >
        اشتراك الكاتب
      </button>

      {open && (
        <>
          {/* OVERLAY – gris translucide EXACT (comme la capture) */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9998,
              background: "rgba(204, 204, 204, 0.75)", // gris de ta capture
              backdropFilter: "blur(4px)",
            }}
          />

          {/* FENÊTRE CENTRALE */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,

              background: "#f7f7f7",
              borderRadius: "20px",
              padding: "36px 34px",
              width: "90%",
              maxWidth: "520px",

              boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
              textAlign: "right",
            }}
          >
            {/* Bouton fermer */}
            <button
              onClick={() => setOpen(false)}
              aria-label="إغلاق"
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                fontSize: 20,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#111",
              }}
            >
              ×
            </button>

            {/* Titre */}
            <h2
              style={{
                marginBottom: 16,
                fontSize: "24px",
                fontWeight: 700,
                color: "#111",
              }}
            >
              اشتراك الكاتب
            </h2>

            {/* Texte */}
            <p
              style={{
                marginBottom: 30,
                lineHeight: 1.8,
                fontSize: "16px",
                color: "#333",
              }}
            >
              يتيح اشتراك الكاتب الانضمام إلى أنشطة الجمعية الكندية للأدب
              المهجري، والمشاركة في المشاريع الأدبية، والمنتديات،
              وبرامج التعريف بالأعمال
            </p>

            {/* Bouton vers الاستمارة – noir sobre */}
            <Link
              href="/ar/authors-form"
              style={{
                display: "block",
                width: "100%",
                textAlign: "center",
                padding: "14px 0",
                background: "#111",
                color: "#fff",
                borderRadius: "999px",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              الانتقال إلى استمارة الكاتب
            </Link>
          </div>
        </>
      )}
    </>
  );
}

