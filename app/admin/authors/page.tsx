

import { supabase } from "@/lib/supabase";
import Link from "next/link";

import AddToCRMButton from "./AddToCRMButton";


export const dynamic = "force-dynamic";

/* ===============================
   NAVIGATION ADMIN
================================ */
function AdminNav() {
  return (
    <nav
      dir="rtl"
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "14px",
        margin: "30px 0 50px",
        flexWrap: "wrap",
      }}
    >
      <Link href="/admin/authors">
        <button className="admin-nav-btn">إدارة الكتّاب</button>
      </Link>

      <Link href="/admin/books">
        <button className="admin-nav-btn">إدارة الإصدارات</button>
      </Link>

      <Link href="/admin/crm">
        <button className="admin-nav-btn">CRM البريد</button>
      </Link>

      <Link href="/ar">
        <button className="admin-nav-btn ghost">⬅️ الموقع</button>
      </Link>
    </nav>
  );
}

/* ===============================
   PAGE ADMIN AUTHORS
================================ */
export default async function AdminAuthorsPage() {

  const { data: authors, error } = await supabase
    .from("authors")
    .select(
      "id, first_name, last_name, email, phone, country, status, bio, featured, photo_url, covers"
    )
    .order("created_at", { ascending: false });

  /* ===============================
     AJOUT AU CRM
  =============================== */
  async function addToCRM(email: string) {
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
        alert(data.message || "تمت إضافة البريد إلى CRM");
      } else {
        alert(data.error || "خطأ أثناء الإضافة");
      }
    } catch (err) {
      console.error(err);
      alert("خطأ في الاتصال بالخادم");
    }
  }

  return (
    <main dir="rtl" className="admin-wrapper">
      {/* HEADER */}
      <header className="admin-header">
        <h1>طلبات الكتّاب (الإدارة)</h1>
        <p className="admin-subtitle">⭐ كتّابنا من المهجر</p>
      </header>

      <AdminNav />

      {error && (
        <p style={{ color: "red", textAlign: "center" }}>
          خطأ في تحميل الطلبات
        </p>
      )}

      {(!authors || authors.length === 0) && (
        <p className="admin-empty">لا توجد طلبات بعد.</p>
      )}

      {authors?.map((a) => (
        <article key={a.id} className="admin-card">

          <h2>
            {a.first_name} {a.last_name}
            {a.featured && <span> ⭐</span>}
          </h2>

          <p>📧 {a.email}</p>
<AddToCRMButton email={a.email} />


         

          <p>📞 {a.phone}</p>
          <p>🌍 {a.country}</p>
          <p>
            <strong>الحالة:</strong> {a.status}
          </p>

          {a.bio && (
            <>
              <strong>نبذة:</strong>
              <p style={{ whiteSpace: "pre-line" }}>{a.bio}</p>
            </>
          )}

          <div style={{ marginTop: 16 }}>
            <strong>صورة الكاتب:</strong>
            {a.photo_url ? (
              <img
                src={a.photo_url}
                alt="صورة الكاتب"
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "1px solid #ddd",
                  display: "block",
                  marginTop: 8,
                }}
              />
            ) : (
              <p style={{ color: "#999" }}>لا توجد صورة</p>
            )}
          </div>

          {/* COVERS */}
          <div style={{ marginTop: 16 }}>
            <strong>أغلفة الكتب:</strong>

            {Array.isArray(a.covers) && a.covers.length > 0 ? (
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {a.covers.map((url: string, i: number) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <img
                      src={url}
                      alt={`غلاف ${i + 1}`}
                      style={{
                        width: 100,
                        height: 140,
                        objectFit: "cover",
                        borderRadius: 6,
                        border: "1px solid #ddd",
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "#999" }}>لا توجد أغلفة</p>
            )}
          </div>

        </article>
      ))}
    </main>
  );
}




