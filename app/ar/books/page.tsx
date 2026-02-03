import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

/* ===============================
   Supabase client (public read)
================================ */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const dynamic = "force-dynamic";

export default async function BooksPageAr() {
  const { data: books, error } = await supabase
    .from("books")
    .select(`
      id,
      title,
      cover_url,
      authors (
        id,
        first_name,
        last_name
      )
    `)
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="content-page" dir="rtl">
        <p>حدث خطأ أثناء تحميل الإصدارات.</p>
      </main>
    );
  }

  return (
    <main className="content-page" dir="rtl">
      {/* 🔙 BOUTON RETOUR */}
      <Link
        href="/ar"
        style={{
          display: "inline-block",
          marginBottom: "24px",
          fontSize: "14px",
          opacity: 0.7,
          textDecoration: "none",
        }}
      >
        ← رجوع إلى الصفحة الرئيسية
      </Link>

      {/* TITRE */}
      <h1 className="subscribe-title">الإصدارات</h1>

      {/* CONTENU */}
      {!books || books.length === 0 ? (
        <p>لا توجد إصدارات منشورة بعد.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "20px",
            marginTop: "24px",
          }}
        >
          {books.map((book) => (
            <a
              key={book.id}
              href={book.cover_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "block" }}
            >
              <img
                src={book.cover_url}
                alt={book.title}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  cursor: "pointer",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                  transition: "transform 0.2s ease",
                }}
              />
            </a>
          ))}
        </div>
      )}
    </main>
  );
}


