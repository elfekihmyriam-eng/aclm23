import { supabase } from "@/lib/supabase";

export default async function AdminCrmPage() {
  const { data, error } = await supabase
    .from("crm_contacts")
    .select("email, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return <p>خطأ في تحميل قائمة البريد</p>;
  }

  const emails = data?.map((d) => d.email) || [];
  const emailsText = emails.join("\n");

  return (
    <div className="admin-wrapper" dir="rtl">
      {/* ===== HEADER ===== */}
      <header className="admin-header">
        <h1>إدارة البريد الإلكتروني (CRM)</h1>
        <p className="admin-subtitle">
          عدد العناوين: <strong>{emails.length}</strong>
        </p>
      </header>

      {/* ===== NAV ADMIN ===== */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "14px",
          margin: "24px 0 40px",
          flexWrap: "wrap",
        }}
      >
        <a
          href="/admin/authors"
          style={{
            padding: "12px 22px",
            borderRadius: "999px",
            textDecoration: "none",
            background: "#fff",
            color: "#000",
            fontWeight: 600,
            border: "1px solid #000",
          }}
        >
          إدارة الكتّاب
        </a>

        <a
          href="/admin/crm"
          style={{
            padding: "12px 22px",
            borderRadius: "999px",
            textDecoration: "none",
            background: "#000",
            color: "#fff",
            fontWeight: 600,
            border: "1px solid #000",
          }}
        >
          البريد الإلكتروني (CRM)
        </a>
      </div>

      {/* ===== EMAIL LIST ===== */}
      <textarea
        readOnly
        value={emailsText}
        style={{
          width: "100%",
          height: "260px",
          padding: "16px",
          fontSize: "14px",
          lineHeight: "1.8",
          borderRadius: "10px",
        }}
      />

      <p style={{ opacity: 0.6, marginTop: 10 }}>
        يمكنك نسخ القائمة يدويًا (⌘ + C) لاستخدامها في الإرسال الجماعي
      </p>
    </div>
  );
}

