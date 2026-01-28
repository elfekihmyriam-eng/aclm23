import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    /* ===============================
       Champs texte
    =============================== */
    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const country = formData.get("country") as string;
    const bio = formData.get("bio") as string;

    /* ===============================
       1. INSERT auteur
    =============================== */
    const { data: author, error: insertError } = await supabase
      .from("authors")
      .insert({
        first_name,
        last_name,
        email,
        phone,
        country,
        bio,
        status: "pending",
      })
      .select()
      .single();

    if (insertError || !author) {
      console.error(insertError);
      return NextResponse.json({ error: "Insert failed" }, { status: 500 });
    }

    const authorId = author.id;

    /* ===============================
       2. Upload photo
    =============================== */
    let photo_url: string | null = null;

    const photoFile = formData.get("photo") as File | null;

    if (photoFile) {
      const photoPath = `${authorId}/${Date.now()}-${photoFile.name}`;

      const { error } = await supabase.storage
        .from("author-photos")
        .upload(photoPath, photoFile);

      if (!error) {
        const { data } = supabase.storage
          .from("author-photos")
          .getPublicUrl(photoPath);

        photo_url = data.publicUrl;
      }
    }

    /* ===============================
       3. Upload couvertures
    =============================== */
    const coverUrls: string[] = [];
    const coverFiles = formData.getAll("covers") as File[];

    for (const file of coverFiles) {
      const coverPath = `${authorId}/${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("author-covers")
        .upload(coverPath, file);

      if (!error) {
        const { data } = supabase.storage
          .from("author-covers")
          .getPublicUrl(coverPath);

        coverUrls.push(data.publicUrl);
      }
    }

    /* ===============================
       4. UPDATE FORCÉ (clé de la réussite)
    =============================== */
    const { error: updateError } = await supabase
      .from("authors")
      .update({
        photo_url,
        covers: coverUrls.length ? coverUrls : null,
      })
      .eq("id", authorId)
      .select(); // ⬅️ OBLIGATOIRE

    if (updateError) {
      console.error("UPDATE ERROR:", updateError);
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

