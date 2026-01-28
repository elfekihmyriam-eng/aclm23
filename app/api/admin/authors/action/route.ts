import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const id = formData.get("id") as string | null;
    const action = formData.get("action") as string | null;

    if (!id || !action) {
      return NextResponse.json(
        { error: "Missing id or action" },
        { status: 400 }
      );
    }

    // ===== ACTIONS =====
    if (action === "accept") {
      await supabase.from("authors").update({ status: "accepted" }).eq("id", id);
    }

    if (action === "reject") {
      await supabase.from("authors").update({ status: "rejected" }).eq("id", id);
    }

    if (action === "feature") {
      await supabase.from("authors").update({ featured: true }).eq("id", id);
    }

    if (action === "unfeature") {
      await supabase.from("authors").update({ featured: false }).eq("id", id);
    }

    if (action === "delete") {
      await supabase.from("authors").delete().eq("id", id);
    }

    // 🔁 Redirection automatique vers l’admin
    return NextResponse.redirect(
      new URL("/admin/authors", req.url)
    );
  } catch (err) {
    console.error("ADMIN AUTHOR ACTION ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

