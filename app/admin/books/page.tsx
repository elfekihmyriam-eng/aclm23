import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const dynamic = "force-dynamic";

export default async function AdminBooksPage() {
  // 🔹 Récupérer les livres
  const { data: books } = await supabase
    .from("books")
    .select(`
      id,
      title,
      cover_url,
      published,
      created_at,
      authors (
        id,
        first_name,
        last_name
      )
    `)
    .order("created_at", { ascending: false });

  // 🔹 Récupérer les auteurs
  const { data: authors } = await supabase
    .from("authors")
    .select("id, first_name, last_name")
    .eq("status", "accepted")
    .order("last_name");

  return (
    <div className="admin-wrapper" dir="rtl">
      {/* ===== HEADER ===== */}
      <header className="admin-header">
        <h1>إدارة الإصدارات</h1>
        <p className="admin-subtitle">
          إدارة الكتب وربطها بالكتّاب
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
          href="/admin/books"
          style={{
            padding: "12px 22px",
            borderRadius: "999px",
            textDecoration: "none",
            background: "#000",
            color: "#fff",
            fontWeight: 600,
          }}
        >
          إدارة الإصدارات
        </a>
      </div>

      {/* ===== LISTE DES LIVRES ===== */}
      {(!books || books.length === 0) && (
        <p className="admin-empty">لا توجد كتب بعد.</p>
      )}

      {books?.map((book) => (
        <article key={book.id} className="admin-card">
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <img
              src={book.cover_url}
              alt={book.title}
              style={{
                width: 90,
                height: 130,
                objectFit: "cover",
                borderRadius: 6,
                border: "1px solid #ddd",
              }}
            />

            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: 6 }}>{book.title}</h3>

              <p style={{ opacity: 0.8 }}>
                ✍️ {book.authors?.first_name}{" "}
                {book.authors?.last_name}
              </p>

              <p>
                الحالة:
                <strong style={{ marginRight: 6 }}>
                  {book.published ? "منشور ✅" : "غير منشور ⏳"}
                </strong>
              </p>

              {/* ACTIONS */}
              <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
                <form action="/api/admin/books/action" method="POST">
                  <input type="hidden" name="id" value={book.id} />
                  <input
                    type="hidden"
                    name="action"
                    value={book.published ? "unpublish" : "publish"}
                  />
                  <button>
                    {book.published ? "إخفاء" : "نشر"}
                  </button>
                </form>

                <form action="/api/admin/books/action" method="POST">
                  <input type="hidden" name="id" value={book.id} />
                  <input type="hidden" name="action" value="delete" />
                  <button style={{ color: "red" }}>🗑️ حذف</button>
                </form>
              </div>
            </div>
          </div>
        </article>
      ))}

      {/* ===== AJOUT MANUEL ===== */}
      <hr style={{ margin: "50px 0" }} />

      <h2>➕ إضافة كتاب يدويًا</h2>

      <form
        action="/api/admin/books/action"
        method="POST"
        style={{ maxWidth: 500 }}
      >
        <input type="hidden" name="action" value="create" />

        <div style={{ marginBottom: 12 }}>
          <input
            name="title"
            placeholder="عنوان الكتاب"
            required
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <input
            name="cover_url"
            placeholder="رابط الغلاف (Supabase storage)"
            required
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <select name="author_id" required style={{ width: "100%" }}>
            <option value="">اختر الكاتب</option>
            {authors?.map((a) => (
              <option key={a.id} value={a.id}>
                {a.first_name} {a.last_name}
              </option>
            ))}
          </select>
        </div>

        <button>إضافة الكتاب</button>
      </form>
    </div>
  );
}

