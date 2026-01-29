import { createClient } from "@supabase/supabase-js";
import BookCreateForm from "./BookCreateForm";

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
          التحكم في ظهور الإصدارات في الموقع (الصفحة الرئيسية + الإصدارات)
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
        <a href="/admin/authors" className="admin-nav-btn">
          إدارة الكتّاب
        </a>

        <a
          href="/admin/books"
          className="admin-nav-btn"
          style={{ background: "#000", color: "#fff" }}
        >
          إدارة الإصدارات
        </a>

        <a href="/admin/crm" className="admin-nav-btn">
          CRM
        </a>

        <a href="/ar" className="admin-nav-btn ghost">
          ← الموقع
        </a>
      </div>

      {/* ===== LISTE DES LIVRES ===== */}
      {(!books || books.length === 0) && (
        <p className="admin-empty">لا توجد كتب بعد.</p>
      )}

      {books?.map((book) => (
        <article key={book.id} className="admin-card">
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            {book.cover_url && (
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
            )}

            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: 6 }}>{book.title}</h3>

              <p style={{ opacity: 0.8 }}>
                ✍️ {book.authors?.first_name}{" "}
                {book.authors?.last_name}
              </p>

              {/* ===== STATUT ISDARAT ===== */}
              <p style={{ marginTop: 6 }}>
                الظهور في الإصدارات:
                <strong style={{ marginRight: 6 }}>
                  {book.published
                    ? " ظاهر في الموقع ✅"
                    : " مخفي ⛔"}
                </strong>
              </p>

              {/* ===== ACTIONS ===== */}
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                {/* TOGGLE ISDARAT */}
                <form action="/api/admin/books/action" method="POST">
                  <input type="hidden" name="id" value={book.id} />
                  <input
                    type="hidden"
                    name="action"
                    value={
                      book.published ? "unpublish" : "publish"
                    }
                  />
                  <button>
                    {book.published
                      ? "🚫 إخفاء من الإصدارات"
                      : "👁️ إظهار في الإصدارات"}
                  </button>
                </form>

                {/* DELETE */}
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

      {/* ===== AJOUT LIVRE ===== */}
      <hr style={{ margin: "50px 0" }} />

      <h2>➕ إضافة كتاب</h2>

      <BookCreateForm authors={authors || []} />
    </div>
  );
}

