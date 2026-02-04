import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const formData = await req.formData();
  const action = formData.get("action") as string;

  if (!action) {
    return NextResponse.json(
      { error: "Action manquante" },
      { status: 400 }
    );
  }

  /* ===============================
     CREATE BOOK (UPLOAD CLEAN NAME)
  ================================ */
  if (action === "create") {
    const title = formData.get("title") as string | null;
    const author_id = formData.get("author_id") as string | null;
    const cover = formData.get("cover") as File | null;

    if (!title || !author_id || !cover) {
      return NextResponse.json(
        { error: "Données manquantes" },
        { status: 400 }
      );
    }

    const originalName = cover.name;
    const extension = originalName.split(".").pop() || "jpg";

    const safeName = originalName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9._-]/g, "_");

    const fileName = `${Date.now()}-${safeName}`;
    const filePath = `${author_id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("author-covers")
      .upload(filePath, cover, {
        contentType: cover.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message },
        { status: 500 }
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("author-covers")
      .getPublicUrl(filePath);

    const { error: insertError } = await supabase
      .from("books")
      .insert({
        title,
        author_id,
        cover_url: publicUrl,
        published: true, // ✅ FIX VISIBILITÉ
      });

    if (insertError) {
      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.redirect(
      new URL("/admin/books", req.url)
    );
  }

  /* ===============================
     ACTIONS AVEC ID OBLIGATOIRE
  ================================ */
  const id = formData.get("id") as string;

  if (!id) {
    return NextResponse.json(
      { error: "ID manquant" },
      { status: 400 }
    );
  }

  /* ===============================
     PUBLISH BOOK
  ================================ */
  if (action === "publish") {
    const { error } = await supabase
      .from("books")
      .update({ published: true })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.redirect(
      new URL("/admin/books", req.url)
    );
  }

  /* ===============================
     UNPUBLISH BOOK
  ================================ */
  if (action === "unpublish") {
    const { error } = await supabase
      .from("books")
      .update({ published: false })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.redirect(
      new URL("/admin/books", req.url)
    );
  }

  /* ===============================
     DELETE BOOK
  ================================ */
  if (action === "delete") {
    const { error } = await supabase
      .from("books")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.redirect(
      new URL("/admin/books", req.url)
    );
  }

  return NextResponse.json(
    { error: "Action inconnue" },
    { status: 400 }
  );
}


