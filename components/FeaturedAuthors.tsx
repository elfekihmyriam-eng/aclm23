import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

/* ===============================
   Supabase client (public read)
================================ */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const dynamic = "force-dynamic";

export default async function FeaturedAuthors() {
  const { data: authors, error } = await supabase
    .from("authors")
    .select("id, first_name, last_name, country, photo_url")
    .eq("status", "accepted")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(4);

  // Sécurité silencieuse
  if (error || !authors || authors.length === 0) {
    return null;
  }

  return (
    <section dir="rtl" style={{ marginTop: "60px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {authors.map((a) => (
          <Link
            key={a.id}
            href="/ar/authors"   // ✅ lien CORRECT vers la page الكتّاب
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <article
              className="featured-author-card"
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: "14px",
                padding: "16px",
                background: "#fff",
                textAlign: "center",
                height: "100%",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
            >
              {/* PHOTO */}
              {a.photo_url ? (
                <img
                  src={a.photo_url}
                  alt={`${a.first_name} ${a.last_name}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: "1px solid #ddd",
                    marginBottom: "10px",
                  }}
                />
              ) : (
                <div
                  aria-hidden
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background: "#f3f3f3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 10px",
                    fontSize: "28px",
                  }}
                >
                  📷
                </div>
              )}

              {/* NAME */}
              <h3 style={{ margin: "0 0 6px", fontSize: "16px" }}>
                {a.first_name} {a.last_name}
              </h3>

              {/* COUNTRY */}
              <p style={{ margin: 0, opacity: 0.8, fontSize: "14px" }}>
                🌍 {a.country}
              </p>
            </article>
          </Link>
        ))}
      </div>

      {/* Hover effect */}
      <style>{`
        .featured-author-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.08);
        }
      `}</style>
    </section>
  );
}
