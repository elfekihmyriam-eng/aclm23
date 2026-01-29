import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const formData = await req.formData();

  const cover_url = formData.get("cover_url") as string;
  const author_id = formData.get("author_id") as string;
  const title = formData.get("title") as string;

  if (!cover_url || !author_id || !title) {
    return NextResponse.json(
      { error: "Données manquantes" },
      { status: 400 }
    );
  }

  // 🔒 Création du livre (NON publié)
  const { error } = await supabase.from("books").insert({
    title,
    cover_url,
    author_id,
    published: false,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  // 🔁 Redirection vers admin books
  return NextResponse.redirect(
    new URL("/admin/books", req.url)
  );
}


