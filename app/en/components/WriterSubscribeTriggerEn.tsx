"use client";

import { useState } from "react";
import Link from "next/link";

export default function WriterSubscribeTriggerEn() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Main button */}
      <button
        className="hero-cta"
        onClick={() => setOpen(true)}
      >
        Writers’ Registration
      </button>

      {open && (
        <>
          {/* OVERLAY – translucent grey */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9998,
              background: "rgba(204, 204, 204, 0.75)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* CENTER MODAL */}
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
              textAlign: "left",
            }}
            dir="ltr"
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              title="Close"
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                fontSize: 20,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#111",
              }}
            >
              ×
            </button>

            {/* Title */}
            <h2
              style={{
                marginBottom: 16,
                fontSize: "24px",
                fontWeight: 700,
                color: "#111",
              }}
            >
              Writers’ Registration
            </h2>

            {/* Text */}
            <p
              style={{
                marginBottom: 30,
                lineHeight: 1.8,
                fontSize: "16px",
                color: "#333",
              }}
            >
              Registering as a writer allows you to join the activities of the
              Canadian Union of Migrant Literature, take part in editorial
              projects, literary forums, and programs dedicated to promoting
              literary works.
            </p>

            {/* Link to the form */}
            <Link
              href="/en/authors-form"
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
              Access the writers’ registration form
            </Link>
          </div>
        </>
      )}
    </>
  );
}

