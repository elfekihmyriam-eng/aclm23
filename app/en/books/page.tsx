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

  /* ===============================
     Group books by author
  ================================ */
  const booksByAuthor: Record<string, any[]> = {};

  books?.forEach((book: any) => {
    const author = book.authors;
    const authorName = author
      ? `${author.first_name} ${author.last_name}`
      : "Unknown author";

    if (!booksByAuthor[authorName]) {
      booksByAuthor[authorName] = [];
    }

    booksByAuthor[authorName].push(book);
  });

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
        <div style={{ marginTop: "32px" }}>
          {Object.entries(booksByAuthor).map(([authorName, authorBooks]) => (
            <section key={authorName} style={{ marginBottom: "56px" }}>
              {/* Author name */}
              <h2
                style={{
                  fontSize: "20px",
                  marginBottom: "18px",
                  color: "#4b3621",
                }}
              >
                {authorName}
              </h2>

              {/* Covers side by side */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap", // wrap on small screens
                  gap: "18px",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                {authorBooks.map((book: any) => (
                  <a
                    key={book.id}
                    href={book.cover_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: "160px",
                      display: "block",
                      textDecoration: "none",
                    }}
                  >
                    <img
                      src={book.cover_url}
                      alt={book.title}
                      style={{
                        width: "100%",
                        borderRadius: "10px",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                        cursor: "pointer",
                        display: "block",
                      }}
                    />
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}


