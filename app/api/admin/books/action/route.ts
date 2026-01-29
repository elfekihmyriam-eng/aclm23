import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const action = formData.get("action");

    /* =========================
       AJOUT D’UN LIVRE
    ========================= */
    if (action === "create") {
      const title = formData.get("title") as string;
      const cover_url = formData.get("cover_url") as string;
      const author_id = formData.get("author_id") as string;

      if (!title || !cover_url || !author_id) {
        return NextResponse.json(
          { error: "Données manquantes" },
          { status: 400 }
        );
      }

      await supabase.from("books").insert({
        title,
        cover_url,
        author_id,
        published: false,
      });
    }

    /* =========================
       PUBLIER / DÉPUBLIER
    ========================= */
    if (action === "publish" || action === "unpublish") {
      const id = formData.get("id") as string;

      await supabase
        .from("books")
        .update({ published: action === "publish" })
        .eq("id", id);
    }

    /* =========================
       SUPPRIMER
    ========================= */
    if (action === "delete") {
      const id = formData.get("id") as string;

      await supabase.from("books").delete().eq("id", id);
    }

    // 🔁 Retour vers l’admin
    return NextResponse.redirect(
      new URL("/admin/books", req.url)
    );
  } catch (error) {
    console.error("ADMIN BOOKS ERROR:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}


