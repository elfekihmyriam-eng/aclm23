import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

/* ===============================
   Client Supabase (lecture publique)
================================ */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const dynamic = "force-dynamic";

export default async function BooksPageFr() {
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
        <p>Une erreur est survenue lors du chargement des publications.</p>
      </main>
    );
  }

  /* ===============================
     Regroupement par auteur
  ================================ */
  const booksByAuthor: Record<string, any[]> = {};

  books?.forEach((book: any) => {
    const author = book.authors;
    const authorName = author
      ? `${author.first_name} ${author.last_name}`
      : "Auteur inconnu";

    if (!booksByAuthor[authorName]) {
      booksByAuthor[authorName] = [];
    }

    booksByAuthor[authorName].push(book);
  });

  return (
    <main className="content-page" dir="ltr">
      {/* 🔙 BOUTON RETOUR */}
      <Link
        href="/fr"
        style={{
          display: "inline-block",
          marginBottom: "24px",
          fontSize: "14px",
          opacity: 0.7,
          textDecoration: "none",
        }}
      >
        ← Retour à la page d’accueil
      </Link>

      {/* TITRE */}
      <h1 className="subscribe-title">Publications</h1>

      {/* CONTENU */}
      {!books || books.length === 0 ? (
        <p>Aucune publication n’est disponible pour le moment.</p>
      ) : (
        <div style={{ marginTop: "32px" }}>
          {Object.entries(booksByAuthor).map(([authorName, authorBooks]) => (
            <section key={authorName} style={{ marginBottom: "56px" }}>
              {/* Nom de l’auteur */}
              <h2
                style={{
                  fontSize: "20px",
                  marginBottom: "18px",
                  color: "#4b3621",
                }}
              >
                {authorName}
              </h2>

              {/* Couvertures côte à côte */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
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


