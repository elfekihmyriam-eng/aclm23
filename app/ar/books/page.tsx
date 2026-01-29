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
  const { data: authors, error } = await supabase
    .from("authors")
    .select("id, first_name, last_name, covers")
    .eq("status", "accepted");

  if (error) {
    return (
      <main className="content-page" dir="rtl">
        <p>حدث خطأ أثناء تحميل الإصدارات.</p>
      </main>
    );
  }

  const covers =
    authors?.flatMap((a) =>
      (a.covers || []).map((url: string) => ({
        url,
        authorId: a.id,
        name: `${a.first_name} ${a.last_name}`,
      }))
    ) || [];

  return (
    <main className="content-page" dir="rtl">
      <h1 className="subscribe-title">الإصدارات</h1>

      {covers.length === 0 ? (
        <p>لا توجد إصدارات بعد.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "20px",
          }}
        >
          {covers.map((c, i) => (
            <Link key={i} href={`/ar/authors/${c.authorId}`}>
              <img
                src={c.url}
                alt={c.name}
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


