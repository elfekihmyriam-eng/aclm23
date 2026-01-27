"use client";

import { createPortal } from "react-dom";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WriterSubscribeModal({
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* overlay */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* carte */}
      <div className="relative w-full max-w-md mx-4 rounded-2xl bg-[#fdf6e8] shadow-2xl p-8 text-right">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-xl text-[#6b4e16]"
          aria-label="إغلاق"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 text-[#6b4e16]">
          اشتراك الكاتب
        </h2>

        <p className="mb-6 leading-relaxed text-[#3f2a00]">
          يتيح اشتراك الكاتب الانضمام إلى أنشطة الجمعية الكندية للأدب
          المهجري، والمشاركة في المشاريع الأدبية، والمنتديات.
        </p>

        <Link
          href="/ar/authors-form"
          className="block w-full text-center rounded-full bg-[#c9a46a] text-black py-3 font-semibold hover:opacity-90 transition"
        >
          الانتقال إلى استمارة الكاتب
        </Link>
      </div>
    </div>,
    root
  );
}

