import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const dynamic = "force-dynamic";

export default async function AuthorsPageFr() {
  const { data: authors } = await supabase
    .from("authors")
    .select("id, first_name, last_name, country, bio, photo_url, featured")
    .eq("status", "accepted")
    .order("featured", { ascending: false }) // ⭐ auteurs mis en avant en premier
    .order("created_at", { ascending: false });

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
      <h1 className="subscribe-title">Auteurs et autrices</h1>

      {/* CONTENU */}
      {!authors || authors.length === 0 ? (
        <p>Aucun auteur n’est affiché pour le moment.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "24px",
            marginTop: "24px",
          }}
        >
          {authors.map((a) => {
            const libraStoryUrl = `https://librastory.com/author/${a.id}`;

            return (
              <div
                key={a.id}
                className="author-card"
                style={{
                  position: "relative",
                  border: "1px solid #e5e5e5",
                  borderRadius: "14px",
                  padding: "18px",
                  background: "#fff",
                  textAlign: "center",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
              >
                {/* ⭐ BADGE À LA UNE */}
                {a.featured && (
                  <span
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: "#000",
                      color: "#fff",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                    }}
                  >
                    ⭐ À la une
                  </span>
                )}

                {/* LIEN PROFIL */}
                <Link
                  href={`/fr/authors/${a.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {/* PHOTO */}
                  {a.photo_url ? (
                    <img
                      src={a.photo_url}
                      alt={`${a.first_name} ${a.last_name}`}
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "1px solid #ddd",
                        marginBottom: "10px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        background: "#f3f3f3",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 10px",
                        fontSize: "32px",
                      }}
                    >
                      📷
                    </div>
                  )}

                  {/* NOM */}
                  <h2 style={{ margin: "0 0 6px", fontSize: "18px" }}>
                    {a.first_name} {a.last_name}
                  </h2>

                  {/* PAYS */}
                  <p style={{ margin: 0, opacity: 0.8 }}>
                    🌍 {a.country}
                  </p>

                  {/* BIO */}
                  <p
                    style={{
                      marginTop: "10px",
                      fontSize: "14px",
                      lineHeight: 1.6,
                    }}
                  >
                    {a.bio?.length && a.bio.length > 140
                      ? a.bio.slice(0, 140) + "…"
                      : a.bio}
                  </p>
                </Link>

                {/* LIEN LIBRA STORY */}
                <a
                  href={libraStoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "12px",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    background: "#f5f5f5",
                    color: "#000",
                    textDecoration: "none",
                    fontSize: "13px",
                    border: "1px solid #ddd",
                  }}
                >
                  🔗 Profil de l’auteur·e sur Libra Story
                </a>
              </div>
            );
          })}
        </div>
      )}

      {/* EFFET HOVER */}
      <style>{`
        .author-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }
      `}</style>
    </main>
  );
}

