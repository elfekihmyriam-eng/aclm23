import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const formData = await req.formData();
  const action = formData.get("action") as string;
  const id = formData.get("id") as string;

  if (!action || !id) {
    return NextResponse.json(
      { error: "Action ou ID manquant" },
      { status: 400 }
    );
  }

  /* ===============================
     PUBLISH BOOK (ISDARAT)
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

  /* ===============================
     UNKNOWN ACTION
  ================================ */
  return NextResponse.json(
    { error: "Action inconnue" },
    { status: 400 }
  );
}


