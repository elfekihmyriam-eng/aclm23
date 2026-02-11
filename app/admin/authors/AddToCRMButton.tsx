"use client";

import { useState } from "react";

export default function AddToCRMButton({ email }: { email: string }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!email) return;

    setLoading(true);

    try {
      const res = await fetch("/api/admin/crm/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        alert("تمت إضافة البريد إلى CRM");
      } else {
        alert(data.error || "خطأ أثناء الإضافة");
      }
    } catch (err) {
      console.error(err);
      alert("خطأ في الاتصال بالخادم");
    }

    setLoading(false);
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={{
        marginTop: 8,
        padding: "6px 10px",
        background: "#1b263b",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        fontSize: 12,
        opacity: loading ? 0.6 : 1,
      }}
    >
      {loading ? "..." : "➕ إضافة إلى CRM"}
    </button>
  );
}



