import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminCrmPage() {
  const { data, error } = await supabase
    .from("crm_contacts")
    .select("id, email, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="admin-wrapper" dir="rtl">
        <p>خطأ في تحميل قائمة البريد</p>
      </div>
    );
  }

  const emails = data.map((d) => d.email);
  const bcc = encodeURIComponent(emails.join(","));

  const mailtoLink = `mailto:info@aclm.ca?bcc=${bcc}`;

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
          margin: "24px 0 30px",
          flexWrap: "wrap",
        }}
      >
        <a href="/admin/authors" className="admin-nav-btn">
          إدارة الكتّاب
        </a>

        <a
          href="/admin/crm"
          className="admin-nav-btn"
          style={{ background: "#000", color: "#fff" }}
        >
          البريد الإلكتروني (CRM)
        </a>
      </div>

      {/* ===== ACTION MAIL COLLECTIF ===== */}
      {emails.length > 0 && (
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <a
            href={mailtoLink}
            className="admin-nav-btn"
            style={{
              background: "#0f172a",
              color: "#fff",
            }}
          >
            ✉️ إرسال بريد جماعي
          </a>
        </div>
      )}

      {/* ===== LISTE EMAILS ===== */}
      {emails.length === 0 ? (
        <p className="admin-empty">لا توجد عناوين بعد.</p>
      ) : (
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: 16,
          }}
        >
          {data.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 0",
                borderBottom: "1px dashed #eee",
              }}
            >
              <span>{item.email}</span>

              {/* DELETE */}
              <form
                action="/api/admin/crm/delete"
                method="POST"
              >
                <input
                  type="hidden"
                  name="id"
                  value={item.id}
                />
                <button
                  type="submit"
                  style={{
                    color: "red",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  🗑️ حذف
                </button>
              </form>
            </div>
          ))}
        </div>
      )}

      <p style={{ opacity: 0.6, marginTop: 12 }}>
        سيتم فتح برنامج البريد الافتراضي باستخدام
        <strong> info@aclm.ca </strong>
        مع وضع جميع العناوين في خانة BCC.
      </p>
    </div>
  );
}


