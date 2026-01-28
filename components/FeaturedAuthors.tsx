import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function FeaturedAuthors() {
  const { data: authors } = await supabase
    .from("authors")
    .select("id, first_name, last_name, country, photo_url")
    .eq("status", "accepted")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(4);

  if (!authors || authors.length === 0) {
    return null;
  }

  return (
    <section style={{ marginTop: "60px" }} dir="rtl">
      <h2 style={{ marginBottom: "24px" }}>كتّاب مميّزون</h2>

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
            href={`/ar/authors/${a.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: "14px",
                padding: "16px",
                background: "#fff",
                textAlign: "center",
                transition: "transform .2s ease, box-shadow .2s ease",
              }}
              className="featured-author-card"
            >
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

              <h3 style={{ margin: "0 0 6px" }}>
                {a.first_name} {a.last_name}
              </h3>

              <p style={{ margin: 0, opacity: 0.8 }}>
                🌍 {a.country}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .featured-author-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.08);
        }
      `}</style>
    </section>
  );
}


