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
      <h1 className="subscribe-title">الإصدارات</h1>

      {(!books || books.length === 0) ? (
        <p>لا توجد إصدارات منشورة بعد.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "20px",
          }}
        >
          {books.map((book) => (
            <Link
              key={book.id}
              href={`/ar/authors/${book.authors?.id}`}
            >
              <img
                src={book.cover_url}
                alt={book.title}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              />
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}


