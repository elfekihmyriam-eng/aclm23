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

export default async function BooksPageEn() {
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
      <main className="content-page" dir="ltr">
        <p>An error occurred while loading the publications.</p>
      </main>
    );
  }

  return (
    <main className="content-page" dir="ltr">
      {/* 🔙 BACK BUTTON */}
      <Link
        href="/en"
        style={{
          display: "inline-block",
          marginBottom: "24px",
          fontSize: "14px",
          opacity: 0.7,
          textDecoration: "none",
        }}
      >
        ← Back to home
      </Link>

      {/* TITLE */}
      <h1 className="subscribe-title">Publications</h1>

      {/* CONTENT */}
      {!books || books.length === 0 ? (
        <p>No publications are available at the moment.</p>
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


