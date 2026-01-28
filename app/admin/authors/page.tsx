import { supabase } from "@/lib/supabase";

export default async function AdminAuthorsPage() {
  const { data: authors, error } = await supabase
    .from("authors")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <p>خطأ في تحميل الطلبات</p>;
  }

  return (
    <div dir="rtl" style={{ padding: 40, background: "#eee" }}>
      <h1 style={{ marginBottom: 30 }}>طلبات الكتّاب (الإدارة)</h1>

      {authors?.length === 0 && <p>لا توجد طلبات بعد.</p>}

      {authors?.map((a) => (
        <div
          key={a.id}
          style={{
            background: "#fff",
            padding: 24,
            marginBottom: 24,
            borderRadius: 12,
            border:
              a.status === "accepted"
                ? "2px solid #4caf50"
                : a.status === "rejected"
                ? "2px solid #f44336"
                : "2px solid #ccc",
          }}
        >
          {/* ===== INFOS ===== */}
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

          {/* ===== BIO ===== */}
          <p><strong>نبذة:</strong></p>
          <p style={{ whiteSpace: "pre-line" }}>{a.bio}</p>

          {/* ===== PHOTO ===== */}
          <div style={{ marginTop: 16 }}>
            <strong>صورة الكاتب:</strong><br />
            {a.photo_url ? (
              <>
                <img
                  src={a.photo_url}
                  alt="Photo auteur"
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginTop: 8,
                    border: "1px solid #ddd",
                  }}
                />
                <div>
                  <a href={a.photo_url} target="_blank" download>
                    ⬇️ تحميل الصورة
                  </a>
                </div>
              </>
            ) : (
              <p style={{ color: "#999" }}>لا توجد صورة</p>
            )}
          </div>

          {/* ===== COVERS ===== */}
          <div style={{ marginTop: 16 }}>
            <strong>أغلفة الكتب:</strong>
            {a.covers && a.covers.length > 0 ? (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
                {a.covers.map((url: string, i: number) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <img
                      src={url}
                      alt={`Cover ${i}`}
                      style={{
                        width: 100,
                        height: 140,
                        objectFit: "cover",
                        borderRadius: 6,
                        border: "1px solid #ddd",
                      }}
                    />
                    <div>
                      <a href={url} target="_blank" download>
                        ⬇️ تحميل
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "#999" }}>لا توجد أغلفة</p>
            )}
          </div>

          {/* ===== ACTIONS (NO JS) ===== */}
          <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <form action="/api/admin/authors/action" method="POST">
              <input type="hidden" name="id" value={a.id} />
              <input type="hidden" name="action" value="accept" />
              <button>✅ قبول</button>
            </form>

            <form action="/api/admin/authors/action" method="POST">
              <input type="hidden" name="id" value={a.id} />
              <input type="hidden" name="action" value="reject" />
              <button>❌ رفض</button>
            </form>

            <form action="/api/admin/authors/action" method="POST">
              <input type="hidden" name="id" value={a.id} />
              <input
                type="hidden"
                name="action"
                value={a.featured ? "unfeature" : "feature"}
              />
              <button>
                {a.featured ? "☆ إلغاء التمييز" : "⭐ تمييز"}
              </button>
            </form>

            <form action="/api/admin/authors/action" method="POST">
              <input type="hidden" name="id" value={a.id} />
              <input type="hidden" name="action" value="delete" />
              <button style={{ color: "red" }}>🗑️ حذف</button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}


