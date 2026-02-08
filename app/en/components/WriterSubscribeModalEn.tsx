"use client";

import { createPortal } from "react-dom";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WriterSubscribeModalEn({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !open) return null;

  const root = document.getElementById("modal-root");
  if (!root) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      dir="ltr"
    >
      {/* overlay */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* card */}
      <div className="relative w-full max-w-md mx-4 rounded-2xl bg-[#fdf6e8] shadow-2xl p-8 text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-[#6b4e16]"
          aria-label="Close"
          title="Close"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 text-[#6b4e16]">
          Writers’ Registration
        </h2>

        <p className="mb-6 leading-relaxed text-[#3f2a00]">
          Registering as a writer allows you to take part in the activities of
          the Canadian Union of Migrant Literature, and to contribute to
          editorial projects and literary forums.
        </p>

        <Link
          href="/en/authors-form"
          className="block w-full text-center rounded-full bg-[#c9a46a] text-black py-3 font-semibold hover:opacity-90 transition"
        >
          Access the writers’ registration form
        </Link>
      </div>
    </div>,
    root
  );
}

