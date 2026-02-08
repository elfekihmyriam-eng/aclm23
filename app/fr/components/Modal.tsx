"use client";

export default function ModalFr({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
      dir="ltr"
    >
      <div
        className="bg-white rounded-2xl p-8 w-full max-w-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl"
          aria-label="Fermer la fenêtre"
          title="Fermer"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}


