import { supabase } from "@/lib/supabase";
import Link from "next/link";

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

  return (
    <main dir="rtl" className="admin-wrapper">
      {/* ===== HEADER ===== */}
      <header className="admin-header">
        <h1>طلبات الكتّاب (الإدارة)</h1>
        <p className="admin-subtitle">⭐ كتّابنا من المهجر</p>
      </header>

      {/* ===== MENU ADMIN ===== */}
      <AdminNav />

      {/* ===== ERREUR ===== */}
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>
          خطأ في تحميل الطلبات
        </p>
      )}

      {/* ===== LISTE VIDE ===== */}
      {(!authors || authors.length === 0) && (
        <p className="admin-empty">لا توجد طلبات بعد.</p>
      )}

      {/* ===== LISTE AUTEURS ===== */}
      {authors?.map((a) => (
        <article key={a.id} className="admin-card">
          {/* INFOS */}
          <h2>
            {a.first_name} {a.last_name}
            {a.featured && <span> ⭐</span>}
          </h2>

          <p>📧 {a.email}</p>
          <p>📞 {a.phone}</p>
          <p>🌍 {a.country}</p>
          <p>
            <strong>الحالة:</strong> {a.status}
          </p>

          {/* BIO */}
          {a.bio && (
            <>
              <strong>نبذة:</strong>
              <p style={{ whiteSpace: "pre-line" }}>{a.bio}</p>
            </>
          )}

          {/* PHOTO */}
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

          {/* ===== COVERS + BOUTON ISDARAT ===== */}
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

                    <div style={{ marginTop: 6 }}>
                      <a href={url} target="_blank" download>
                        ⬇️ تحميل
                      </a>
                    </div>

                    {/* ✅ BOUTON نشر في الإصدارات */}
                    <form
                      action="/api/admin/books/from-author-cover"
                      method="POST"
                      style={{ marginTop: 6 }}
                    >
                      <input
                        type="hidden"
                        name="cover_url"
                        value={url}
                      />
                      <input
                        type="hidden"
                        name="author_id"
                        value={a.id}
                      />
                      <input
                        type="hidden"
                        name="title"
                        value={`كتاب لـ ${a.first_name} ${a.last_name}`}
                      />

                      <button type="submit">
                        📘 نشر هذا الغلاف في الإصدارات
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "#999" }}>لا توجد أغلفة</p>
            )}
          </div>

          {/* ===== ACTIONS AUTEUR ===== */}
          <div
            style={{
              marginTop: 24,
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <form action="/api/admin/authors/action" method="POST">
              <input type="hidden" name="id" value={a.id} />
              <input type="hidden" name="action" value="accept" />
              <button>✅ نشر في كتّاب من المهجر</button>
            </form>

            <form action="/api/admin/authors/action" method="POST">
              <input type="hidden" name="id" value={a.id} />
              <input
                type="hidden"
                name="action"
                value={a.featured ? "unfeature" : "feature"}
              />
              <button>
                {a.featured
                  ? "⭐ إزالة من الصفحة الرئيسية"
                  : "⭐ إبراز في الصفحة الرئيسية"}
              </button>
            </form>

            <form action="/api/admin/authors/action" method="POST">
              <input type="hidden" name="id" value={a.id} />
              <input type="hidden" name="action" value="reject" />
              <button>❌ رفض</button>
            </form>

            <form action="/api/admin/authors/action" method="POST">
              <input type="hidden" name="id" value={a.id} />
              <input type="hidden" name="action" value="delete" />
              <button style={{ color: "red" }}>🗑️ حذف</button>
            </form>
          </div>
        </article>
      ))}
    </main>
  );
}



