import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AuthorProfilePage({ params }: PageProps) {
  const { id } = await params;

  const { data: author, error } = await supabase
    .from("authors")
    .select("*")
    .eq("id", id)
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
        {/* 🔙 RETOUR ACCUEIL */}
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
          ← الرجوع إلى الصفحة الرئيسية
        </Link>

        {/* ===== HEADER ===== */}
        <div style={{ marginBottom: "32px" }}>
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

        {/* ===== BIO ===== */}
        <section>
          <h2>نبذة عن الكاتب</h2>
          <p style={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>
            {author.bio}
          </p>
        </section>
      </div>
    </main>
  );
}

