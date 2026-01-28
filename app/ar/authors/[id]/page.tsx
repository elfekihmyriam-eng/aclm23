import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type PageProps = {
  params: {
    id: string;
  };
};

export default async function AuthorProfilePage({ params }: PageProps) {
  const { data: author, error } = await supabase
    .from("authors")
    .select("*")
    .eq("id", params.id)
    .eq("status", "accepted")
    .single();

  if (error || !author) {
    notFound();
  }

  const libraStoryUrl = `https://librastory.com/author/${author.id}`;

  return (
    <main dir="rtl" style={{ padding: "40px", background: "#f7f7f7" }}>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#fff",
          padding: "32px",
          borderRadius: "16px",
        }}
      >
        {/* ===== HEADER ===== */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            alignItems: "center",
            marginBottom: "32px",
            flexWrap: "wrap",
          }}
        >
          {/* PHOTO */}
          {author.photo_url ? (
            <img
              src={author.photo_url}
              alt={`${author.first_name} ${author.last_name}`}
              style={{
                width: "180px",
                height: "180px",
                objectFit: "cover",
                borderRadius: "50%",
                border: "2px solid #ddd",
              }}
            />
          ) : (
            <div
              style={{
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                background: "#eee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px",
              }}
            >
              📷
            </div>
          )}

          {/* INFOS */}
          <div>
            <h1 style={{ margin: 0 }}>
              {author.first_name} {author.last_name}
            </h1>
            <p style={{ margin: "8px 0", opacity: 0.8 }}>
              🌍 {author.country}
            </p>

            {/* LIBRA STORY */}
            <a
              href={libraStoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "12px",
                padding: "10px 18px",
                borderRadius: "20px",
                background: "#000",
                color: "#fff",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              🔗 ملف الكاتب على Libra Story
            </a>
          </div>
        </div>

        {/* ===== BIO ===== */}
        <section style={{ marginBottom: "40px" }}>
          <h2>نبذة عن الكاتب</h2>
          <p style={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>
            {author.bio}
          </p>
        </section>

        {/* ===== COVERS ===== */}
        {author.covers && author.covers.length > 0 && (
          <section>
            <h2>الأعمال المقترحة</h2>
            <div
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                marginTop: "16px",
              }}
            >
              {author.covers.map((url: string, i: number) => (
                <img
                  key={i}
                  src={url}
                  alt={`cover-${i}`}
                  style={{
                    width: "160px",
                    height: "220px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

