"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ margin: "24px auto", textAlign: "center" }}>
      {/* Bouton principal */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: "12px 26px",
          borderRadius: "999px",
          border: "1px solid #000",
          background: "#000",
          color: "#fff",
          cursor: "pointer",
          fontSize: "15px",
        }}
      >
        لوحة الإدارة ▾
      </button>

      {/* Menu déroulant */}
      {open && (
        <div
          style={{
            marginTop: "12px",
            display: "inline-flex",
            flexDirection: "column",
            gap: "10px",
            padding: "16px",
            background: "#fff",
            borderRadius: "14px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            zIndex: 9999,
          }}
        >
          <Link href="/admin/authors">👥 إدارة الكتّاب</Link>
          <Link href="/admin/books">📚 إدارة الإصدارات</Link>
          <Link href="/admin/crm">📧 البريد الإلكتروني (CRM)</Link>
          <Link href="/ar">🏠 العودة للموقع</Link>
        </div>
      )}
    </div>
  );
}

